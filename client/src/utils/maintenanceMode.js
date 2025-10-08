// Maintenance Mode Configuration
export const isMaintenanceMode = () => {
  // Check if maintenance mode is enabled via environment variable
  return import.meta.env.VITE_MAINTENANCE_MODE === 'true';
};

// List of allowed routes during maintenance (only coming-soon and admin)
export const allowedRoutesInMaintenance = [
  '/coming-soon',
  '/admin',
  '/admin/manage-products',
  '/admin/manage-reviews',
  '/admin/manage-users'
];

// Check if current route is allowed during maintenance
export const isRouteAllowed = (pathname) => {
  if (!isMaintenanceMode()) return true;
  
  // Allow admin routes
  if (pathname.startsWith('/admin')) return true;
  
  // Check if route is in allowed list
  return allowedRoutesInMaintenance.includes(pathname);
};

// Get launch date from environment
export const getLaunchDate = () => {
  return import.meta.env.VITE_LAUNCH_DATE || '2025-10-15';
};
