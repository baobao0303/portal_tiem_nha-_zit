import { BOBase, propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';
import { FileBO } from './file.bo';
import { ReactionBO } from './reaction.bo';

export class MessageBO extends BOBase {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('content', String)
  public content: string = '';

  @propertyMapper('messageType', String)
  public messageType: string = '';

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('isRead', Boolean)
  public isRead: boolean = false;

  @propertyMapper('countMessageChildren', Number)
  public countMessageChildren: number = 0;

  @propertyMapper('senders', ContactBO)
  public senders: ContactBO[] = [];

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';

  @propertyMapper('medias', FileBO)
  public medias: FileBO[] = [];

  @propertyMapper('reactions', ReactionBO)
  public reactions: ReactionBO[] = [];

  constructor(init?: Partial<MessageBO>) {
    super();
    Object.assign(this, init);
  }
}
