import { GetAllGendersRequest, GetAllGendersResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IGendersReadableRepository extends IReadableRepository {
  getAll(request: GetAllGendersRequest): Observable<GetAllGendersResponse[]>;
}
