import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutImports } from '@/shared/components/layout';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { LucideAngularModule, LayoutDashboard, Package, ShoppingCart, LogOut, Settings } from 'lucide-angular';

@Component({
  selector: 'app-master-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LayoutImports,
    ZardButtonComponent,
    ZardAvatarComponent,
    LucideAngularModule
  ],
  templateUrl: './master-layout.component.html',
})
export class MasterLayoutComponent {
  readonly LayoutDashboard = LayoutDashboard;
  readonly Package = Package;
  readonly ShoppingCart = ShoppingCart;
  readonly LogOut = LogOut;
  readonly Settings = Settings;
  
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
