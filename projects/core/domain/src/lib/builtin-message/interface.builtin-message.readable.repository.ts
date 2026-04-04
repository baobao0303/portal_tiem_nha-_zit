import { GetDefaultBuiltinMessageRequest, GetDefaultBuiltinMessageResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IBuiltinMessageReadableRepository extends IReadableRepository {
  getDefaultBuiltinMessage(request: GetDefaultBuiltinMessageRequest): Observable<GetDefaultBuiltinMessageResponse[]>;
}
