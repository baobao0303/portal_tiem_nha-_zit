import { Component, Type, forwardRef, OnInit, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CanCommandDirective, VIEW_COMMAND_REGISTRY, VIEW_RENDER_REGISTRY, ViewBase, ViewCommandRegistry, ViewRenderRegistry } from '@view/base';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  hostDirectives: [CanCommandDirective],
  providers: [
    { provide: VIEW_COMMAND_REGISTRY, useExisting: forwardRef(() => SidebarComponent) },
    { provide: VIEW_RENDER_REGISTRY, useExisting: forwardRef(() => SidebarComponent) }
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends ViewBase implements ViewCommandRegistry, ViewRenderRegistry, OnInit {
  isMobileMenuOpen = input<boolean>(false);
  isCollapsed = input<boolean>(false);
  adminProfile = input<any>(null);

  logoutAction = output<void>();
  closeMobileMenu = output<void>();
  toggleCollapse = output<void>();

  ngOnInit(): void {
    // Initialization mapping
  }

  viewType(): Type<ViewRenderRegistry> {
    return this.constructor as Type<ViewRenderRegistry>;
  }

  viewName(): string {
    return 'SIDEBAR';
  }

  commandRegister(): void {
    // Menu shortcuts can be registered here
  }

  onCloseMobileMenu() {
    this.closeMobileMenu.emit();
  }

  onToggleCollapse() {
    this.toggleCollapse.emit();
  }

  onLogout() {
    this.logoutAction.emit();
  }
}
