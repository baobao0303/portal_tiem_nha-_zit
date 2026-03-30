import { propertyMapper } from '@core/base';

export class InvitationResponse {
  @propertyMapper('values', Array)
  public values: { value: string }[] = [];

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('description', String)
  public description: string = '';
}
