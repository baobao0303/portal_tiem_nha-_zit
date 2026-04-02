import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllNotificationRequest, GetAllNotificationResponse, GetUnreadNotificationResponse } from '@application/messages';
import { NotificationReadableRepository } from '@infrastructure/base';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllNotificationQueryHandler implements RequestHandler<GetAllNotificationRequest, GetAllNotificationResponse[]> {
  repository = inject(NotificationReadableRepository);

  public handle(request: GetAllNotificationRequest): Observable<GetAllNotificationResponse[]> {
    return this.repository.getAll(request);
  }

  public getUnreadCount(): Observable<GetUnreadNotificationResponse[]> {
    return this.repository.getUnreadNotificationCount();
  }
}
