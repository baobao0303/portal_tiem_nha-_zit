import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  GetChannelByIdRequest,
  GetChannelByIdResponse,
  GetChannelsByUserIdRequest,
  GetChannelsByUserIdResponse,
  GetParticipantsByChannelIdRequest,
  GetParticipantsByChannelIdResponse,
  GetParticipantsInChannelByRoleRequest,
  GetParticipantsInChannelByRoleResponse,
} from '@application/messages';
import { ResponseMapper } from '@core/base';
import { IChannelReadableRepository } from '@core/domain';
import { map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class ChannelReadableRepository extends ReadableRepository implements IChannelReadableRepository {
  /**
   * Retrieves the participants of a channel by its ID.
   *
   * @param {GetParticipantsByChannelIdRequest} request - The request object containing the channel ID and other query parameters.
   * @returns {Observable<GetParticipantsByChannelIdResponse>} An observable that emits the response containing the participants of the channel.
   *
   * The request object should have the following properties:
   * - `channelId` (string): The ID of the channel.
   * - `filters` (string): The filters to apply to the participants list.
   * - `sort` (string): The sorting criteria for the participants list.
   * - `pageSize` (number): The number of participants to retrieve per page.
   * - `page` (number): The page number to retrieve.
   *
   * The response object will be mapped using the `ResponseMapper` to an instance of `GetParticipantsByChannelIdResponse`.
   *
   * The observable will complete when the component is destroyed, using `takeUntilDestroyed`.
   */
  public getParticipantsByChannelId(request: GetParticipantsByChannelIdRequest): Observable<GetParticipantsByChannelIdResponse> {
    const endpoint = `${this._context.endPoint}/Channel/get-participants-by-channel-id?ChannelId=${request.channelId}&Filters=${request.filters}&Sort=${request.sort}&PageSize=${request.pageSize}&Page=${request.page}`;
    return this.findAll(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetParticipantsByChannelIdResponse).map(data)),
    );
  }

  /**
   * Retrieves a channel by its ID.
   *
   * @param {GetChannelByIdRequest} request - The request object containing the channel ID.
   * @returns {Observable<GetChannelByIdResponse>} An observable that emits the response containing the channel details.
   */
  public getChannelById(request: GetChannelByIdRequest): Observable<GetChannelByIdResponse> {
    const endpoint = `${this._context.endPoint}/Channel/get-channel-by-id?ChannelId=${request.channelId}`;

    return this.findAll(endpoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetChannelByIdResponse).map(data)),
    );
  }

  /**
   * Retrieves a list of channels associated with a given user ID.
   *
   * @param {GetChannelsByUserIdRequest} request - The request object containing the user ID.
   * @returns {Observable<GetChannelsByUserIdResponse[]>} An observable that emits an array of channel responses.
   */
  public getChannelsByUserId(request: GetChannelsByUserIdRequest): Observable<GetChannelsByUserIdResponse[]> {
    const endpoint = `${this._context.endPoint}/Channel/get-channels-by-user-id`;
    return this.findAll(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetChannelsByUserIdResponse).map(item))),
    );
  }

  /**
   * Retrieves a list of participants in a channel filtered by their role.
   *
   * @param request - An object containing the parameters for the request:
   *   - `channelId`: The unique identifier of the channel.
   *   - `owner`: The role or ownership criteria to filter participants.
   * @returns {Observable<GetParticipantsInChannelByRoleResponse[]>} An observable that emits an array of participants in the channel.
   */
  public getParticipantsInChannelByRole(request: GetParticipantsInChannelByRoleRequest): Observable<GetParticipantsInChannelByRoleResponse[]> {
    const endpoint = `${this._context.endPoint}/Channel/get-participants-in-channel-by-role?ChannelId=${request.channelId}&Owner=${request.owner}`;
    return this.findAll(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetParticipantsInChannelByRoleResponse).map(item))),
    );
  }
}
