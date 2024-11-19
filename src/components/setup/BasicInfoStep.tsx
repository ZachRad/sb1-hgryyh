import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, FileText } from 'lucide-react';
import { useCampaignSetupStore } from '../../stores/campaignSetupStore';

export default function BasicInfoStep() {
  const { name, goal, startDate, endDate, description, updateBasicInfo, markStepComplete, setCurrentStep } = useCampaignSetupStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!name || !goal || !startDate || !endDate) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      setError('End date must be after start date');
      return;
    }

    // Save and proceed
    markStepComplete('basicInfo');
    setCurrentStep(1); // Move to next step
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    updateBasicInfo({
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
          <p className="text-gray-600">Let's start with the basic information</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... rest of the form fields stay the same ... */}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}