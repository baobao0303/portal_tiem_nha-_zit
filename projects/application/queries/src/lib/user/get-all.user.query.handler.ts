import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllUserPaging, GetAllUserRequest } from '@application/messages';
import { UserReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllUserQueryHandler implements RequestHandler<GetAllUserRequest, GetAllUserPaging> {
  private readonly _userRepository: UserReadableRepository = inject(UserReadableRepository);

  /**
   * Handle get all user query
   * @param request GetAllUserRequest
   * @returns Observable<GetAllUserPaging>
   * @see {@link UserReadableRepository}
   */
  public handle(request: GetAllUserRequest): Observable<GetAllUserPaging> {
    const result = this._userRepository.getAll(request);

    return result;
  }
}
