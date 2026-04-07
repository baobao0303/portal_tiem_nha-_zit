import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AddParticipantsIntoChannelErrorResponse,
  AddParticipantsIntoChannelRequest,
  AddParticipantsIntoChannelResponse,
  DeleteParticipantFromChannelErrorResponse,
  DeleteParticipantFromChannelRequest,
  DeleteParticipantFromChannelResponse,
} from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IChannelWriteableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { WriteableRepository } from '../writeable.repository';

@Injectable({ providedIn: 'root' })
export class ChannelWriteableRepository extends WriteableRepository implements IChannelWriteableRepository {
  /**
   * Adds participants into a channel.
   *
   * @param {AddParticipantsIntoChannelRequest} request - The request object containing the details of the participants to be added.
   * @returns {Observable<AddParticipantsIntoChannelResponse | AddParticipantsIntoChannelErrorResponse>} An observable that emits the response or an error response.
   */
  public addParticipantsIntoChannel(request: AddParticipantsIntoChannelRequest): Observable<AddParticipantsIntoChannelResponse | AddParticipantsIntoChannelErrorResponse> {
    const endpoint = `${this._context.endPoint}/Channel/add-participants-into-channel`;
    const requestMapper = new RequestMapper(AddParticipantsIntoChannelRequest).map(request);
    return this.add(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(AddParticipantsIntoChannelResponse).map(data)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(AddParticipantsIntoChannelErrorResponse).map(error.error))),
    );
  }

  /**
   * Deletes a participant from a channel.
   *
   * @param {DeleteParticipantFromChannelRequest} request - The request object containing the details of the participant to be deleted.
   * @returns {Observable<DeleteParticipantFromChannelResponse | DeleteParticipantFromChannelErrorResponse>} An observable that emits the response or an error response.
   */
  public deleteParticipantFromChannel(request: DeleteParticipantFromChannelRequest): Observable<DeleteParticipantFromChannelResponse | DeleteParticipantFromChannelErrorResponse> {
    const endpoint = `${this._context.endPoint}/Channel/delete-participant-from-channel`;
    const requestMapper = new RequestMapper(DeleteParticipantFromChannelRequest).map(request);
    return this.delete(endpoint, { params: new HttpParams().set('channelId', request.channelId).set('contactId', request.contactId) }).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(DeleteParticipantFromChannelResponse).map(data)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(DeleteParticipantFromChannelErrorResponse).map(error.error))),
    );
  }
}
