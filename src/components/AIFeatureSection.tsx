import React from 'react';
import { 
  Brain, 
  MessageSquareText, 
  Sparkles, 
  Target, 
  Workflow,
  PenTool
} from 'lucide-react';

const aiFeatures = [
  {
    icon: <MessageSquareText className="w-6 h-6 text-indigo-600" />,
    title: 'AI-Powered Donor Communication',
    description: 'Personalize donor communications at scale. Our AI crafts tailored messages based on donor history, preferences, and giving patterns.',
    example: 'Generate personalized thank-you notes, follow-ups, and impact reports automatically.'
  },
  {
    icon: <Target className="w-6 h-6 text-indigo-600" />,
    title: 'Smart Donor Insights',
    description: 'Predict donor behavior and identify optimal giving potential using advanced AI analytics.',
    example: 'Discover hidden patterns in donor data to maximize engagement and contributions.'
  },
  {
    icon: <Workflow className="w-6 h-6 text-indigo-600" />,
    title: 'Automated Campaign Strategy',
    description: 'Let AI optimize your campaign timeline and suggest data-driven adjustments to meet your goals.',
    example: 'Receive real-time recommendations for campaign optimization based on performance metrics.'
  },
  {
    icon: <Brain className="w-6 h-6 text-indigo-600" />,
    title: 'AI Research Assistant',
    description: 'Your 24/7 campaign assistant for research, analysis, and strategic planning.',
    example: 'Ask questions about best practices, similar campaigns, or donor trends.'
  },
  {
    icon: <PenTool className="w-6 h-6 text-indigo-600" />,
    title: 'Content Generation',
    description: 'Create compelling campaign materials with AI-powered content suggestions.',
    example: 'Generate campaign descriptions, social media posts, and email templates instantly.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    title: 'Predictive Analytics',
    description: 'Forecast campaign outcomes and identify potential challenges before they arise.',
    example: 'Get early warnings about campaign risks and opportunities for improvement.'
  }
];

export default function AIFeatureSection() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-gray-600">
            Harness the power of artificial intelligence to supercharge your fundraising
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <div key={`ai-${index}`} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm text-indigo-700">
                  <span className="font-medium">Example:</span> {feature.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}