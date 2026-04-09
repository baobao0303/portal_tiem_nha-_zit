import { propertyMapper } from '@core/base';
import { RoleViewBO } from './role-view.bo';

export class EditRoleResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('views', RoleViewBO)
  public views: RoleViewBO[] = [];
}
