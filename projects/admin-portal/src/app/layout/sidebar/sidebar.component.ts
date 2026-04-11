import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isMobileMenuOpen = false;
  @Input() adminProfile: any = null;
  @Output() logoutAction = new EventEmitter<void>();
  @Output() closeMobileMenu = new EventEmitter<void>();

  onCloseMobileMenu() {
    this.closeMobileMenu.emit();
  }

  onLogout() {
    this.logoutAction.emit();
  }
}
