import { GetAllCountriesRequest, GetAllCountriesResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface ICountriesReadableRepository extends IReadableRepository {
  getAll(request: GetAllCountriesRequest): Observable<GetAllCountriesResponse[]>;
}
