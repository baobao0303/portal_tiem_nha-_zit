import { ViewCommandBase } from '../view.command.base';
import { MoveActionType, ViewData } from '../view.type';

export class MoveNextCommand extends ViewCommandBase {
  constructor() {
    super();
    this.viewActiveChecked();
  }

  protected override execute(data?: ViewData): void {
    const action: MoveActionType = 'NEXT_ITEM';
    this._viewRenderRegistry.actionHandler(action, data);
  }
}
