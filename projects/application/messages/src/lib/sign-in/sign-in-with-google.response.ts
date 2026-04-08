import { propertyMapper } from '@core/base';

export class SignInWithGoogleResponse {
  @propertyMapper('url', String)
  public url: string = '';
}
