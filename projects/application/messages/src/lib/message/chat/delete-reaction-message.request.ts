import { propertyMapper } from '@core/base';

export class DeleteReactionMessageRequest {
  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';
}
