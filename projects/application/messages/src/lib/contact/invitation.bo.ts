import { propertyMapper } from '@core/base';

export class InvitationBO {
  @propertyMapper('values', Array)
  public values: { value: string }[] = [];

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('sendType', Number)
  public sendType: number = 0;

  @propertyMapper('description', String)
  public description: string = '';
}
