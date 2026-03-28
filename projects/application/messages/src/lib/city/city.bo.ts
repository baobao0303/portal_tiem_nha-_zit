import { BOBase, propertyMapper } from '@core/base';

export class CityBO extends BOBase {
  @propertyMapper('id', String)
  public id: string = '';
  @propertyMapper('name', String)
  public name: string = '';
}
