import { Directive, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { explicitEffect } from 'ngxtension/explicit-effect';
import { VIEW_RENDER_REGISTRY } from '../view.render.registry';
import { TranslateService } from '@ngx-translate/core';

/**
 * Defines the View Title Directive to the title of view.
 * Also it will set the title to browser TAB's title
 */
@Directive({ standalone: true })
export class ViewTitleDirective implements OnInit, OnDestroy {
  /** Browser TAB title */
  protected readonly _bwTitle = inject(Title);

  /** Translation service for multiple languages */
  private readonly translate = inject(TranslateService);

  /** Input = titlle */
  public title = input('e[X]tension [F]rame[W]ork');
  public isActive = input(false);

  private _viewRender = inject(VIEW_RENDER_REGISTRY);

  private eDs = explicitEffect([this.isActive], ([active]) => {
    if (active == true) {
      /** Call this to make the focus or do something when View active */
      this._viewRender.viewReload();
    }
  });

  ngOnInit(): void {
    this._bwTitle.setTitle(`${this.translate.instant(this.title())}`);
  }

  ngOnDestroy(): void {
    this.eDs.destroy();
    console.log('[ViewTitleDirective] Destroyed ...');
  }
}
