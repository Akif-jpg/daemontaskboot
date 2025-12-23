import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { LanguageService } from '../../services/language';
import { ROUTES, getRoute } from '../../shared/constants/routes';

interface SidebarMenuItem {
  route: string;
  icon: string;
  label: string;
  translationKey: string;
  badge?: number;
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();

  languageService = inject(LanguageService);

  // Sidebar state
  isCollapsed = false;
  isOpen = true;

  // Expose route constants to template
  ROUTES = ROUTES;

  // Sidebar menu items
  menuItems: SidebarMenuItem[] = [
    {
      route: ROUTES.DASHBOARD,
      icon: 'dashboard',
      label: 'Dashboard',
      translationKey: 'DASHBOARD_TITLE',
    },
    {
      route: ROUTES.TASKS,
      icon: 'task',
      label: 'Tasks',
      translationKey: 'TASKS',
    },
    {
      route: ROUTES.WATCHERS,
      icon: 'visibility',
      label: 'Watchers',
      translationKey: 'WATCHERS',
    },
    {
      route: ROUTES.HISTORY,
      icon: 'history',
      label: 'History',
      translationKey: 'HISTORY',
    },
    {
      route: ROUTES.SYSTEM_MONITORING,
      icon: 'monitor_heart',
      label: 'System Monitoring',
      translationKey: 'SYSTEM_MONITORING',
    },
    {
      route: ROUTES.EVENT_LOGS,
      icon: 'article',
      label: 'Event Logs',
      translationKey: 'EVENT_LOGS',
    },
    {
      route: ROUTES.NOTIFICATIONS,
      icon: 'notifications',
      label: 'Notifications',
      translationKey: 'NOTIFICATIONS',
      badge: 3,
    },
    {
      route: ROUTES.SETTINGS,
      icon: 'settings',
      label: 'Settings',
      translationKey: 'SETTINGS',
    },
  ];

  // Additional menu items (separated by divider)
  additionalMenuItems: SidebarMenuItem[] = [
    {
      route: ROUTES.DOCUMENTATION,
      icon: 'description',
      label: 'Documentation',
      translationKey: 'DOCUMENTATION_TITLE',
    },
  ];

  /**
   * Toggle sidebar collapsed state
   */
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }

  /**
   * Toggle sidebar open/close state
   */
  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.toggleSidebar.emit(false);
    }
  }

  /**
   * Get route with leading slash - expose helper function to template
   */
  getRoute(route: string): string {
    return getRoute(route);
  }

  /**
   * Get translated menu item label
   */
  getMenuLabel(item: SidebarMenuItem): string {
    return this.languageService.translate(item.translationKey) || item.label;
  }

  /**
   * Handle menu item click - for future analytics or special handling
   */
  onMenuItemClick(item: SidebarMenuItem): void {
    // Future: Analytics, logging, etc.
    console.log('Menu item clicked:', item.label);
  }

  /**
   * Check if menu item should show tooltip (when collapsed)
   */
  shouldShowTooltip(): boolean {
    return this.isCollapsed && this.isOpen;
  }
}
