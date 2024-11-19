import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Trash2, Shield, Loader2 } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';
import { supabase } from '../lib/supabase';
import ProtectedComponent from './ProtectedComponent';

interface TeamMember {
  id: string;
  user_id: string;
  email: string;
  role: string;
  title: string;
  created_at: string;
}

export default function TeamMemberList() {
  const { hasPermission } = useRole();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  async function loadTeamMembers() {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          id,
          user_id,
          role,
          title,
          created_at,
          users:user_id (
            email
          )
        `)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMembers(data.map(member => ({
        ...member,
        email: member.users.email
      })));
    } catch (err: any) {
      console.error('Error loading team members:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: inviteEmail,
        options: {
          data: {
            invited_role: inviteRole
          }
        }
      });

      if (error) throw error;
      setInviteEmail('');
      loadTeamMembers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;
      loadTeamMembers();
    } catch (err: any) {
      console.error('Error removing team member:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <ProtectedComponent requiredPermission="manage_team">
        <form onSubmit={handleInvite} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="sr-only">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            <div className="w-40">
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="member">Member</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Member
                </>
              )}
            </button>
          </div>
        </form>
      </ProtectedComponent>

      <div className="bg-white overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {members.map((member, index) => (
            <motion.li
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{member.email}</div>
                      <div className="text-sm text-gray-500">{member.title || 'No title set'}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${member.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                      member.role === 'admin' ? 'bg-red-100 text-red-800' :
                      member.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {member.role}
                  </span>
                  
                  <ProtectedComponent requiredPermission="manage_team">
                    {member.role !== 'owner' && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </ProtectedComponent>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}