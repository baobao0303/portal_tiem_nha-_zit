import { propertyMapper } from '@core/base';

export class RoleBO {
  @propertyMapper('id', Number)
  public id: number = 0;

  @propertyMapper('uid', String)
  public uid: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';
}
