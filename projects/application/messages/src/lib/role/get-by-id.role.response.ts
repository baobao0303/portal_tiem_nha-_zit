import { propertyMapper } from '@core/base';
import { RoleViewBO } from './role-view.bo';

export class GetByIdRoleResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('views', RoleViewBO)
  public views: RoleViewBO[] = [];
}
