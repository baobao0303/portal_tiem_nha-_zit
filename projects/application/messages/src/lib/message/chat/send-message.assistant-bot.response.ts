import { propertyMapper } from '@core/base';

export class SendMessageAssistantBotResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('message', String)
  public message: string = '';

  @propertyMapper('createdAt', String)
  public createdAt: string = '';

  @propertyMapper('isMe', String)
  public isMe: boolean = false;
}
