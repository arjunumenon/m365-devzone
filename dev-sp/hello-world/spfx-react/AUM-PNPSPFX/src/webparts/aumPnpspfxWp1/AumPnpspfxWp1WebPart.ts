import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AumPnpspfxWp1WebPartStrings';
import AumPnpspfxWp1 from './components/AumPnpspfxWp1';
import { IAumPnpspfxWp1Props } from './components/IAumPnpspfxWp1Props';

export interface IAumPnpspfxWp1WebPartProps {
  description: string;
}

export default class AumPnpspfxWp1WebPart extends BaseClientSideWebPart <IAumPnpspfxWp1WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAumPnpspfxWp1Props> = React.createElement(
      AumPnpspfxWp1,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
