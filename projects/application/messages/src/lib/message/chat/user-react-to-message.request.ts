import { propertyMapper } from '@core/base';

export class UserReactToMessageRequest {
  @propertyMapper('builtinMessageId', String)
  public builtinMessageId: string = '';

  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';
}
