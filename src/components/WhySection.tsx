import React from 'react';
import { Clock, DollarSign, MousePointer, Bot, Timer, Brain } from 'lucide-react';

const whyFeatures = [
  {
    icon: <Clock className="w-6 h-6 text-indigo-600" />,
    title: 'Saves Time',
    description: 'Automate repetitive tasks like follow-ups and donor communication so you can focus on your nonprofit\'s day-to-day.'
  },
  {
    icon: <DollarSign className="w-6 h-6 text-indigo-600" />,
    title: 'Saves Money',
    description: 'An affordable solution that eliminates the need for complex and expensive software. Simple, clean design that suits your needs without extra costs.'
  },
  {
    icon: <MousePointer className="w-6 h-6 text-indigo-600" />,
    title: 'Easy to Use',
    description: 'Intuitive interface that makes managing donors and volunteers easy, with no steep learning curve.'
  },
  {
    icon: <Bot className="w-6 h-6 text-indigo-600" />,
    title: 'Runs on Autopilot',
    description: 'Automate workflows and donor prospect tracking so you never miss an opportunity, follow-up, or task - even when you\'re busy.'
  },
  {
    icon: <Timer className="w-6 h-6 text-indigo-600" />,
    title: 'Adaptive Campaign Planning',
    description: 'Keep your campaign on track with flexible timeline tools that adjust to your changing needs, while automated alerts ensure no milestone is missed.'
  },
  {
    icon: <Brain className="w-6 h-6 text-indigo-600" />,
    title: 'Frees Up Your Time',
    description: 'With CampaignPro handling the details, you can dedicate more time to strategic decisions and running your nonprofit efficiently.'
  }
];

export default function WhySection() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why CampaignPro?
          </h2>
          <p className="text-xl text-gray-600">
            Designed to make your fundraising easier, more productive, and more efficient
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyFeatures.map((feature, index) => (
            <div key={`why-${index}`} className="p-6 bg-gray-50 rounded-xl">
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