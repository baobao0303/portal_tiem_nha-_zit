import { propertyMapper } from '@core/base';
import { ChannelBO } from './channel.bo';
import { MessageBO } from './message.bo';
import { ContactBO } from '../../contact';

export class GetChannelsByUserIdMessageResponse {
  @propertyMapper('unreadMessages', Number)
  public unreadMessages: number = 0;

  @propertyMapper('lastMessageAt', Date)
  public lastMessageAt?: Date;

  @propertyMapper('message', MessageBO)
  public message?: MessageBO;

  @propertyMapper('channel', ChannelBO)
  public channel!: ChannelBO;

  @propertyMapper('sender', ContactBO)
  public sender?: ContactBO;
}
