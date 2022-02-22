import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'OrganizationAnnouncementsAdaptiveCardExtensionStrings';
import { IOrganizationAnnouncementsAdaptiveCardExtensionProps, IOrganizationAnnouncementsAdaptiveCardExtensionState } from '../OrganizationAnnouncementsAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  description: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IOrganizationAnnouncementsAdaptiveCardExtensionProps,
  IOrganizationAnnouncementsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      description: this.properties.description
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}