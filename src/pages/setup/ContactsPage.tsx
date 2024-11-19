import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Upload, ArrowRight, ArrowLeft, FileSpreadsheet, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [importMode, setImportMode] = useState('manual');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Import Contacts</h1>
            <p className="text-gray-600">Add your donor and prospect lists</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setImportMode('manual')}
              className={`px-4 py-2 rounded-lg ${
                importMode === 'manual'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Manually
              </div>
            </button>
            <button
              onClick={() => setImportMode('file')}
              className={`px-4 py-2 rounded-lg ${
                importMode === 'file'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Import from File
              </div>
            </button>
          </div>
        </div>

        {importMode === 'file' ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Import Contact List</h3>
            <p className="text-gray-500 mb-4">Upload a CSV or Excel file with your contacts</p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <div className="space-y-4">
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
              >
                Choose File
              </label>
              {file && (
                <p className="text-sm text-gray-600">
                  Selected file: {file.name}
                </p>
              )}
              <div className="text-sm text-gray-500">
                <p className="font-medium mb-2">Your file should include these columns:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>First Name</li>
                  <li>Last Name</li>
                  <li>Email</li>
                  <li>Phone (optional)</li>
                  <li>Address (optional)</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add any additional notes"
              />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Contact
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
            onClick={() => navigate('/setup/communication')}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue to Communication Setup
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}