import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Users,
  Mail,
  MessageSquare,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useCampaignSetupStore } from '../stores/campaignSetupStore';

const steps = [
  {
    key: 'basicInfo',
    label: 'Basic Information',
    icon: FileText,
    description: 'Campaign name, goal, and dates'
  },
  {
    key: 'timeline',
    label: 'Timeline Planning',
    icon: Calendar,
    description: 'Define campaign phases and milestones'
  },
  {
    key: 'team',
    label: 'Team Setup',
    icon: Users,
    description: 'Add team members and assign roles'
  },
  {
    key: 'contacts',
    label: 'Contact Import',
    icon: Mail,
    description: 'Import your donor and prospect lists'
  },
  {
    key: 'communication',
    label: 'Communication Setup',
    icon: MessageSquare,
    description: 'Configure email templates and preferences'
  }
];

export default function SetupSidebar() {
  const { currentStep, stepsCompleted, setCurrentStep } = useCampaignSetupStore();

  const handleStepClick = (index: number) => {
    // Only allow clicking completed steps or the next available step
    if (stepsCompleted[steps[index].key as keyof typeof stepsCompleted] || index <= currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Campaign Setup</h2>
      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = stepsCompleted[step.key as keyof typeof stepsCompleted];
          const isCurrent = currentStep === index;
          const isClickable = isCompleted || index <= currentStep;

          return (
            <motion.button
              key={step.key}
              onClick={() => handleStepClick(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                isCurrent
                  ? 'bg-indigo-50 text-indigo-700'
                  : isClickable
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={isClickable ? { x: 4 } : {}}
              animate={{ opacity: isClickable ? 1 : 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={`w-5 h-5 ${isCurrent ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className="ml-3 font-medium">{step.label}</span>
                </div>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  isCurrent && <ArrowRight className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500 ml-8">{step.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}