import { propertyMapper } from '@core/base';
import { RoleViewBO } from './role-view.bo';

export class CreateRoleRequest {
  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('views')
  public views: RoleViewBO[] = [];
}
