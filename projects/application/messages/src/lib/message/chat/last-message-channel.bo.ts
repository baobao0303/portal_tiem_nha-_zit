import { BOBase, propertyMapper } from '@core/base';
import { MessageBO } from './message.bo';
import { ChannelBO } from './channel.bo';
import { ContactBO } from '../../contact';

export class LastMessageChannelBO extends BOBase {
  @propertyMapper('message', MessageBO)
  public message: MessageBO = new MessageBO();

  @propertyMapper('channel', ChannelBO)
  public channel: ChannelBO = new ChannelBO();

  @propertyMapper('sender', ContactBO)
  public sender: ContactBO = new ContactBO();
}
