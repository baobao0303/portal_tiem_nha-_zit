import { propertyMapper } from '@core/base';


export class RoleViewBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('action', Object)
  public action?: any;

  @propertyMapper('title', String)
  public title?: string = '';

  constructor(id: string = '', action?: any) {
    this.id = id;
    this.action = action;
  }
}
