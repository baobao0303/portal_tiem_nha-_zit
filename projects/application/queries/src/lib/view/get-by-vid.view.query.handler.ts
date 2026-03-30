import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByVidViewRequest, GetByVidViewResponse } from '@application/messages';
import { ViewReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetByVidViewQueryHandler implements RequestHandler<GetByVidViewRequest, GetByVidViewResponse> {
  private readonly repository = inject(ViewReadableRepository);

  public handle(request: GetByVidViewRequest): Observable<GetByVidViewResponse> {
    const result = this.repository.getViewByVid(request);

    return result;
  }
}
