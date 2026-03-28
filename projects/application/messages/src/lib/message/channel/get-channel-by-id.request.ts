import { propertyMapper } from '@core/base';

export class GetChannelByIdRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';
}
