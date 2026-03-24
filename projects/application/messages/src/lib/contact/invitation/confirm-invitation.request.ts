import { propertyMapper } from '@core/base';

export class ConfirmInvitationRequest {
  @propertyMapper('invitationToken', String)
  public invitationToken?: string;

  @propertyMapper('isAccept', Boolean)
  public isAccept: boolean = false;

  constructor(invitationToken: string = '', isAccept: boolean = true) {
    this.invitationToken = invitationToken;
    this.isAccept = isAccept;
  }
}
