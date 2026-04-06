import { ViewCommandBase } from '../view.command.base';
import { MoveActionType, ViewData } from '../view.type';

export class MoveNextPageCommand extends ViewCommandBase {
  constructor() {
    super();
    this.viewActiveChecked();
  }

  protected override execute(data?: ViewData): void {
    const action: MoveActionType = 'NEXT_PAGE';
    this._viewRenderRegistry.actionHandler(action, data);
  }
}
