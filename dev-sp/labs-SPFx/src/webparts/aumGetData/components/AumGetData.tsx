import * as React from 'react';
import styles from './AumGetData.module.scss';
import { IAumGetDataProps } from './IAumGetDataProps';
import {IAumGetDataState} from './IAumGetDataState';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  DisplayMode,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { IAumGetDataWebPartProps } from '../AumGetDataWebPart';

export default class AumGetData extends React.Component<IAumGetDataProps, IAumGetDataState> {
  
  private _getPageInformation() :string{
    const pageInformation: string =  this.props.displayMode===DisplayMode.Edit ? 'You are in Display Mode' : 'You are in Read Mode';

    return pageInformation;
  }

  private _getEnvironmentInfo() : string{
    const environmentInfo: string = this.props.environment === EnvironmentType.Local ? 'You are in Local' : 'You are in SP Mode';

    return environmentInfo;
  }

  public render(): React.ReactElement<IAumGetDataProps> {
    return (
      <div className={ styles.aumGetData }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p>{this._getPageInformation()}</p>
              <p>{this._getEnvironmentInfo()}</p>
              <p className = {styles.description}>Selected Continent  is : {this.props.selectedmyContinent}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this.doSomething(this.props.description);
  }
  
  public componentDidUpdate(prevProps: IAumGetDataProps,
                            prevState: IAumGetDataState): void {
    if (this.props.description !== prevProps.description) {
      this.doSomething(this.props.description);
    }
  }
  
  private doSomething(description: string): void {
    // Do something with the property
  }
}
