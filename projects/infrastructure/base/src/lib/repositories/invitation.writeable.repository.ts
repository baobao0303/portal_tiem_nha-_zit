import { ConfirmInvitationErrorResponse, ConfirmInvitationRequest, ConfirmInvitationResponse, GetInvitationByTokenRequest, GetInvitationByTokenResponse } from '@application/messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResponseMapper } from '@core/base';
import { WriteableRepository } from '../writeable.repository';
import { IInvitationReadableRepository, IInvitationWriteableRepository } from '@core/domain';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvitationWriteableRepository extends WriteableRepository implements IInvitationWriteableRepository {
  confirmInvitation(request: ConfirmInvitationRequest): Observable<ConfirmInvitationResponse | ConfirmInvitationErrorResponse> {
    const endPoint = `${this._context.endPoint}/Invitation/confirm-invitation`;
    return this.add(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(ConfirmInvitationResponse).map(data)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(ConfirmInvitationErrorResponse).map(error.error))),
    );
  }
}
