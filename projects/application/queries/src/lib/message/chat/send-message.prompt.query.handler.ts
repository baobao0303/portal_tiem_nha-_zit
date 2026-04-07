import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { SendMessagePromptRequest, SendMessagePromptResponse } from '@application/messages';
import { MessageReadableRepository } from '@infrastructure/base';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SendMessagePromptQueryHandler implements RequestHandler<SendMessagePromptRequest, SendMessagePromptResponse> {
  repository = inject(MessageReadableRepository);
  public handle(request: SendMessagePromptRequest): Observable<SendMessagePromptResponse> | undefined {
    return this.repository.sendMessagePrompt(request);
  }
}
