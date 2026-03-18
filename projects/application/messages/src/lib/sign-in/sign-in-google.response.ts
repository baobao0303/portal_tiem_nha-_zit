import { propertyMapper } from '@core/base';

export class SignInGoogleResponse {
  @propertyMapper('vato', String)
  public vato: string = '';

  @propertyMapper('vrto', String)
  public vrto: string = '';

  @propertyMapper('contactId', String)
  public contactId: string = '';

  @propertyMapper('userId', String)
  public userId: string = '';
}
