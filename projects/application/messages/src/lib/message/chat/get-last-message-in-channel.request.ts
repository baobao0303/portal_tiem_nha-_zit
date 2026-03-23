import { propertyMapper } from '@core/base';
import { IdBO } from '../../../id.bo';

export class GetLastMessageInChannelRequest {
  @propertyMapper('channelId', IdBO)
  public idBO: IdBO = new IdBO();
}
