import * as React from 'react';
import styles from './AumPnpspfxWp1.module.scss';
import { IAumPnpspfxWp1Props } from './IAumPnpspfxWp1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AumPnpspfxWp1 extends React.Component<IAumPnpspfxWp1Props, {}> {
  public render(): React.ReactElement<IAumPnpspfxWp1Props> {
    return (
      <div className={ styles.aumPnpspfxWp1 }>
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
