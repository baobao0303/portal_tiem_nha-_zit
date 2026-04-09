import { propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';

export class GetRepliesByMessageIdResponse {
  @propertyMapper('totalReplies', Number)
  public totalReplies: number = 0;

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('senders', ContactBO)
  public senders: ContactBO[] = [];
}
