import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { SendMessageAssistantBotRequest, SendMessageAssistantBotResponse } from '@application/messages';
import { MessageReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SendMessageAssistantBotChatHandler implements RequestHandler<SendMessageAssistantBotRequest, SendMessageAssistantBotResponse[]> {
  private readonly messageReadableRepository = inject(MessageReadableRepository);

  /**
   * Handles the request to send a message via the assistant bot.
   *
   * @param {SendMessageAssistantBotRequest} request - The request object containing the message details.
   * @returns {Observable<SendMessageAssistantBotResponse[]>} An observable that emits an array of responses from the assistant bot.
   */
  public handle(request: SendMessageAssistantBotRequest): Observable<SendMessageAssistantBotResponse[]> {
    const result = this.messageReadableRepository.sendMessagePromptAssistantBot(request);

    return result;
  }
}
