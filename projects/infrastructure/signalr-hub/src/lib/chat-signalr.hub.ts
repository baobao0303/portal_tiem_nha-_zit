import { Injectable } from '@angular/core';
import {
  DeleteReactionMessageRequest,
  DeleteReactionMessageResponse,
  GetCountUnreadMessageResponse,
  GetLastMessageInChannelRequest,
  GetLastMessageInChannelResponse,
  GetMediasByMessageIdResponse,
  GetMessageByIdResponse,
  GetRepliesByMessageIdResponse,
  GetTotalUnreadMessageInChannelRequest,
  IdBO,
  ReactionBO,
  ReadMessagesResponse,
  SendMessageBodyRequest,
  SendMessageMediasRequest,
  SendMessageRepliesRequest,
  SendUserReadMessagesRequest,
  SendUserStartTypingRequest,
  SendUserStopTypingRequest,
  StartTypingMessageResponse,
  StopTypingMessageResponse,
  UserReactToMessageRequest,
} from '@application/messages';
import { ResponseMapper } from '@core/base';
import { SignalRConstant } from './signalr.constant';
import { EventHandler } from './signalr.hub';
import { SignalRHubBase } from './signalr.hub.base';

@Injectable({ providedIn: 'root' })
export class ChatSignalRHub extends SignalRHubBase {
  public override getPath(): string {
    return SignalRConstant.MESSAGE_HUB;
  }

  /**
   * Registers a callback function to be invoked when a message is received.
   *
   * @param callback - The function to be called when a message is received.
   *                   It receives the message as a parameter.
   */
  public onReceiveMessage(handler: EventHandler<GetMessageByIdResponse>): void {
    this.on(SignalRConstant.RECEIVE_MESSAGE, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(GetMessageByIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for ReceiveMessage:', error);
      }
    });
  }

  /**
   * Unsubscribes from the "ReceiveMessage" event.
   * This method removes the event listener for the "ReceiveMessage" event,
   * preventing any further handling of this event.
   */
  public offReceiveMessage(): void {
    this.off(SignalRConstant.RECEIVE_MESSAGE);
  }

  /**
   * Registers an event handler for receiving thread messages.
   *
   * @param handler - The event handler function that will be called with the mapped response
   *                  when a thread message is received. The handler receives an instance of
   *                  `GetMessageByIdResponse`.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onReceiveThreadMessage(handler: EventHandler<GetMessageByIdResponse>): void {
    this.on(SignalRConstant.RECEIVE_THREAD_MESSAGE, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(GetMessageByIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for ReceiveThreadMessage:', error);
      }
    });
  }

  /**
   * Unsubscribes from the "ReceiveThreadMessage" event.
   * This method removes the event listener for the "ReceiveThreadMessage" event,
   * preventing any further handling of this event.
   */
  public offReceiveThreadMessage(): void {
    this.off(SignalRConstant.RECEIVE_THREAD_MESSAGE);
  }

  /**
   * Registers an event handler for the 'ReceiveLastMessage' event.
   *
   * @param handler - The event handler function to be called when the 'ReceiveLastMessage' event is received.
   * The handler receives a mapped response of type `GetMessageByIdResponse`.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onReceiveLastMessage(handler: EventHandler<GetMessageByIdResponse>): void {
    this.on(SignalRConstant.RECEIVE_LAST_MESSAGE, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(GetMessageByIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for ReceiveLastMessage:', error);
      }
    });
  }

  /**
   * Registers an event handler for the 'ReceiveLastThreadMessage' event.
   *
   * @param handler - The event handler function to be called when the 'ReceiveLastThreadMessage' event is received.
   * The handler receives a mapped response of type `GetMessageByIdResponse`.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onReceiveLastThreadMessage(handler: EventHandler<GetMessageByIdResponse>): void {
    this.on(SignalRConstant.RECEIVE_LAST_THREAD_MESSAGE, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(GetMessageByIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for ReceiveLastMessage:', error);
      }
    });
  }

  /**
   * Sends a typing message to the SignalR hub.
   *
   * @param request - The request object containing the ID information.
   */
  public sendUserTypingMessage(request: SendUserStartTypingRequest): void {
    this.send(SignalRConstant.USER_TYPING, new ResponseMapper(SendUserStartTypingRequest).map(request));
  }

  /**
   * Registers an event handler for the 'StartTypingMessage' event.
   *
   * @param handler - The event handler function that will be called when the 'StartTypingMessage' event is triggered.
   * The handler receives a mapped `StartTypingMessageResponse` object as its argument.
   */
  public onStartTypingMessage(handler: EventHandler<StartTypingMessageResponse>): void {
    this.on(SignalRConstant.START_TYPING_MESSAGE, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(StartTypingMessageResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for StartTypingMessage:', error);
      }
    });
  }

  /**
   * Unsubscribes from the "start typing" message event.
   *
   * This method removes the event listener for the "start typing" message,
   * preventing the client from receiving further notifications when a user
   * starts typing.
   */
  public offStartTypingMessage(): void {
    this.off(SignalRConstant.START_TYPING_MESSAGE);
  }

  /**
   * Sends a "UserStoppedTyping" message to the SignalR hub.
   *
   * @param {IdBO} request - The request object containing the ID information.
   * @returns {void}
   */
  public sendUserStopTypingMessage(request: SendUserStopTypingRequest): void {
    this.send(SignalRConstant.USER_STOPPED_TYPING, new ResponseMapper(SendUserStopTypingRequest).map(request));
  }

  /**
   * Registers an event handler for the 'StopTypingMessage' event.
   *
   * @param handler - The event handler function to be called when the 'StopTypingMessage' event is received.
   *                   The handler receives a mapped `StopTypingMessageResponse` object as its argument.
   */
  public onStopTypingMessage(handler: EventHandler<StopTypingMessageResponse>): void {
    this.on(SignalRConstant.STOP_TYPING_MESSAGE, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(StopTypingMessageResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for StopTypingMessage:', error);
      }
    });
  }

  /**
   * Unsubscribes from the STOP_TYPING_MESSAGE event.
   * This method removes the event listener for the stop typing message,
   * preventing any further handling of this event.
   */
  public offStopTypingMessage(): void {
    this.off(SignalRConstant.STOP_TYPING_MESSAGE);
  }

  /**
   * Sends a notification to the server indicating that the user has read the specified messages in a given channel.
   *
   * @param request - The request object containing the message IDs and channel ID.
   */
  public sendUserReadMessages(request: SendUserReadMessagesRequest): void {
    this.send(SignalRConstant.USER_READ_MESSAGES, request.messageIds, request.channelId);
  }

  /**
   * Registers an event handler for the "READ_MESSAGES" event.
   *
   * @param handler - The event handler function to be called when the "READ_MESSAGES" event is received.
   *                   The handler receives a `ReadMessagesResponse` object as its argument.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onUserReadMessages(handler: EventHandler<ReadMessagesResponse>): void {
    this.on(SignalRConstant.READ_MESSAGES, (response: any) => {
      try {
        const mappedResponse = new ResponseMapper(ReadMessagesResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for UserReadMessage:', error);
      }
    });
  }

  /**
   * Sends a reaction to a message to the SignalR hub.
   */
  public sendUserReactToMessage(request: UserReactToMessageRequest): void {
    this.send(SignalRConstant.USER_REACT_TO_MESSAGE, new ResponseMapper(UserReactToMessageRequest).map(request));
  }

  /**
   * Registers an event handler for the "UserReactToMessage" event.
   *
   * @param handler - The event handler function to be called when the "UserReactToMessage" event is triggered.
   *                   The handler receives a mapped response of type `ReactionBO`.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onReactToMessage(handler: EventHandler<ReactionBO>): void {
    this.on(SignalRConstant.REACT_TO_MESSAGE, (response: any) => {
      try {
        // TODO: Refactor this to use the Class-Transformer library
        const reactionBO = new ReactionBO();
        reactionBO.messageId = response.messageId;
        reactionBO.channelId = response.channelId;
        reactionBO.name = response.name;
        reactionBO.contact = response.contact;
        reactionBO.totalCount = response.totalCount;
        handler(reactionBO);
      } catch (error) {
        console.error('Error mapping response for UserReactToMessage:', error);
      }
    });
  }

  /**
   * Sends a request to delete a user's reaction to a message.
   *
   * @param {DeleteReactionMessageRequest} request - The request object containing the details of the reaction to be deleted.
   * @returns {void}
   */
  public sendUserDeleteReaction(request: DeleteReactionMessageRequest): void {
    this.send(SignalRConstant.USER_DELETE_REACTION, new ResponseMapper(UserReactToMessageRequest).map(request));
  }

  /**
   * Registers an event handler for the DELETE_REACTION event.
   *
   * @param handler - The event handler function to be called when a delete reaction message is received.
   * The handler receives a `DeleteReactionMessageResponse` object as its argument.
   *
   * The `DeleteReactionMessageResponse` object contains the following properties:
   * - `messageId`: The ID of the message from which the reaction was deleted.
   * - `channelId`: The ID of the channel where the message is located.
   * - `reactions`: An array of reactions associated with the message.
   *
   * If an error occurs while mapping the response, it will be logged to the console.
   */
  public onDeleteReaction(handler: EventHandler<DeleteReactionMessageResponse>): void {
    this.on(SignalRConstant.DELETE_REACTION, (response: any) => {
      try {
        const deleteReactionMessageResponse = new DeleteReactionMessageResponse();
        deleteReactionMessageResponse.messageId = response.messageId;
        deleteReactionMessageResponse.channelId = response.channelId;
        deleteReactionMessageResponse.reactions = response.reactions;
        handler(deleteReactionMessageResponse);
      } catch (error) {
        console.error('Error mapping response for DeleteReaction:', error);
      }
    });
  }

  /**
   * Sends a request to get the last message in a channel.
   */
  public sendGetLastMessageInChannel(request: GetLastMessageInChannelRequest): void {
    this.send(SignalRConstant.LAST_MESSAGE_IN_CHANNEL, request.idBO);
  }

  /**
   * Registers an event handler for the "GET_LAST_MESSAGE_IN_CHANNEL" SignalR event.
   * The handler will be called with the last messages in the channel.
   *
   * @param handler - The event handler function to be called with the response data.
   *                  The response data is an array of `GetLastMessageInChannelResponse` objects.
   *
   * @throws Will log an error to the console if there is an issue mapping the response data.
   */
  public onGetLastMessageInChannel(handler: EventHandler<GetLastMessageInChannelResponse>): void {
    this.on(SignalRConstant.GET_LAST_MESSAGE_IN_CHANNEL, (response: any) => {
      try {
        // TODO: Refactor this to use the Class-Transformer library
        const lastMessage = new GetLastMessageInChannelResponse();
        lastMessage.channelId = response.channelId;
        lastMessage.message = response.message;
        lastMessage.sender = response.sender;
        handler(lastMessage);
      } catch (error) {
        console.error('Error mapping response for GetLastMessageInChannelResponse:', error);
      }
    });
  }

  /**
   * Sends a request to get the total unread message in a channel.
   */
  public sendGetTotalUnreadMessageInChannel(request: GetTotalUnreadMessageInChannelRequest): void {
    this.send(SignalRConstant.TOTAL_UNREAD_MESSAGE_IN_CHANNEL, request.idBO);
  }

  /**
   * Registers an event handler for the total unread messages in a channel.
   *
   * @param handler - The event handler function that will be called with the
   * mapped response of type `GetCountUnreadMessageResponse` when the
   * `SignalRConstant.COUNT_UNREAD_MESSAGE` event is received.
   *
   * @throws Will log an error to the console if there is an issue mapping the response.
   */
  public onGetTotalUnreadMessageInChannel(handler: EventHandler<GetCountUnreadMessageResponse>): void {
    this.on(SignalRConstant.COUNT_UNREAD_MESSAGE, (response: any) => {
      try {
        // TODO: Refactor this to use the Class-Transformer library
        const unreadMessage = new GetCountUnreadMessageResponse();
        unreadMessage.channelId = response.channelId;
        unreadMessage.unreadMessages = response.unreadMessages;
        handler(unreadMessage);
      } catch (error) {
        console.error('Error mapping response for GetTotalUnreadMessagesInChannel:', error);
      }
    });
  }

  /**
   * Sends a message body to the SignalR hub.
   *
   * @param {SendMessageBodyRequest} request - The request object containing the message body to be sent.
   */
  public sendMessageBody(request: SendMessageBodyRequest) {
    this.send(SignalRConstant.MESSAGE_BODY, request);
  }

  /**
   * Registers an event handler for the "GetMessageById" SignalR event.
   *
   * @param handler - The event handler function to be called when the "GetMessageById" event is received.
   * The handler receives a `GetMessageByIdResponse` object as its argument.
   *
   */
  public onGetMessageById(handler: EventHandler<GetMessageByIdResponse>): void {
    this.on(SignalRConstant.GET_MESSAGE_BY_ID, (response) => {
      try {
        const mappedResponse = new ResponseMapper(GetMessageByIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for GetMessageById:', error);
      }
    });
  }

  /**
   * Unsubscribes from the "GetMessageById" event.
   * This method removes the event listener for the "GetMessageById" event,
   * preventing any further handling of this event.
   */
  public offGetMessageById(): void {
    this.off(SignalRConstant.GET_MESSAGE_BY_ID);
  }

  /**
   * Sends a message with media attachments via SignalR.
   *
   * @param {SendMessageMediasRequest} request - The request object containing the media message details.
   */
  public sendMessageMedias(request: SendMessageMediasRequest) {
    this.send(SignalRConstant.MESSAGE_MEDIAS, request);
  }

  /**
   * Registers an event handler for the "GetMediasByMessageId" SignalR event.
   *
   * @param handler - The event handler function to be called when the "GetMediasByMessageId" event is received.
   * The handler receives a `GetMediasByMessageIdResponse` object as its parameter.
   */
  public onGetMediasByMessageId(handler: EventHandler<GetMediasByMessageIdResponse>): void {
    this.on(SignalRConstant.GET_MEDIAS_BY_MESSAGE_ID, (response) => {
      try {
        const mappedResponse = new ResponseMapper(GetMediasByMessageIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for GetMediasByMessageId:', error);
      }
    });
  }

  /**
   * Unsubscribes from the "GetMediasByMessageId" event.
   * This method removes the event listener for the "GetMediasByMessageId" event,
   * preventing any further handling of this event.
   */
  public offGetMediasByMessageId(): void {
    this.off(SignalRConstant.GET_MEDIAS_BY_MESSAGE_ID);
  }

  /**
   * Sends a request to get the replies to a message.
   *
   * @param {SendMessageRepliesRequest} request - The request object containing the message ID.
   */
  public sendMessageReplies(request: SendMessageRepliesRequest) {
    this.send(SignalRConstant.MESSAGE_REPLIES, request);
  }

  /**
   * Registers an event handler for the "GetRepliesByMessageId" SignalR event.
   *
   * @param handler - The event handler function to be called when the "GetRepliesByMessageId" event is received.
   * The handler receives a `GetRepliesByMessageIdResponse` object as its parameter.
   */
  public onGetRepliesByMessageId(handler: EventHandler<GetRepliesByMessageIdResponse>): void {
    this.on(SignalRConstant.GET_REPLIES_BY_MESSAGE_ID, (response) => {
      try {
        const mappedResponse = new ResponseMapper(GetRepliesByMessageIdResponse).map(response);
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for GetRepliesByMessageId:', error);
      }
    });
  }
}
