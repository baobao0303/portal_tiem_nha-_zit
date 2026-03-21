import { RequestHandler } from '@application/base';
import { GetAllViewsRequest, GetAllViewsResponse } from '@application/messages';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ViewReadableRepository } from '@infrastructure/base';

@Injectable({ providedIn: 'root' })
export class GetAllViewQueryHandler implements RequestHandler<GetAllViewsRequest, GetAllViewsResponse[]> {
  repository = inject(ViewReadableRepository);

  public handle(request: GetAllViewsRequest): Observable<GetAllViewsResponse[]> {
    return this.repository.getAll(request);
  }
}
