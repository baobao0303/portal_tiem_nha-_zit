import { HttpStatusCode } from '@angular/common/http';
import { propertyMapper } from '@core/base';

export class CreateMessageErrorResponse {
  @propertyMapper('title', String)
  public title: string = '';

  @propertyMapper('status', Number)
  public status: number = HttpStatusCode.BadRequest;

  @propertyMapper('detail', String)
  public detail: string = '';
}
