import { propertyMapper } from '@core/base';
import { ViewAllowBO } from '../view';

export class RoleViewBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('action', ViewAllowBO)
  public action?: ViewAllowBO;

  @propertyMapper('title', String)
  public title?: string = '';

  constructor(id: string = '', action?: ViewAllowBO) {
    this.id = id;
    this.action = action;
  }
}
