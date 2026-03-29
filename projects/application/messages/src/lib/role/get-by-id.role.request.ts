import { propertyMapper } from '@core/base';

export class GetByIdRoleRequest {
  @propertyMapper('Id', String)
  public id: string = '';
}
