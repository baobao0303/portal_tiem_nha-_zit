import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByRoleIdViewRequest, GetByRoleIdViewResponse } from '@application/messages';
import { ViewReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetByRoleIdViewQueryHandler implements RequestHandler<GetByRoleIdViewRequest, GetByRoleIdViewResponse[]> {
  private readonly repository = inject(ViewReadableRepository);

  /**
   * Handles the request to get a view by role ID.
   *
   * @param {GetByRoleIdViewRequest} request - The request object containing the role ID.
   * @returns {Observable<GetByRoleIdViewResponse[]>} The result of the view fetched by role ID.
   */
  public handle(request: GetByRoleIdViewRequest): Observable<GetByRoleIdViewResponse[]> {
    const result = this.repository.getViewByRoleId(request);

    return result;
  }
}
