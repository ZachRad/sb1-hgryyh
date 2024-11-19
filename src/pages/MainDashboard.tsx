import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Gift, 
  Target, 
  TrendingUp,
  Calendar,
  Clock,
  Settings,
  UserPlus,
  ArrowLeft
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import CampaignProgress from '../components/CampaignProgress';
import CampaignTimeline from '../components/CampaignTimeline';
import RecentDonors from '../components/RecentDonors';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

interface CampaignData {
  name: string;
  daysLeft: number;
  nextMilestone: string;
}

export default function MainDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [campaignData] = useState<CampaignData>(() => {
    const defaultData = {
      name: "Building Tomorrow's Future Campaign",
      daysLeft: 245,
      nextMilestone: "Public Phase Launch"
    };

    return location.state?.campaignData || defaultData;
  });

  const quickStats = [
    {
      title: 'Total Raised',
      value: '$252,000',
      icon: <Gift className="w-6 h-6 text-indigo-600" />,
      trend: '12% from last month',
      trendUp: true
    },
    {
      title: 'Active Donors',
      value: '1,234',
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      trend: '8% from last month',
      trendUp: true
    },
    {
      title: 'Campaign Progress',
      value: '42%',
      icon: <Target className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Monthly Growth',
      value: '+15%',
      icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
      trend: '5% from last month',
      trendUp: true
    }
  ];

  if (!user?.email_confirmed_at) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <Calendar className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 mb-6">
            Please verify your email address to access the dashboard. Check your inbox for the verification link.
          </p>
          <button
            onClick={() => navigate('/verify-email')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Verification Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {campaignData.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{campaignData.daysLeft} days remaining</span>
                  <span className="mx-2">•</span>
                  <span>Next milestone: {campaignData.nextMilestone}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/setup')}
                className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaign Setup
              </button>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DashboardCard {...stat} />
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CampaignProgress />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RecentDonors />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <CampaignTimeline />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}