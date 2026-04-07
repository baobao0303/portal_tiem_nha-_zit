import { ViewCommandBase } from '../view.command.base';
import { MoveActionType, ViewData } from '../view.type';

export class MovePreviousPageCommand extends ViewCommandBase {
  constructor() {
    super();
    this.viewActiveChecked();
  }

  protected override execute(data?: ViewData): void {
    const action: MoveActionType = 'PREVIOUS_PAGE';
    this._viewRenderRegistry.actionHandler(action, data);
  }
}
