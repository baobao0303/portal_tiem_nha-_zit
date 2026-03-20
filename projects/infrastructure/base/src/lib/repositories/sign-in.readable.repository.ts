import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInErrorResponse, SignInRequest, SignInResponse, SignInWithGoogleErrorResponse, SignInWithGoogleRequest, SignInWithGoogleResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { ISignInReadableRepository } from '@core/domain';
import { catchError, filter, map, Observable, of, throwError } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignInGoogleErrorResponse, SignInGoogleRequest, SignInGoogleResponse } from '@application/messages';

@Injectable({ providedIn: 'root' })
export class SignInReadableRepository extends ReadableRepository implements ISignInReadableRepository {
  public signIn(request: SignInRequest): Observable<SignInResponse | SignInErrorResponse> {
    const endPoint = `${this._context.endPoint}/User/sign-in`;

    return this.httpClient.post(endPoint, new RequestMapper(SignInRequest).map(request)).pipe(
      map((response) => new ResponseMapper(SignInResponse).map(response)),
      catchError((error: HttpErrorResponse) => {
        let errorMapper: ResponseMapper<SignInErrorResponse>;
        if (error.status === HttpStatusCode.BadRequest) {
          errorMapper = new ResponseMapper(SignInErrorResponse);
          return of(errorMapper.map(error.error));
        } else if (error.status === 0) {
          errorMapper = new ResponseMapper(SignInErrorResponse);
          return of(errorMapper.map({ title: 'Connection Error', statusCode: HttpStatusCode.InternalServerError, detail: 'Unable to connect to the server' }));
        } else {
          errorMapper = new ResponseMapper(SignInErrorResponse);
          return of(errorMapper.map({ title: 'Internal Server Error', statusCode: HttpStatusCode.InternalServerError, detail: 'An error occurred while processing your request' }));
        }
      }),
    );
  }
  public signInWithGoogle(request: SignInWithGoogleRequest): Observable<SignInWithGoogleResponse | SignInWithGoogleErrorResponse> {
    const endPoint = `${this._context.endPoint}/Authentication/get-authentication-url?AuthenticationType=${request.AuthenticationType}`;

    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => {
        const mappedData = new ResponseMapper(SignInWithGoogleResponse).map(data);
        return mappedData;
      }),
    );
  }

  public signInGoogle(request: SignInGoogleRequest): Observable<SignInGoogleResponse | SignInGoogleErrorResponse> {
    const endPoint = `${this._context.endPoint}/Authentication/google-sign-in?Code=${request.code}`;

    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => {
        const mappedData = new ResponseMapper(SignInGoogleResponse).map(data);
        return mappedData;
      }),
    );
  }
}
