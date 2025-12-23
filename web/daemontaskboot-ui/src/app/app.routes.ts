import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes';

export const routes: Routes = [
  // Default redirect to dashboard
  {
    path: '',
    redirectTo: ROUTES.DASHBOARD,
    pathMatch: 'full',
  },

  // Dashboard route
  {
    path: ROUTES.DASHBOARD,
    loadComponent: () => import('./pages/dashboard/index').then((m) => m.Dashboard),
    title: 'Dashboard - daemontaskboot',
  },

  // Documentation route
  {
    path: ROUTES.DOCUMENTATION,
    loadComponent: () => import('./pages/documentation/documentation').then((m) => m.Documentation),
    title: 'Documentation - daemontaskboot',
  },

  // Future routes - will be uncommented when components are created
  /*
  {
    path: ROUTES.TASKS,
    loadComponent: () => import('./pages/tasks/tasks').then((m) => m.Tasks),
    title: 'Tasks - daemontaskboot',
  },

  {
    path: ROUTES.WATCHERS,
    loadComponent: () => import('./pages/watchers/watchers').then((m) => m.Watchers),
    title: 'Watchers - daemontaskboot',
  },

  {
    path: ROUTES.HISTORY,
    loadComponent: () => import('./pages/history/history').then((m) => m.History),
    title: 'History - daemontaskboot',
  },

  {
    path: ROUTES.SETTINGS,
    loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
    title: 'Settings - daemontaskboot',
  },

  {
    path: ROUTES.SYSTEM_MONITORING,
    loadComponent: () =>
      import('./pages/system-monitoring/system-monitoring').then((m) => m.SystemMonitoring),
    title: 'System Monitoring - daemontaskboot',
  },

  {
    path: ROUTES.NOTIFICATIONS,
    loadComponent: () => import('./pages/notifications/notifications').then((m) => m.Notifications),
    title: 'Notifications - daemontaskboot',
  },

  {
    path: ROUTES.EVENT_LOGS,
    loadComponent: () => import('./pages/event-logs/event-logs').then((m) => m.EventLogs),
    title: 'Event Logs - daemontaskboot',
  },

  {
    path: ROUTES.NOT_FOUND,
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: '404 - Page Not Found',
  },
  */

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: ROUTES.DASHBOARD,
  },
];
