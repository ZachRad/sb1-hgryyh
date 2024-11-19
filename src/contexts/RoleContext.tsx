import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Role, Permission } from '../types/roles';
import { rolePermissions } from '../types/roles';
import { useAuth } from './AuthContext';

interface RoleContextType {
  role: Role | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setRole(data.role as Role);
      } catch (err) {
        console.error('Error loading user role:', err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    loadUserRole();
  }, [user]);

  const hasPermission = (permission: Permission): boolean => {
    if (!role) return false;
    return rolePermissions[role].includes(permission);
  };

  return (
    <RoleContext.Provider value={{ role, loading, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}