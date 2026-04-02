import { propertyMapper } from '@core/base';
import { MessageMetadataBO } from './message-metadata.bo';

export class GetMessagesByChannelIdBO {
  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('senderId', String)
  public senderId: string = '';

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('messageType', String)
  public messageType: string = '';

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';

  @propertyMapper('metadata', MessageMetadataBO)
  public metadata: MessageMetadataBO = new MessageMetadataBO();
}
