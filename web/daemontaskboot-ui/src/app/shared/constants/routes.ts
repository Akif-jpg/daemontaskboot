/**
 * Centralized route constants for the application
 * This allows us to manage all routes from a single place and avoid hardcoded strings
 */

export const ROUTES = {
  // Main pages
  HOME: '',
  DASHBOARD: 'dashboard',
  DOCUMENTATION: 'documentation',

  // Tasks
  TASKS: 'tasks',
  TASK_CREATE: 'tasks/create',
  TASK_EDIT: 'tasks/edit',

  // Watchers
  WATCHERS: 'watchers',
  WATCHER_CREATE: 'watchers/create',
  WATCHER_EDIT: 'watchers/edit',

  // History & Logs
  HISTORY: 'history',
  EVENT_LOGS: 'event-logs',

  // System
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
  SYSTEM_MONITORING: 'system-monitoring',

  // Authentication (for future use)
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',

  // Error pages
  NOT_FOUND: '404',
  SERVER_ERROR: '500',
} as const;

/**
 * Route paths with parameters - for dynamic routes
 */
export const ROUTE_PARAMS = {
  TASK_DETAILS: (id: string | number) => `tasks/${id}`,
  TASK_EDIT: (id: string | number) => `tasks/edit/${id}`,
  WATCHER_DETAILS: (id: string | number) => `watchers/${id}`,
  WATCHER_EDIT: (id: string | number) => `watchers/edit/${id}`,
  USER_PROFILE: (userId: string | number) => `profile/${userId}`,
} as const;

/**
 * External routes - for external links
 */
export const EXTERNAL_ROUTES = {
  GITHUB_REPO: 'https://github.com/Akif-jpg/daemontaskboot',
  GITHUB_README: 'https://github.com/Akif-jpg/daemontaskboot/blob/main/README.md',
  GITHUB_ISSUES: 'https://github.com/Akif-jpg/daemontaskboot/issues',
  DOCUMENTATION_EXTERNAL: 'https://github.com/Akif-jpg/daemontaskboot/wiki',
} as const;

/**
 * Route metadata for navigation and breadcrumbs
 */
export const ROUTE_META = {
  [ROUTES.HOME]: {
    title: 'HOME_TITLE',
    breadcrumb: 'HOME',
    icon: 'home',
  },
  [ROUTES.DASHBOARD]: {
    title: 'DASHBOARD_TITLE',
    breadcrumb: 'DASHBOARD',
    icon: 'dashboard',
  },
  [ROUTES.DOCUMENTATION]: {
    title: 'DOCUMENTATION_TITLE',
    breadcrumb: 'DOCUMENTATION',
    icon: 'description',
  },
  [ROUTES.TASKS]: {
    title: 'TASKS_TITLE',
    breadcrumb: 'TASKS',
    icon: 'task',
  },
  [ROUTES.WATCHERS]: {
    title: 'WATCHERS_TITLE',
    breadcrumb: 'WATCHERS',
    icon: 'visibility',
  },
  [ROUTES.HISTORY]: {
    title: 'HISTORY_TITLE',
    breadcrumb: 'HISTORY',
    icon: 'history',
  },
  [ROUTES.SETTINGS]: {
    title: 'SETTINGS_TITLE',
    breadcrumb: 'SETTINGS',
    icon: 'settings',
  },
} as const;

/**
 * Helper function to get route with leading slash
 */
export const getRoute = (route: string): string => {
  return route ? `/${route}` : '/';
};

/**
 * Helper function to check if current route matches
 */
export const isCurrentRoute = (currentUrl: string, route: string): boolean => {
  const normalizedCurrent = currentUrl.startsWith('/') ? currentUrl.slice(1) : currentUrl;
  return normalizedCurrent === route || (route === '' && normalizedCurrent === '');
};
