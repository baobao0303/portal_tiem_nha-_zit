import { propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';
import { MessageBO } from './message.bo';

export class GetLastMessageInChannelResponse {
  @propertyMapper('message', MessageBO)
  public message: MessageBO = new MessageBO();

  @propertyMapper('sender', ContactBO)
  public sender: ContactBO = new ContactBO();

  @propertyMapper('channelId', String)
  public channelId: string = '';
}
