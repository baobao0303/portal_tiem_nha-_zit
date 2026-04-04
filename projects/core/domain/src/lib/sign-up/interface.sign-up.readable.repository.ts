import { SignUpErrorResponse, SignUpRequest, SignUpResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface ISignUpReadableRepository extends IReadableRepository {
  signUp(request: SignUpRequest): Observable<SignUpResponse | SignUpErrorResponse>;
}
