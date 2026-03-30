import { propertyMapper } from '@core/base';

export class VerifyInvitationBO {
  @propertyMapper('invitationStatus', Number)
  public invitationStatus: number = 0;

  @propertyMapper('invitationStatusName', String)
  public invitationStatusName: string = '';

  @propertyMapper('isUserExists', Boolean)
  public isUserExists: Boolean = false;
}
