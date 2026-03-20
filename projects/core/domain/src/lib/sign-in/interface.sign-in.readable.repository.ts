import { SignInErrorResponse, SignInRequest, SignInResponse, SignInWithGoogleErrorResponse, SignInWithGoogleRequest, SignInWithGoogleResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';
import { SignInGoogleErrorResponse, SignInGoogleRequest, SignInGoogleResponse } from '@application/messages';

export interface ISignInReadableRepository extends IReadableRepository {
  signIn(request: SignInRequest): Observable<SignInResponse | SignInErrorResponse>;
  signInWithGoogle(request: SignInWithGoogleRequest): Observable<SignInWithGoogleResponse | SignInWithGoogleErrorResponse>;
  signInGoogle(request: SignInGoogleRequest): Observable<SignInGoogleResponse | SignInGoogleErrorResponse>;
}
