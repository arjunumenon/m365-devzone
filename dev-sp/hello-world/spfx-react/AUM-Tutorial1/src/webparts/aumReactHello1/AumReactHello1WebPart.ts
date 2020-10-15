import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AumReactHello1WebPartStrings';
import AumReactHello1 from './components/AumReactHello1';
import { IAumReactHello1Props } from './components/IAumReactHello1Props';

export interface IAumReactHello1WebPartProps {
  description: string;
}

export default class AumReactHello1WebPart extends BaseClientSideWebPart<IAumReactHello1WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAumReactHello1Props > = React.createElement(
      AumReactHello1,
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
