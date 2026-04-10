import { GetAllCityRequest, GetAllCityResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface ICityReadableRepository extends IReadableRepository {
  getAll(request: GetAllCityRequest): Observable<GetAllCityResponse[]>;
}
