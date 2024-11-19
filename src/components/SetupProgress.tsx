import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { useCampaignSetupStore } from '../stores/campaignSetupStore';

const steps = [
  { key: 'basicInfo', label: 'Basic Info' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'team', label: 'Team' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'communication', label: 'Communication' }
];

export default function SetupProgress() {
  const { currentStep, stepsCompleted } = useCampaignSetupStore();

  return (
    <div className="mb-8">
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
          <motion.div
            className="absolute top-0 left-0 h-full bg-indigo-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = stepsCompleted[step.key as keyof typeof stepsCompleted];
            const isCurrent = currentStep === index;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-600'
                      : isCurrent
                      ? 'bg-indigo-600'
                      : 'bg-gray-200'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <span className="mt-2 text-sm font-medium text-gray-600">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Warning */}
      {currentStep > 0 && !stepsCompleted[steps[currentStep - 1].key as keyof typeof stepsCompleted] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center text-yellow-700"
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="text-sm">
            Please complete the previous step before proceeding.
          </span>
        </motion.div>
      )}
    </div>
  );
}