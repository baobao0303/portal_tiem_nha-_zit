import { HttpStatusCode } from '@angular/common/http';
import { propertyMapper } from '@core/base';

export class CreateUserErrorResponse {
  @propertyMapper('title', String)
  public title: string;

  @propertyMapper('status', Number)
  public status: number;

  @propertyMapper('detail', String)
  public detail: string;

  constructor(title: string = '', status: number = HttpStatusCode.BadRequest, detail: string = '') {
    this.title = title;
    this.status = status;
    this.detail = detail;
  }
}
