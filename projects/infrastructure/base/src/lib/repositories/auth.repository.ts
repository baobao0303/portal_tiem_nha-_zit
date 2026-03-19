import { Injectable } from '@angular/core';
import { WriteableRepository } from '../writeable.repository';
import { Observable, map } from 'rxjs';
import { SignInRequest, SignInResponse } from '@application/messages';

@Injectable({
  providedIn: 'root'
})
export class AuthWriteableRepository extends WriteableRepository {
  /**
   * Logs in an admin using the Node API
   * Uses withCredentials: true so that the adminAccessToken cookie is stored securely by the browser.
   */
  public login(request: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<{ success: boolean, data: { admin: SignInResponse }, message?: string }>(
      '/api/admin/auth/login', 
      request,
      this.mergeOptions({ withCredentials: true })
    ).pipe(
      map(res => res.data.admin)
    );
  }

  /**
   * Logs out the admin securely by calling the API to destroy the HttpOnly cookie.
   */
  public logout(): Observable<any> {
    return this.httpClient.post('/api/admin/auth/logout', {}, this.mergeOptions({ withCredentials: true }));
  }
}
