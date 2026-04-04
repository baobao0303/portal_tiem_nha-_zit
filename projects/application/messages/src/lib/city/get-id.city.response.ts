import { propertyMapper } from '@core/base';

export class GetIdCityResponse {
  @propertyMapper('id', Number)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';
}
