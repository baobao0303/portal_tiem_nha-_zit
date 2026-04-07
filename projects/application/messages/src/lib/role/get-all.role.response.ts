import { propertyMapper } from '@core/base';

export class GetAllRoleResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('code', String)
  public code: string = '';
}
