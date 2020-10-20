import { DisplayMode, EnvironmentType } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {IAumGetDataWebPartProps} from '../AumGetDataWebPart';

export interface IAumGetDataProps {
  description: string;
  displayMode: DisplayMode;
  environment: EnvironmentType;
  wpContext: WebPartContext;
  WPProps: IAumGetDataWebPartProps;
}
