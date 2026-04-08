import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllGendersRequest, GetAllGendersResponse } from '@application/messages';
import { GendersReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllGendersQueryHandler implements RequestHandler<GetAllGendersRequest, GetAllGendersResponse[]> {
  private readonly repository = inject(GendersReadableRepository);

  /**
   * Handle get all genders query
   * @param {GetAllGendersRequest} request
   * @returns {Observable<GetAllGendersResponse[]>}
   * @see {@link GendersReadableRepository}
   */
  public handle(request: GetAllGendersRequest): Observable<GetAllGendersResponse[]> {
    const result = this.repository.getAll(request);

    return result;
  }
}
