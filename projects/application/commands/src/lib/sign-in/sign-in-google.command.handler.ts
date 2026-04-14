import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { SignInResponse } from '@application/messages';
import { AuthWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

export class SignInGoogleRequest {
  provider: string = 'google';
  email: string = '';
  fullName?: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignInGoogleCommandHandler implements RequestHandler<SignInGoogleRequest, SignInResponse> {
  private readonly authRepository = inject(AuthWriteableRepository);

  /**
   * Handles the login of an administrator user using Google.
   *
   * @param {SignInGoogleRequest} request - The request object containing Google profile details.
   * @returns {Observable<SignInResponse>} An observable that emits a successful user login response or throws an error.
   */
  public handle(request: SignInGoogleRequest): Observable<SignInResponse> {
    return this.authRepository.loginWithGoogle(request);
  }
}
