import { propertyMapper } from '@core/base';

export class CreateUserDepartmentBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('isHead', Boolean)
  public isHead: boolean = false;
}
