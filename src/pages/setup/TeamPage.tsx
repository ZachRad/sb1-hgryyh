import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, ArrowRight, ArrowLeft, Trash2, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const roleOptions = [
  'Campaign Chair',
  'Campaign Steering Committee',
  'Committee Member',
  'Volunteer Coordinator',
  'Major Gifts Officer',
  'Communications Lead',
  'Event Coordinator',
  'Database Manager',
  'Other'
];

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  responsibilities: string[];
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: '',
    email: '',
    phone: '',
    role: 'Campaign Chair',
    responsibilities: ['Lead campaign strategy', 'Major donor relationships', 'Team coordination']
  }
];

export default function TeamPage() {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [importMode, setImportMode] = useState(false);

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string | string[]) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      role: '',
      responsibilities: []
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = (id: string) => {
    if (teamMembers.length > 1) {
      setTeamMembers(members => members.filter(member => member.id !== id));
    }
  };

  const addResponsibility = (memberId: string) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === memberId
          ? { ...member, responsibilities: [...member.responsibilities, ''] }
          : member
      )
    );
  };

  const updateResponsibility = (memberId: string, index: number, value: string) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === memberId
          ? {
              ...member,
              responsibilities: member.responsibilities.map((r, i) => 
                i === index ? value : r
              )
            }
          : member
      )
    );
  };

  const removeResponsibility = (memberId: string, index: number) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === memberId
          ? {
              ...member,
              responsibilities: member.responsibilities.filter((_, i) => i !== index)
            }
          : member
      )
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Here you would handle CSV/Excel file upload
    console.log('File upload handler');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Set Up Campaign Team</h1>
            <p className="text-gray-600">Add team members and define their roles</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setImportMode(false)}
              className={`px-4 py-2 rounded-lg ${
                !importMode 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Add Manually
            </button>
            <button
              type="button"
              onClick={() => setImportMode(true)}
              className={`px-4 py-2 rounded-lg ${
                importMode 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Import from File
            </button>
          </div>
        </div>

        {importMode ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Import Team Members</h3>
            <p className="text-gray-500 mb-4">Upload a CSV or Excel file with your team members</p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              Choose File
            </label>
          </div>
        ) : (
          <div className="space-y-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Team Member {index + 1}</h3>
                  {teamMembers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={member.role}
                      onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a role</option>
                      {roleOptions.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(member.id, 'phone', e.target.value)}
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibilities
                  </label>
                  <div className="space-y-2">
                    {member.responsibilities.map((responsibility, rIndex) => (
                      <div key={rIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={responsibility}
                          onChange={(e) => updateResponsibility(member.id, rIndex, e.target.value)}
                          className="flex-1 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter responsibility"
                        />
                        <button
                          type="button"
                          onClick={() => removeResponsibility(member.id, rIndex)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addResponsibility(member.id)}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={addTeamMember}
              className="flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Team Member
            </button>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
          <button
            type="button"
            onClick={() => navigate('/setup')}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <button
            type="button"
            onClick={() => navigate('/setup/contacts')}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue to Contact Import
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}