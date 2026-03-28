import { propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';
import { ChannelBO } from './channel.bo';
import { MessageBO } from './message.bo';

export class CreateMessageResponse {
  @propertyMapper('message', MessageBO)
  public message?: MessageBO;

  @propertyMapper('channel', ChannelBO)
  public channel!: ChannelBO;

  @propertyMapper('sender', ContactBO)
  public sender?: ContactBO;
}
