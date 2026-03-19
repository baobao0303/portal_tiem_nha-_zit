import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseMapper } from '@core/base';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { GetAllCountriesRequest, GetAllCountriesResponse } from '@application/messages';
import { ICountriesReadableRepository } from '@core/domain';

@Injectable({
  providedIn: 'root',
})
export class CountriesReadableRepository extends ReadableRepository implements ICountriesReadableRepository {
  public getAll(request: GetAllCountriesRequest): Observable<GetAllCountriesResponse[]> {
    const endPoint = `${this._context.endPoint}/Country/get-countries`;
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetAllCountriesResponse).map(item))),
    );
  }
}
