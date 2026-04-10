import { propertyMapper } from '@core/base';

export class InvitationRequest {
  @propertyMapper('values', Array)
  public values: { value: string }[] = [];

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('sendType', Number)
  public sendType: number = 0;

  @propertyMapper('description', String)
  public description: string = '';

  constructor(init?: Partial<InvitationRequest>) {
    Object.assign(this, init);
  }
}
