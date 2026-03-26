import { PagingBaseResponse, propertyMapper } from '@core/base';
import { NotificationBO } from './notification.bo';

export class GetAllNotificationResponse extends PagingBaseResponse {
  @propertyMapper('items', NotificationBO)
  public items: NotificationBO[] = [];
}
