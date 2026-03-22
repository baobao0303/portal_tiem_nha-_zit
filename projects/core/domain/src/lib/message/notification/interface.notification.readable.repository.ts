import { GetAllNotificationRequest, GetAllNotificationResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface INotificationReadableRepository extends IReadableRepository {
  getAll(request: GetAllNotificationRequest): Observable<GetAllNotificationResponse[]>;
}
