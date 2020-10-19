import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, Version,Log } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AumGetDataWebPartStrings';
import AumGetData from './components/AumGetData';
import { IAumGetDataProps } from './components/IAumGetDataProps';

export interface IAumGetDataWebPartProps {
  description: string;
}

export default class AumGetDataWebPart extends BaseClientSideWebPart<IAumGetDataWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAumGetDataProps> = React.createElement(
      AumGetData,
      {
        description: this.properties.description,
        displayMode: this.displayMode,
        environment: Environment.type,
        wpContext: this.context

      }
    );

    ReactDom.render(element, this.domElement);

    Log.info('ReactComponent','message',this.context.serviceScope);
    Log.warn('ReactComponent','WARNING message',this.context.serviceScope);
    Log.error('ReactComponent',new Error('Error Message'),this.context.serviceScope);
    Log.verbose('ReactComponent','VERBOSE MEssage',this.context.serviceScope);
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
                }),
                PropertyPaneTextField('myContinent',{
                  label:'Continent where I Reside'
                }),
                PropertyPaneSlider('numContinentsVisited', {
                  label: 'Number of continents I\'ve Visited',
                  min:1, max: 7, showValue:true
                })
              ]
            }
          ]
        }
      ]
    };
  }


}
