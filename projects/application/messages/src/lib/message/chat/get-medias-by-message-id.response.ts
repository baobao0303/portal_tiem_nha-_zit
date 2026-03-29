import { propertyMapper } from '@core/base';
import { FileBO } from './file.bo';

export class GetMediasByMessageIdResponse {
  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('medias', FileBO)
  public medias: FileBO[] = [];

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';
}
