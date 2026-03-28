import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { SignInRequest, SignInResponse } from '@application/messages';
import { AuthWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignInCommandHandler implements RequestHandler<SignInRequest, SignInResponse> {
  private readonly authRepository = inject(AuthWriteableRepository);

  /**
   * Handles the login of an administrator user.
   *
   * @param {SignInRequest} request - The request object containing email and password details.
   * @returns {Observable<SignInResponse>} An observable that emits a successful user login response or throws an error.
   */
  public handle(request: SignInRequest): Observable<SignInResponse> {
    return this.authRepository.login(request);
  }
}
