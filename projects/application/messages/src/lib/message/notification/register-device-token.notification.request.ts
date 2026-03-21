import { propertyMapper } from '@core/base';

export class RegisterDeviceTokenNotificationRequest {
  @propertyMapper('token', String)
  public token: string = '';
}
