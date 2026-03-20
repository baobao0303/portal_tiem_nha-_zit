import { propertyMapper } from '@core/base';

export class GetAllGendersResponse {
  @propertyMapper('id', Number)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';
}
