import { propertyMapper } from '@core/base';

export class ContentBO {
  @propertyMapper('text', String)
  public text: string = '';
}
