import { ViewCommandBase } from '../view.command.base';
import { MoveActionType, ViewData } from '../view.type';

export class MoveFirstPageCommand extends ViewCommandBase {
  constructor() {
    super();
    this.viewActiveChecked();
  }
  protected override execute(data?: ViewData): void {
    const action: MoveActionType = 'FIRST_PAGE';
    this._viewRenderRegistry.actionHandler(action, data);
  }
}
