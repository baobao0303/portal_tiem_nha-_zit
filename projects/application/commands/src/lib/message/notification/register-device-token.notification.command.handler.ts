import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { RegisterDeviceTokenNotificationRequest, RegisterDeviceTokenNotificationResponse } from '@application/messages';
import { NotificationWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterDeviceTokenNotificationCommandHandler implements RequestHandler<RegisterDeviceTokenNotificationRequest, RegisterDeviceTokenNotificationResponse> {
  private readonly notificationWriteableRepository = inject(NotificationWriteableRepository);

  /**
   * Handles the registration of a device token for notifications.
   *
   * @param {RegisterDeviceTokenNotificationRequest} request - The request object containing the device token information.
   * @returns {Observable<RegisterDeviceTokenNotificationResponse>} An observable that emits the response of the registration process.
   */
  public handle(request: RegisterDeviceTokenNotificationRequest): Observable<RegisterDeviceTokenNotificationResponse> {
    const result = this.notificationWriteableRepository.registerDeviceToken(request);

    return result;
  }
}
