import { propertyMapper } from '@core/base';

export class SignUpRequest {
  @propertyMapper('firstName', String)
  public firstName: string = '';

  @propertyMapper('middleName', String)
  public middleName: string = '';

  @propertyMapper('lastName', String)
  public lastName: string = '';

  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('password', String)
  public password: string = '';

  @propertyMapper('countryId', String)
  public countryId: string = '';

  @propertyMapper('cityId', String)
  public cityId: string = '';

  @propertyMapper('genderId', String)
  public genderId: string = '';

  @propertyMapper('dob', () => new Date())
  public dob: Date = new Date();

  @propertyMapper('invitationToken', String)
  public invitationToken: string | null = null;
}
