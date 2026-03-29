import { computed, Injectable, signal, Type } from '@angular/core';
import { ViewData, ViewRefMapperRegistry, ViewRenderRegistry } from '@view/base';

@Injectable({ providedIn: 'root' })
export class ViewRefMapper implements ViewRefMapperRegistry {
  private _activeView = signal('');
  private _activeViewData = signal<ViewData>({});

  protected viewTypesMap: Map<string, Type<ViewRenderRegistry>> = new Map();
  protected viewRefHeaderMap: Map<string, string> = new Map();

  public getViewType(viewName: string): Type<ViewRenderRegistry> | null {
    return this.viewTypesMap.get(viewName) ?? null;
  }

  public getViewTypesMap(): Map<string, Type<ViewRenderRegistry>> {
    return this.viewTypesMap;
  }

  public setViewType(viewName: string, viewType: Type<ViewRenderRegistry>) {
    if (!this.getViewType(viewName)) {
      this.viewTypesMap.set(viewName, viewType);
    }
  }

  public getVIDHeader(vid: string): string | undefined {
    return this.viewRefHeaderMap.get(vid);
  }

  public getViewName(type: Type<ViewRenderRegistry>): string | undefined {
    for (const [key, value] of this.viewTypesMap.entries()) {
      if (value === type) return key;
    }
    return undefined;
  }

  public getActiveView = computed(() => this._activeView());
  public getActiveViewData = computed(() => this._activeViewData());

  public setActiveView(activeView: string, activeViewData?: ViewData): void {
    this._activeView.set(activeView);
    if (activeViewData) this._activeViewData.set(activeViewData);
  }

  public setActiveViewData(activeView: string, activeViewData?: ViewData) {
    if (activeView == this._activeView() && activeViewData != undefined) {
      const newViewData = { ...this._activeViewData(), ...activeViewData };
      this._activeViewData.set(newViewData);
    }
  }
}
