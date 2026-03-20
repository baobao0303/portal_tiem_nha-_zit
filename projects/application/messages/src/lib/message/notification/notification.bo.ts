import { propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';
import { ChannelBO } from '../chat';

export class NotificationBO {
  @propertyMapper('sender', ContactBO)
  public sender: ContactBO = new ContactBO();

  @propertyMapper('channel', ChannelBO)
  public channel: ChannelBO = new ChannelBO();

  @propertyMapper('content', String)
  public content: string = '';

  @propertyMapper('messageType', String)
  public messageType: string = '';

  @propertyMapper('notificationType', String)
  public notificationType: string = '';

  @propertyMapper('isRead', Boolean)
  public isRead: boolean = false;

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('invitationToken', String)
  public invitationToken: string = '';
}
