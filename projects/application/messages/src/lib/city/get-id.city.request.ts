import { propertyMapper } from '@core/base';

export class GetIdCityRequest {
  @propertyMapper('id', Number)
  public id: string = '';
}
