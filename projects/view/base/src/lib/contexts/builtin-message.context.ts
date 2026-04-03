import { inject, Injectable } from '@angular/core';
import { BuiltinMessageBO, GetDefaultBuiltinMessageRequest } from '@application/messages';
import { GetDefaultBuiltinMessageQueryHandler } from '@application/queries';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BuiltInMessageContext {
  private readonly getDefaultBuiltinMessageQueryHandler = inject(GetDefaultBuiltinMessageQueryHandler);
  private defaultReactions: BuiltinMessageBO[] = [];

  public get reactions() {
    return this.defaultReactions;
  }

  constructor() {
    this.getBuiltInMessage();
  }

  public async getBuiltInMessage() {
    if (this.defaultReactions.length === 0) {
      this.defaultReactions = await lastValueFrom(this.getDefaultBuiltinMessageQueryHandler.handle(new GetDefaultBuiltinMessageRequest()));
      this.defaultReactions.reverse();
    }
  }
}
