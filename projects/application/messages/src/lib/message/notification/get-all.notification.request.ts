import { propertyMapper } from '@core/base';

export class GetAllNotificationRequest {
  @propertyMapper('filters', String)
  public filters?: string;

  @propertyMapper('sort', String)
  public sort?: string;

  @propertyMapper('page', Number)
  public page?: number;

  @propertyMapper('pageSize', Number)
  public pageSize?: number;

  constructor(page: number = 1, pageSize: number = 10) {
    this.pageSize = pageSize;
    this.page = page;
  }
}
