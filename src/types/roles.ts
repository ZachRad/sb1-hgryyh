import { z } from 'zod';

export const RoleType = z.enum(['owner', 'admin', 'manager', 'member']);
export type Role = z.infer<typeof RoleType>;

export const PermissionType = z.enum([
  'manage_team',
  'manage_donors',
  'view_donors',
  'manage_campaigns',
  'view_campaigns',
  'manage_settings',
  'view_reports',
  'manage_communications'
]);
export type Permission = z.infer<typeof PermissionType>;

export const rolePermissions: Record<Role, Permission[]> = {
  owner: [
    'manage_team',
    'manage_donors',
    'view_donors',
    'manage_campaigns',
    'view_campaigns',
    'manage_settings',
    'view_reports',
    'manage_communications'
  ],
  admin: [
    'manage_team',
    'manage_donors',
    'view_donors',
    'manage_campaigns',
    'view_campaigns',
    'manage_settings',
    'view_reports',
    'manage_communications'
  ],
  manager: [
    'view_donors',
    'manage_donors',
    'view_campaigns',
    'view_reports',
    'manage_communications'
  ],
  member: [
    'view_donors',
    'view_campaigns',
    'view_reports'
  ]
};