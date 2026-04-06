import { propertyMapper } from '@core/base';

export class SendMessagePromptRequest {
  @propertyMapper('prompt', String)
  public prompt: string = '';
}
