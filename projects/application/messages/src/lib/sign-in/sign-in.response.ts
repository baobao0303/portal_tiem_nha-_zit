import { propertyMapper } from '@core/base';

export class SignInResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('fullName', String)
  public fullName: string = '';

  @propertyMapper('role', String)
  public role: string = '';
}
