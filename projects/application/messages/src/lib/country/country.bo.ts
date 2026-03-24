import { BOBase, propertyMapper } from '@core/base';

export class CountryBO extends BOBase {
  @propertyMapper('id', String)
  public id: string = '';
  @propertyMapper('name', String)
  public name: string = '';
}
