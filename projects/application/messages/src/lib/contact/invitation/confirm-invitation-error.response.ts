import { propertyMapper } from '@core/base';

export class ConfirmInvitationErrorResponse {
  @propertyMapper('title', String)
  public title: string = '';

  @propertyMapper('status', Number)
  public status: number = 200;

  @propertyMapper('detail', String)
  public detail: string = '';
}
