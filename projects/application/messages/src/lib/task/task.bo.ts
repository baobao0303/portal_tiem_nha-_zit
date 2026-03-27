import { propertyMapper } from '@core/base';
import { Assignees } from './get-all.task.response';
//TODO:
export class TaskBO {
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
}
