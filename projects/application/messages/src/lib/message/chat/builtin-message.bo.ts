import { propertyMapper } from '@core/base';

export class BuiltinMessageBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('builtinMessageCategoryName', String)
  public builtinMessageCategoryName: string = '';

  @propertyMapper('builtinMessageType', String)
  public builtinMessageType: string = '';
}
