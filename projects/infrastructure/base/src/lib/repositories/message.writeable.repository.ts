import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CreateChannelErrorResponse,
  CreateChannelMessageRequest,
  CreateChannelMessageResponse,
  CreateMessageErrorResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  UpdateChannelErrorResponse,
  UpdateChannelMessageRequest,
  UpdateChannelMessageResponse,
} from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IMessageWriteableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { WriteableRepository } from '../writeable.repository';

@Injectable({ providedIn: 'root' })
export class MessageWriteableRepository extends WriteableRepository implements IMessageWriteableRepository {
  /**
   * Creates a new channel by sending a request to the OpenAI CreateChannel endpoint.
   *
   * @param {CreateChannelMessageRequest} request - The request object containing the necessary data to create a channel.
   * @returns {Observable<CreateChannelMessageResponse>} An observable that emits the response of the create channel request.
   */
  public createChannel(request: CreateChannelMessageRequest): Observable<CreateChannelMessageResponse> {
    const endPoint = `${this._context.endPoint}/Channel/create-channel`;
    const requestMapper = new RequestMapper(CreateChannelMessageRequest).map(request);
    return this.add(endPoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(CreateChannelMessageResponse).map(data)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(CreateChannelErrorResponse).map(error.error))),
    );
  }

  /**
   * Creates a new message.
   *
   * @param {CreateMessageRequest} request - The request object containing the message details.
   * @returns {Observable<CreateMessageResponse>} An observable that emits the response of the create message operation.
   */
  public createMessage(request: CreateMessageRequest): Observable<CreateMessageResponse> {
    const endpoint = `${this._context.endPoint}/Message/create-message`;
    const requestMapper = new RequestMapper(CreateMessageRequest).map(request);
    return this.add(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(CreateMessageResponse).map(data)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(CreateMessageErrorResponse).map(error.error))),
    );
  }

  /**
   * Updates a channel with the provided request data.
   *
   * @param {UpdateChannelMessageRequest} request - The request object containing the channel update information.
   * @returns {Observable<UpdateChannelMessageResponse | UpdateChannelErrorResponse>} An observable that emits the response of the update operation.
   */
  public updateChannel(request: UpdateChannelMessageRequest): Observable<UpdateChannelMessageResponse | UpdateChannelErrorResponse> {
    const endpoint = `${this._context.endPoint}/Channel`;
    const requestMapper = new RequestMapper(UpdateChannelMessageRequest).map(request);
    return this.update(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(UpdateChannelMessageResponse).map(data)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(UpdateChannelErrorResponse).map(error.error))),
    );
  }
}
