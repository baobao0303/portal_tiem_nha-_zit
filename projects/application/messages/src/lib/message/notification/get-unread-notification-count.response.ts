import { propertyMapper } from '@core/base';

export class GetUnreadNotificationResponse {
  @propertyMapper('unreadNotifications')
  public unreadNotifications: number = 0;
}
