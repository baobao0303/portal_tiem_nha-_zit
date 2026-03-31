import { propertyMapper } from '@core/base';

export class GetDefaultBuiltinMessageResponse {
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

  constructor({
    id = '',
    name = '',
    description = '',
    builtinMessageCategoryName = '',
    builtinMessageType = '',
  }: {
    id?: string;
    name?: string;
    description?: string;
    builtinMessageCategoryName?: string;
    builtinMessageType?: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.builtinMessageCategoryName = builtinMessageCategoryName;
    this.builtinMessageType = builtinMessageType;
  }
}
