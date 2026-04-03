import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHandler } from '@application/base';
import { SignUpErrorResponse, SignUpRequest, SignUpResponse } from '@application/messages';
import { BROWSER_STORAGE, SignUpReadableRepository } from '@infrastructure/base';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignUpQueryHandler implements RequestHandler<SignUpRequest, SignUpResponse | SignUpErrorResponse> {
  private readonly _signUpRepository = inject(SignUpReadableRepository);

  public handle(request: SignUpRequest): Observable<SignUpResponse | SignUpErrorResponse> {
    const result = this._signUpRepository.signUp(request);
    return result;
  }
}
