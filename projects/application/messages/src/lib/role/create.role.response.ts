import { propertyMapper } from '@core/base';
import { RoleViewBO } from './role-view.bo';

export class CreateRoleResponse {
  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('views', RoleViewBO)
  public views: RoleViewBO[] = [];
}
