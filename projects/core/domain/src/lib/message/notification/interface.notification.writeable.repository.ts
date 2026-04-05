import { RegisterDeviceTokenNotificationRequest, RegisterDeviceTokenNotificationResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface INotificationWriteableRepository extends IWriteableRepository {
  registerDeviceToken(request: RegisterDeviceTokenNotificationRequest): Observable<RegisterDeviceTokenNotificationResponse>;
}
