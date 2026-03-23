import { propertyMapper } from '@core/base';

export class SignInGoogleRequest {
  @propertyMapper('code', String)
  public code: string = '';
}
