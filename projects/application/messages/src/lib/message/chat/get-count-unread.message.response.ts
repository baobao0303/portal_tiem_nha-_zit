import { propertyMapper } from '@core/base';

export class GetCountUnreadMessageResponse {
  @propertyMapper('unreadMessages', Number)
  public unreadMessages: number = 0;

  @propertyMapper('channelId', String)
  public channelId: string = '';
}
