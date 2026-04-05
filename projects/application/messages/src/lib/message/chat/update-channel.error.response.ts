import { HttpStatusCode } from '@angular/common/http';
import { propertyMapper } from '@core/base';

// TODO: Separate folder for channel messages
export class UpdateChannelErrorResponse {
  @propertyMapper('title', String)
  public title: string = '';

  @propertyMapper('status', Number)
  public status: number = HttpStatusCode.BadRequest;

  @propertyMapper('detail', String)
  public detail: string = '';
}
