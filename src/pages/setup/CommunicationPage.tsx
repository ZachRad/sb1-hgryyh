import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, Settings, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: string;
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'Sent to new donors when they make their first contribution',
    subject: 'Welcome to our campaign! 🎉',
    content: ''
  },
  {
    id: 'thank_you',
    name: 'Thank You Email',
    description: 'Sent after receiving a donation',
    subject: 'Thank you for your generous support! 🙏',
    content: ''
  },
  {
    id: 'follow_up',
    name: 'Follow-up Email',
    description: 'Sent to donors to update them on campaign progress',
    subject: 'See the impact of your support',
    content: ''
  },
];

export default function CommunicationPage() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [emailSettings, setEmailSettings] = useState({
    fromName: '',
    replyToEmail: ''
  });
  const [templates, setTemplates] = useState(defaultTemplates);

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailSettings({
      ...emailSettings,
      [e.target.name]: e.target.value
    });
  };

  const handleTemplateChange = (field: 'subject' | 'content', value: string) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === selectedTemplate
          ? { ...template, [field]: value }
          : template
      )
    );
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
            <Mail className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Communication Setup</h1>
            <p className="text-gray-600">Configure your email templates and preferences</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Email Settings */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Email Settings</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">From Name</label>
                <input
                  type="text"
                  name="fromName"
                  value={emailSettings.fromName}
                  onChange={handleEmailSettingsChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Organization or Campaign Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reply-to Email</label>
                <input
                  type="email"
                  name="replyToEmail"
                  value={emailSettings.replyToEmail}
                  onChange={handleEmailSettingsChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          </div>

          {/* Email Templates */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Email Templates</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg text-left border ${
                    selectedTemplate === template.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </button>
              ))}
            </div>

            {/* Template Editor */}
            {currentTemplate && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                  <input
                    type="text"
                    value={currentTemplate.subject}
                    onChange={(e) => handleTemplateChange('subject', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Content</label>
                  <textarea
                    rows={8}
                    value={currentTemplate.content}
                    onChange={(e) => handleTemplateChange('content', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter your email content here..."
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Available Variables:</strong> {'{donor_name}'}, {'{donation_amount}'}, {'{campaign_name}'}, {'{organization_name}'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

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
            onClick={() => navigate('/dashboard')}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}