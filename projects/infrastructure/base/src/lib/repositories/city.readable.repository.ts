import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllCityRequest, GetAllCityResponse, GetIdCityRequest, GetIdCityResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { ICityReadableRepository } from '@core/domain';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class CityReadableRepository extends ReadableRepository implements ICityReadableRepository {
  /**
   * Get all city
   * @param request GetAllCityRequest
   * @returns Observable<GetAllCityResponse[]>
   */
  public getAll(request: GetAllCityRequest): Observable<GetAllCityResponse[]> {
    const endPoint = `${this._context.endPoint}/City/get-cities`;
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetAllCityResponse).map(item))),
    );
  }
  /**
   * Get city by id
   * @param request GetIdCityRequest
   * @returns Observable<GetIdCityResponse[]>
   */
  public getId(request: GetIdCityRequest): Observable<GetIdCityResponse[]> {
    const endPoint = `${this._context.endPoint}/City/get-cities-by-countryId?CountryId=${request.id}`;
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetIdCityResponse).map(item))),
    );
  }
}
