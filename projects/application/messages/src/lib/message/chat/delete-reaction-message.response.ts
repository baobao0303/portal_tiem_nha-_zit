import { propertyMapper } from '@core/base';
import { ReactionBO } from './reaction.bo';

export class DeleteReactionMessageResponse {
  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('reactions', ReactionBO)
  public reactions: ReactionBO[] = [];
}
