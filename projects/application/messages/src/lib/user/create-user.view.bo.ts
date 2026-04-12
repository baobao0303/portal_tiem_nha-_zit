import { propertyMapper } from '@core/base';


export class CreateUserViewBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('action', Object)
  public action?: any;
}
