import { propertyMapper } from '@core/base';

export class GetCountUnreadMessageRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';
}
