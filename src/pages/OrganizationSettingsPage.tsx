import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Settings, Upload, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRole } from '../contexts/RoleContext';
import { supabase } from '../lib/supabase';
import ProtectedComponent from '../components/ProtectedComponent';
import TeamMemberList from '../components/TeamMemberList';

interface OrganizationSettings {
  name: string;
  website: string;
  logo_url: string;
}

export default function OrganizationSettingsPage() {
  const { user } = useAuth();
  const { hasPermission } = useRole();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState<OrganizationSettings>({
    name: '',
    website: '',
    logo_url: ''
  });

  useEffect(() => {
    loadOrganizationSettings();
  }, []);

  async function loadOrganizationSettings() {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .single();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (err: any) {
      console.error('Error loading organization settings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `organization-logos/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      setSettings({
        ...settings,
        logo_url: publicUrl
      });
    } catch (err: any) {
      console.error('Error uploading logo:', err);
      setError('Error uploading logo. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('organizations')
        .update(settings)
        .eq('id', user?.id);

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
                <p className="text-gray-600">Manage your organization's profile and team</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                Settings updated successfully!
              </div>
            )}

            <ProtectedComponent requiredPermission="manage_settings">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={settings.website}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Organization Logo
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg border border-gray-300 flex items-center justify-center">
                      {settings.logo_url ? (
                        <img
                          src={settings.logo_url}
                          alt="Organization Logo"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <Upload className="w-4 h-4 inline-block mr-2" />
                      Upload Logo
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </ProtectedComponent>

            <div className="mt-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Team Management</h2>
                  <p className="text-gray-600">Manage your organization's team members and roles</p>
                </div>
              </div>

              <TeamMemberList />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}