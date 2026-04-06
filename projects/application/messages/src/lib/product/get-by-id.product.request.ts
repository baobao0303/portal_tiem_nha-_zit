import { propertyMapper } from "@core/base";

export class GetByIdProductRequest {
  @propertyMapper('id', String)
  public id: string = '';

  constructor(id: string = '') {
    this.id = id
  }
}
