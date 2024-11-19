import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const benefits = [
  'Full access to all features',
  'Unlimited users during trial',
  'Campaign dashboard',
  'Donor management tools',
  'Timeline planning',
  'Email support'
];

export default function TrialSection() {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate('/signin', { state: { demo: true } });
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Your 14-Day Free Trial Today
              </h2>
              <p className="text-xl text-gray-600">
                Experience the full power of CampaignPro with these benefits:
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center space-y-4">
              <div className="space-x-4">
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button
                  onClick={handleDemoClick}
                  className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Schedule a Demo
                </button>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Already have an account? </span>
                <Link to="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign in
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}