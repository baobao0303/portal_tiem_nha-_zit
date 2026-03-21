import { propertyMapper } from '@core/base';
//TODO:
export class Assignees {
  id: number = 0;
  name: string = '';
  avatarUrl: string = '';
}
export class Creator {
  @propertyMapper('id', Number)
  public id: number = -1;

  @propertyMapper('firstname', String)
  public firstname: string = '';

  @propertyMapper('middlename', String)
  public middlename: string = '';

  @propertyMapper('lastname', String)
  public lastname: string = '';

  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('avatarUrl', String)
  public avatarUrl: string = '';
}
//TODO:
export class GetAllTaskResponse {
  @propertyMapper('id', Number)
  public id: number = -1;

  @propertyMapper('title', String)
  public title: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('deadline', Date)
  public deadline: Date = new Date();

  @propertyMapper('assignees', Assignees)
  public assignees: Assignees[] = [];

  @propertyMapper('creator', Creator)
  public creator: Creator = new Creator();
}
