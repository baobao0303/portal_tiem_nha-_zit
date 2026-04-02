import { propertyMapper } from '@core/base';
import { ViewAllowBO } from '../view';

export class CreateUserViewBO {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('action', ViewAllowBO)
  public action?: ViewAllowBO;
}
