import { propertyMapper } from '@core/base';

export class ConfirmInvitationResponse {
  @propertyMapper('invitationToken', String)
  public filters?: string;

  @propertyMapper('isAccept', Boolean)
  public isAccept: boolean = false;

  @propertyMapper('message', String)
  public message: String = '';
}
