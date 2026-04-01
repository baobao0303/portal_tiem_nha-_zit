import { propertyMapper } from '@core/base';
import { IdBO } from '../../../id.bo';

export class AddParticipantsIntoChannelRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('members', IdBO)
  public members: IdBO[] = [];

  @propertyMapper('owners', IdBO)
  public owners: IdBO[] = [];
}
