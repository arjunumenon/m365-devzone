import { DisplayMode, EnvironmentType } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAumGetDataProps {
  description: string;
  selectedmyContinent: string;
  // numContinentsVisited: number;
  displayMode: DisplayMode;
  environment: EnvironmentType;
  wpContext: WebPartContext;

}
