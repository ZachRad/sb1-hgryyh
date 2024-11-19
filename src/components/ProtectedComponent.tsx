import React from 'react';
import type { Permission } from '../types/roles';
import { useRole } from '../contexts/RoleContext';

interface ProtectedComponentProps {
  requiredPermission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedComponent({
  requiredPermission,
  children,
  fallback = null
}: ProtectedComponentProps) {
  const { hasPermission } = useRole();

  if (!hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}