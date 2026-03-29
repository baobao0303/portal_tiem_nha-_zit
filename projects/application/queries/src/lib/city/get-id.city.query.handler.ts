import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetIdCityRequest, GetIdCityResponse } from '@application/messages';
import { CityReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetIdCityQueryHandler implements RequestHandler<GetIdCityRequest, GetIdCityResponse[]> {
  private readonly repository = inject(CityReadableRepository);

  public handle(request: GetIdCityRequest): Observable<GetIdCityResponse[]> {
    const result = this.repository.getId(request);

    return result;
  }
}
