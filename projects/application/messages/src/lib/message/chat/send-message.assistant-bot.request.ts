import { propertyMapper } from '@core/base';

export class SendMessageAssistantBotRequest {
  @propertyMapper('message', String)
  public message: string;

  constructor(message: string) {
    this.message = message;
  }
}
