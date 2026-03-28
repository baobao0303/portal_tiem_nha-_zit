import { propertyMapper } from '@core/base';
import { IdBO } from '../../../id.bo';

export class CreateMessageRequest {
  @propertyMapper('content', String)
  public content: string = '';

  @propertyMapper('messageTypeId', String)
  public messageTypeId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('senderId', String)
  public senderId: string = '';

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';

  @propertyMapper('receiverIds', IdBO)
  public receiverIds: IdBO[] = [];

  @propertyMapper('mediaIds', IdBO)
  public mediaIds: IdBO[] = [];

  @propertyMapper('notificationType', Number)
  public notificationType: number = 1;
}
