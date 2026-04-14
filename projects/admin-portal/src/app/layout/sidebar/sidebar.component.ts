import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isMobileMenuOpen = false;
  @Input() isCollapsed = false;
  @Input() adminProfile: any = null;
  @Output() logoutAction = new EventEmitter<void>();
  @Output() closeMobileMenu = new EventEmitter<void>();
  @Output() toggleCollapse = new EventEmitter<void>();

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
