import { propertyMapper } from '@core/base';
import { IdBO } from '../../../id.bo';
import { ContactBO } from '../../contact';

export class ReadMessagesResponse {
  @propertyMapper('messageIds', IdBO)
  public messageIds: IdBO[] = [];

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('unreadMessages', Number)
  public unreadMessages: number = 0;

  @propertyMapper('contact', ContactBO)
  public contact: ContactBO = new ContactBO();
}
