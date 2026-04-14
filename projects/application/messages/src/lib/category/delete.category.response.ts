import { propertyMapper } from '@core/base';

export class DeleteCategoryResponse {
  @propertyMapper('success', Boolean)
  public success: boolean = false;
}
