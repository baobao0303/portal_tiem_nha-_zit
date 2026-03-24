import { propertyMapper } from '@core/base';
import { LastMessageChannelBO } from './last-message-channel.bo';

export class CreateChannelMessageResponse {
  @propertyMapper('createdChannelId', String)
  public createdChannelId: string = '';

  @propertyMapper('status', Number)
  public status: number = 0;

  @propertyMapper('messages', LastMessageChannelBO)
  public messages: LastMessageChannelBO[] = [];

  @propertyMapper('createdBy', String)
  public createdBy: string = '';
}
