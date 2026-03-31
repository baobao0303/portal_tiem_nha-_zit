import { propertyMapper } from '@core/base';

export class SendMessageBodyRequest {
  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';
}
