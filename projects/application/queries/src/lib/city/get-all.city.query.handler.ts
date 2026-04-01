import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllCityRequest, GetAllCityResponse } from '@application/messages';
import { CityReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllCityQueryHandler implements RequestHandler<GetAllCityRequest, GetAllCityResponse[]> {
  private readonly repository = inject(CityReadableRepository);

  /**
   * Handle get all city query
   * @param {GetAllCityRequest} request 
   * @returns {Observable<GetAllCityResponse[]>}
   * @see {@link CityReadableRepository}
   */
  public handle(request: GetAllCityRequest): Observable<GetAllCityResponse[]> {
    const result = this.repository.getAll(request);

    return result;
  }
}
