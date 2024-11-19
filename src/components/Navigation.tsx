import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Gift className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CampaignPro</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleSignIn}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </button>
                <Link 
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}