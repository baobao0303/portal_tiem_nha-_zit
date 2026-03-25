import { Injectable } from '@angular/core';
import { ViewCommandMapperRegistry } from '@view/base';

@Injectable({ providedIn: 'root' })
export class ViewCommandMapper implements ViewCommandMapperRegistry {
  protected keyCommandMapper: Map<string, string> = new Map();

  public getKeyViewCommand(name: string): string {
    const key = this.keyCommandMapper.get(name);
    if (key) return key;
    throw new Error(`[ERROR] -> ${name} does not exist in shortcuts`);
  }

  public setKeyViewCommand(name: string, shortCut: string): void {
    if (!this.keyCommandMapper.has(name)) {
      this.keyCommandMapper.set(name, shortCut);
    } else {
      throw new Error(`[ERROR] -> ${name} already has shortcut`);
    }
  }
}
