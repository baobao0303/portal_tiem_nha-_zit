import { propertyMapper } from '@core/base';

export class GetInvitationByChannelIdRequest {
  @propertyMapper('ChannelId', String)
  public ChannelId: string = '';

  constructor(channelId: string = '') {
    this.ChannelId = channelId;
  }
}
