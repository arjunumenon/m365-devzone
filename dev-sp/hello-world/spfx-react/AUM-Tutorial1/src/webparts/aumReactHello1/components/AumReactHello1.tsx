import * as React from 'react';
import styles from './AumReactHello1.module.scss';
import { IAumReactHello1Props } from './IAumReactHello1Props';
import { escape } from '@microsoft/sp-lodash-subset';

import {IColor} from '../IColor';
import {ColorList, IColorListProps} from './ColorList';

export default class AumReactHello1 extends React.Component<IAumReactHello1Props, {}> {
  private _colors: IColor[] = [
    {Id: 1, Title: "Red"},
    {Id: 2, Title: "Blue"},
    {Id: 3, Title: "Orange"},
    {Id: 4, Title: "Awesome"},
    {Id: 4, Title: "Beauty"}
  ];

  public render(): React.ReactElement<IAumReactHello1Props> {
    return (
      <div className={ styles.aumReactHello1 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint! Arjuns React</span>
              <ColorList colors = {this._colors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
