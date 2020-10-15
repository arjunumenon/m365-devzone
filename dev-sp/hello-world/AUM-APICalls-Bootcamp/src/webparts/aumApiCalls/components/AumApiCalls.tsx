import * as React from 'react';
import styles from './AumApiCalls.module.scss';
import { IAumApiCallsProps } from './IAumApiCallsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';


export default class AumApiCalls extends React.Component<IAumApiCallsProps, {}> {
  public render(): React.ReactElement<IAumApiCallsProps> {
    return (
      <div className={ styles.aumApiCalls }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
}
