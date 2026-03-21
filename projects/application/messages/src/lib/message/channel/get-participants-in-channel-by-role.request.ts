import { propertyMapper } from '@core/base';

export class GetParticipantsInChannelByRoleRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('owner', Boolean)
  public owner: boolean = false;
}
