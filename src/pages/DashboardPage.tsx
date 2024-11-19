import React from 'react';
import { motion } from 'framer-motion';
import SetupProgress from '../components/SetupProgress';
import SetupSidebar from '../components/SetupSidebar';
import BasicInfoStep from '../components/setup/BasicInfoStep';
import { useCampaignSetupStore } from '../stores/campaignSetupStore';

export default function DashboardPage() {
  const { currentStep } = useCampaignSetupStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SetupSidebar />
      
      <div className="flex-1 p-8">
        <SetupProgress />
        
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
}