import { propertyMapper } from '@core/base';

export class VerifyInvitationRequest {
  @propertyMapper('invitationToken', String)
  public InvitationToken: string = '';

  constructor(init?: Partial<VerifyInvitationRequest>) {
    Object.assign(this, init);
  }
}
