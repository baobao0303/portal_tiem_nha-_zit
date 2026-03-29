import { propertyMapper } from '@core/base';

export class SendMessageMediasRequest {
  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';
}
