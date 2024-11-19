import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, resendVerificationEmail } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Check if we have a verification token in the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');
        
        if (type === 'signup') {
          setVerificationStatus('success');
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          // If no token, check if user is already verified
          const session = await supabase.auth.getSession();
          if (session.data.session?.user?.email_confirmed_at) {
            setVerificationStatus('success');
          } else {
            setVerificationStatus('error');
          }
        }
      } catch (err: any) {
        console.error('Error verifying email:', err);
        setVerificationStatus('error');
        setError(err.message);
      }
    };

    handleEmailVerification();
  }, [navigate]);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setResendStatus('sending');
    setError(null);

    try {
      const { error } = await resendVerificationEmail(user.email);
      if (error) throw error;
      setResendStatus('sent');
    } catch (err: any) {
      console.error('Error resending verification:', err);
      setResendStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <Gift className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CampaignPro</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            {verificationStatus === 'loading' ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Verifying your email...</p>
              </div>
            ) : verificationStatus === 'success' ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for verifying your email address. You can now access all features.
                </p>
                <Link
                  to="/dashboard"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Required</h2>
                <p className="text-gray-600 mb-6">
                  Please check your email and click the verification link to continue.
                </p>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                {resendStatus === 'sent' ? (
                  <p className="text-green-600 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Verification email sent!
                  </p>
                ) : (
                  <button
                    onClick={handleResendVerification}
                    disabled={resendStatus === 'sending'}
                    className="flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    {resendStatus === 'sending' ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend verification email
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}