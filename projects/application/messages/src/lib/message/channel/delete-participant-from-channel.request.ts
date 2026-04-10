import { propertyMapper } from '@core/base';

export class DeleteParticipantFromChannelRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('contactId', String)
  public contactId: string = '';
}
