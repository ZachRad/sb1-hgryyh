import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampaignGoalsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campaignName: '',
    overallGoal: '',
    campaignStart: '',
    campaignEnd: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard', { 
      state: { 
        campaignData: {
          name: formData.campaignName,
          goal: parseFloat(formData.overallGoal) || 0,
          startDate: formData.campaignStart,
          endDate: formData.campaignEnd
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tell Us About Your Project</h1>
            <p className="text-gray-600">Let's start with the basics of your campaign</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campaign Name */}
          <div>
            <label htmlFor="campaignName" className="block text-lg font-medium text-gray-700 mb-2">
              Campaign or Project Name
            </label>
            <input
              type="text"
              name="campaignName"
              id="campaignName"
              value={formData.campaignName}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              placeholder="Enter your campaign name"
            />
          </div>

          {/* Campaign Goal */}
          <div>
            <label htmlFor="overallGoal" className="block text-lg font-medium text-gray-700 mb-2">
              Campaign Goal
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="overallGoal"
                id="overallGoal"
                value={formData.overallGoal}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                placeholder="Enter your fundraising goal"
              />
            </div>
          </div>

          {/* Campaign Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="campaignStart" className="block text-sm font-medium text-gray-700">
                Campaign Start Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="campaignStart"
                  id="campaignStart"
                  value={formData.campaignStart}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="campaignEnd" className="block text-sm font-medium text-gray-700">
                Campaign End Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="campaignEnd"
                  id="campaignEnd"
                  value={formData.campaignEnd}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/setup')}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}