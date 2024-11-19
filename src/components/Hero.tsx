import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Capital Campaign Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Powerful tools to plan, track, and succeed in your fundraising campaigns. 
            Try CampaignPro free for 14 days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="border border-gray-300 bg-white text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Schedule a Demo
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required</p>
        </div>
      </div>
    </div>
  );
}