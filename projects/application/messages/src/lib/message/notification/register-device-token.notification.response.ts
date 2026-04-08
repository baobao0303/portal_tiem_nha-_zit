import { propertyMapper } from '@core/base';

export class RegisterDeviceTokenNotificationResponse {
  @propertyMapper('token', String)
  public token: string = '';

  @propertyMapper('contactId', String)
  public contactId: string = '';
}
