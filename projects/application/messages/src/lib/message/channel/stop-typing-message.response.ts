import { propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';

export class StopTypingMessageResponse {
  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('contact', ContactBO)
  public contactBO: ContactBO = new ContactBO();

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';
}
