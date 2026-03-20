import { propertyMapper } from '@core/base';

export class SignInWithGoogleRequest {
  @propertyMapper('AuthenticationType', Number)
  public AuthenticationType: number = 0;
}
