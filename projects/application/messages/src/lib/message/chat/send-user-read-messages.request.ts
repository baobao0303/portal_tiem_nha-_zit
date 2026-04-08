import { propertyMapper } from '@core/base';
import { IdBO } from '../../../id.bo';

export class SendUserReadMessagesRequest {
  @propertyMapper('messageIds', IdBO)
  public messageIds: Array<IdBO> = [];

  @propertyMapper('channelId', String)
  public channelId: string = '';
}
