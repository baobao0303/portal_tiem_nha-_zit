import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterDeviceTokenNotificationRequest, RegisterDeviceTokenNotificationResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { INotificationWriteableRepository } from '@core/domain';
import { map, Observable } from 'rxjs';
import { WriteableRepository } from '../writeable.repository';

@Injectable({ providedIn: 'root' })
export class NotificationWriteableRepository extends WriteableRepository implements INotificationWriteableRepository {
  /**
   * Registers a device token for notifications.
   *
   * @param {RegisterDeviceTokenNotificationRequest} request - The request object containing the device token information.
   * @returns {Observable<RegisterDeviceTokenNotificationResponse>} An observable that emits the response of the registration process.
   *
   */
  public registerDeviceToken(request: RegisterDeviceTokenNotificationRequest): Observable<RegisterDeviceTokenNotificationResponse> {
    const endpoint = `${this._context.endPoint}/Notification/register-device-token`;
    const requestMapper = new RequestMapper(RegisterDeviceTokenNotificationRequest).map(request);
    return this.add(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(RegisterDeviceTokenNotificationRequest).map(data)),
    );
  }
}
