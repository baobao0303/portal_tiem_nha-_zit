import { Injectable } from '@angular/core';
import { AddParticipantsIntoChannelEventResponse, DeleteParticipantFromChannelResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { SignalRConstant } from './signalr.constant';
import { EventHandler } from './signalr.hub';
import { SignalRHubBase } from './signalr.hub.base';

@Injectable({ providedIn: 'root' })
export class ChannelSignalRHub extends SignalRHubBase {
  public override getPath(): string {
    return SignalRConstant.CHANNEL_HUB;
  }

  /**
   * Registers a callback function to be invoked when the 'onCreateChannel' event is triggered.
   *
   * @param callback - The function to be called when the event occurs. The function receives a single parameter `val` which contains the event data.
   */
  public onCreateChannel(callback: (val: any) => void) {
    this.on(SignalRConstant.CREATE_CHANNEL, callback);
  }

  /**
   * Registers a callback function to be invoked when the 'UpdateChannel' event is received.
   *
   * @param callback - The function to be called when the 'UpdateChannel' event occurs.
   *                   The callback receives a single parameter `val` which contains the event data.
   */
  public onUpdateChannel(callback: (val: any) => void) {
    this.on(SignalRConstant.UPDATE_CHANNEL, callback);
  }

  /**
   * Registers an event handler for the 'AddParticipants' event.
   *
   * @param handler - The event handler function to be called when the 'AddParticipants' event is triggered.
   *                   The handler receives a mapped response of type `AddParticipantsIntoChannelEventResponse`.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onAddParticipants(handler: EventHandler<AddParticipantsIntoChannelEventResponse>): void {
    this.on(SignalRConstant.ADD_PARTICIPANTS, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(AddParticipantsIntoChannelEventResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for AddParticipants:', error);
      }
    });
  }

  /**
   * Registers an event handler for the DELETE_PARTICIPANT event.
   *
   * @param handler - The event handler function to be called when the DELETE_PARTICIPANT event is triggered.
   *                   The handler receives an instance of IdBO as a parameter.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onDeleteParticipant(handler: EventHandler<DeleteParticipantFromChannelResponse>): void {
    this.on(SignalRConstant.DELETE_PARTICIPANT, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(DeleteParticipantFromChannelResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for RemoveParticipants:', error);
      }
    });
  }
}
