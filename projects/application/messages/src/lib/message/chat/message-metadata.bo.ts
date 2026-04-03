import { propertyMapper } from '@core/base';

export class MessageMetadataBO {
  @propertyMapper('hasFiles', Boolean)
  public hasFiles: boolean = false;

  @propertyMapper('hasReplies', Boolean)
  public hasReplies: boolean = false;

  @propertyMapper('hasReactions', Boolean)
  public hasReactions: boolean = false;
}
