import { propertyMapper } from '@core/base';

export class GetInvitationByTokenRequest {
  @propertyMapper('invitationToken', String)
  public InvitationToken: string = '';

  constructor(init?: Partial<GetInvitationByTokenRequest>) {
    Object.assign(this, init);
  }
}
