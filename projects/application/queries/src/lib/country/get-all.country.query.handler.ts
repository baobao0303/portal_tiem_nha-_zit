import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { Observable } from 'rxjs';
import { GetAllCountriesRequest, GetAllCountriesResponse } from '@application/messages';
import { CountriesReadableRepository } from '@infrastructure/base';

@Injectable({ providedIn: 'root' })
export class GetAllCountriesQueryHandler implements RequestHandler<GetAllCountriesRequest, GetAllCountriesResponse[]> {
  private readonly repository = inject(CountriesReadableRepository);

  public handle(request: GetAllCountriesRequest): Observable<GetAllCountriesResponse[]> {
    const result = this.repository.getAll(request);

    return result;
  }
}
