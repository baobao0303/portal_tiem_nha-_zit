import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllNotificationRequest, GetAllNotificationResponse, GetUnreadNotificationResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { INotificationReadableRepository } from '@core/domain';
import { map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class NotificationReadableRepository extends ReadableRepository implements INotificationReadableRepository {
  public getAll(request: GetAllNotificationRequest): Observable<GetAllNotificationResponse[]> {
    const endPoint = `${this._context.endPoint}/Notification/get-notifications-by-user-id`;

    return this.findInAll(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        return response;
      }),
    );
  }
  public getUnreadNotificationCount(): Observable<GetUnreadNotificationResponse[]> {
    const endPoint = `${this._context.endPoint}/Notification/count-unread-notification-by-user-id`;

    return this.findAll(endPoint).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }
}
