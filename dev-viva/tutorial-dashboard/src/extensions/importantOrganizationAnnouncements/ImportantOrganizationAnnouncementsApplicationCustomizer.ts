import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import {SPHttpClient} from '@microsoft/sp-http';
import styles from './ImportantOrganizationAnnouncementsApplicationCustomizer.module.scss';

import * as strings from 'ImportantOrganizationAnnouncementsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ImportantOrganizationAnnouncementsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IImportantOrganizationAnnouncementsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ImportantOrganizationAnnouncementsApplicationCustomizer
  extends BaseApplicationCustomizer<IImportantOrganizationAnnouncementsApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top
      );
  
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }    
      this.context.spHttpClient
        .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Announcements')/items?$filter=Important eq 1&$select=Title`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'accept': 'application/json;odata.metadata=none'
            }
          })
        .then(response => response.json())         
        .then(announcements => {          
           const announcementsHtml = announcements.value.map(announcement =>
             `<li>${announcement.Title}</li>`);              
           this._topPlaceholder.domElement.innerHTML=`<div class="${styles.app}">
             <ul>${announcementsHtml.join('')}</ul></div>`;
        }).catch(error => console.log(error));
    }
  }
}
