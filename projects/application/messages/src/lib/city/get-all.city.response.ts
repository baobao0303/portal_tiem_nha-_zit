import { propertyMapper } from '@core/base';

export class GetAllCityResponse {
  @propertyMapper('id', Number)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';
}
