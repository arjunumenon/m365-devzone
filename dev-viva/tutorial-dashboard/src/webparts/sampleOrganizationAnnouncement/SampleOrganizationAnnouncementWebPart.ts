import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SampleOrganizationAnnouncementWebPart.module.scss';
import * as strings from 'SampleOrganizationAnnouncementWebPartStrings';
import {SPHttpClient} from '@microsoft/sp-http';

export interface ISampleOrganizationAnnouncementWebPartProps {
  description: string;
}

export default class SampleOrganizationAnnouncementWebPart extends BaseClientSideWebPart<ISampleOrganizationAnnouncementWebPartProps> {

  public render(): void {
    this.context.spHttpClient
  .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Announcements')/items?$select=Title,Description,Important`,
    SPHttpClient.configurations.v1,
    {
      headers: {
        'accept': 'application/json;odata.metadata=none'
      }
    })
  .then(response => response.json())
  .then(announcements => {
    const announcementsHtml = announcements.value.map(announcement =>
      `<dt${announcement.Important ?
        ` class="${styles.important}"` : ''}>${announcement.Title}</dt>
      <dd>${announcement.Description}</dd>`);
    
    this.domElement.innerHTML = `
    <div class="${styles.sampleOrganizationAnnouncement}">
      <div class="${styles.container}">
        <div class="${styles.title}">Announcements</div>
        <dl>
          ${announcementsHtml.join('')}
        </dl>
      </div>
    </div>
    `;
  })
  .catch(error => this.context.statusRenderer.renderError(this.domElement, error));
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
