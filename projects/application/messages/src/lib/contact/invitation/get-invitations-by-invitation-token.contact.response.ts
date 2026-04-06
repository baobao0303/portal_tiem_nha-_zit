import { propertyMapper } from '@core/base';
import { string, number } from 'zod';

export class GetInvitationByTokenResponse {
  @propertyMapper('fromContactId', string)
  public fromContactId: string = '';

  @propertyMapper('email', string)
  public email: string = '';

  @propertyMapper('phone', string)
  public phone: string | null = null;

  @propertyMapper('description', string)
  public description: string = '';

  @propertyMapper('invitationToken', string)
  public invitationToken: string = '';

  @propertyMapper('invitationStatus', number)
  public invitationStatus: number = 0;

  @propertyMapper('expiredDate', string)
  public expiredDate: string | null = null;
}
