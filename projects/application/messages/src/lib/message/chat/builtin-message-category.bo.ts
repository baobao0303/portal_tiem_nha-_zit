import { propertyMapper } from '@core/base';
import { BuiltinMessageBO } from './builtin-message.bo';

export class BuiltinMessageCategoryBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('isReaction', Boolean)
  public isReaction: boolean = false;

  @propertyMapper('builtinMessages', BuiltinMessageBO)
  public builtinMessages: BuiltinMessageBO[] = [];
}
