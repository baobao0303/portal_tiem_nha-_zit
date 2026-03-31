import { ViewCommandBase } from '../view.command.base';
import { ViewData } from '../view.type';
/**
 * A command class responsible for reloading the window view.
 * @param {boolean} [viewCheck=true] - A flag to check if the view is active. This means that the view is currently being displayed.
 *
 */
export class ReloadWindowCommand extends ViewCommandBase {
  constructor(viewCheck: boolean = true) {
    super();
    this.viewActiveChecked(viewCheck);
  }

  protected override execute(data?: ViewData, viewName?: string): void {
    this._viewRenderRegistry.viewReload(data);
  }
}
