import { Component, Type, inject, signal, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CanCommandDirective, VIEW_COMMAND_REGISTRY, VIEW_CONTEXT, VIEW_RENDER_REGISTRY, ViewBase, ViewCommandRegistry, ViewRenderRegistry } from '@view/base';
import { HubContext } from './hub.context';
import { BROWSER_STORAGE, AuthWriteableRepository } from '@infrastructure/base';
import { SidebarComponent } from '@/layout/sidebar/sidebar.component';
import { HeaderComponent } from '@/layout/header/header.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    LucideAngularModule
  ],
  hostDirectives: [CanCommandDirective],
  providers: [
    { provide: VIEW_COMMAND_REGISTRY, useExisting: forwardRef(() => HubComponent) },
    { provide: VIEW_CONTEXT, useExisting: HubContext },
    { provide: VIEW_RENDER_REGISTRY, useExisting: forwardRef(() => HubComponent) },
  ],
  templateUrl: './hub.component.html',
})
export class HubComponent extends ViewBase implements ViewCommandRegistry, ViewRenderRegistry, OnInit {
  isCollapsed = signal(false);
  isMobileMenuOpen = signal(false);

  private _browserStorage = inject(BROWSER_STORAGE);
  private authRepo = inject(AuthWriteableRepository);
  private appRouter = inject(Router);

  adminProfile = signal<any>(null);

  ngOnInit() {
    const sessionStr = this._browserStorage.get('ADMIN_SESSION');
    if (sessionStr) {
      try {
        this.adminProfile.set(JSON.parse(sessionStr));
      } catch (e) {
        console.error('Failed to parse ADMIN_SESSION', e);
      }
    }

    const collapsedStr = this._browserStorage.get('SIDEBAR_COLLAPSED');
    if (collapsedStr) {
      this.isCollapsed.set(collapsedStr === 'true');
    }
  }

  toggleSidebar() {
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    this._browserStorage.set('SIDEBAR_COLLAPSED', String(newState));
  }

  logout() {
    this.authRepo.logout().subscribe({
      next: () => {
        this._browserStorage.remove('ADMIN_SESSION');
        this.appRouter.navigateByUrl('/login');
      },
      error: () => {
        this._browserStorage.remove('ADMIN_SESSION');
        this.appRouter.navigateByUrl('/login');
      }
    });
  }

  viewType(): Type<ViewRenderRegistry> {
    return this.constructor as Type<ViewRenderRegistry>;
  }

  events: string[] = [];

  public getHubContext() {
    return this.getContextAs<HubContext>();
  }

  public commandRegister(): void {
    // Future shortcut registrations
  }

  public viewName(): string {
    return 'HUB';
  }
}

