import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestMapper, ResponseMapper } from '@core/base';
import { catchError, map, Observable, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { SignUpErrorResponse, SignUpRequest, SignUpResponse } from '@application/messages';
import { ISignUpReadableRepository } from '@core/domain';

@Injectable({ providedIn: 'root' })
export class SignUpReadableRepository extends ReadableRepository implements ISignUpReadableRepository {
  public signUp(request: SignUpRequest): Observable<SignUpResponse | SignUpErrorResponse> {
    const endPoint = `${this._context.endPoint}/User/sign-up`;

    return this.httpClient.post(endPoint, new RequestMapper(SignUpRequest).map(request)).pipe(
      map((response) => new ResponseMapper(SignUpResponse).map(response)),
      catchError((error: HttpErrorResponse) => {
        let errorMapper: ResponseMapper<SignUpErrorResponse>;
        if (error.status === HttpStatusCode.BadRequest) {
          errorMapper = new ResponseMapper(SignUpErrorResponse);
          return of(errorMapper.map(error.error));
        } else if (error.status === 0) {
          errorMapper = new ResponseMapper(SignUpErrorResponse);
          return of(errorMapper.map({ title: 'Connection Error', statusCode: HttpStatusCode.InternalServerError, detail: 'Unable to connect to the server' }));
        } else {
          errorMapper = new ResponseMapper(SignUpErrorResponse);
          return of(errorMapper.map({ title: 'Internal Server Error', statusCode: HttpStatusCode.InternalServerError, detail: 'An error occurred while processing your request' }));
        }
      }),
    );
  }
}
