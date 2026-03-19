import { propertyMapper } from '@core/base';

export class SendUserStartTypingRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';
}
