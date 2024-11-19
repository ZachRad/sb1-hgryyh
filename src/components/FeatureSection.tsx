import React from 'react';
import { Gift, Users, LineChart, Calendar } from 'lucide-react';

const features = [
  {
    icon: <Gift className="w-6 h-6 text-indigo-600" />,
    title: 'Campaign Management',
    description: 'Track and manage your entire capital campaign from a single dashboard'
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: 'Donor Management',
    description: 'Organize donor information and track engagement throughout your campaign'
  },
  {
    icon: <LineChart className="w-6 h-6 text-indigo-600" />,
    title: 'Progress Tracking',
    description: 'Visual analytics and reporting to monitor campaign success in real-time'
  },
  {
    icon: <Calendar className="w-6 h-6 text-indigo-600" />,
    title: 'Timeline Planning',
    description: 'Interactive timeline tools to plan and adjust campaign phases'
  }
];

export default function FeatureSection() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Run a Successful Campaign
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive tools designed specifically for capital campaign management
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}