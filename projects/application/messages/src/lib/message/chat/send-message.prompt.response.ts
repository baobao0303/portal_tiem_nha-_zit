import { propertyMapper } from '@core/base';
import { ContentBO } from './content.bo';

export class SendMessagePromptResponse {
  @propertyMapper('createdAt', String)
  public createdAt: string = '';

  @propertyMapper('content', ContentBO)
  public content: ContentBO[] = [];
}
