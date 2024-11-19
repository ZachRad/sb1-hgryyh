import React from 'react';
import { Check, Clock, CalendarClock, PartyPopper } from 'lucide-react';
import { campaignConfig } from '../config/campaignConfig';

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function calculatePosition(date: Date): number {
  const start = campaignConfig.startDate.getTime();
  const end = campaignConfig.endDate.getTime();
  const current = date.getTime();
  return ((current - start) / (end - start)) * 100;
}

function isSameMonth(startDate: Date, endDate: Date): boolean {
  return startDate.getMonth() === endDate.getMonth() && 
         startDate.getFullYear() === endDate.getFullYear();
}

function getPhaseIcon(status: string, phase: string) {
  if (status === 'completed') {
    return <Check className="w-5 h-5 text-white" />;
  } else if (status === 'active') {
    return <Clock className="w-5 h-5 text-white animate-pulse" />;
  } else if (phase.includes('Public')) {
    return <CalendarClock className="w-5 h-5 text-gray-400" />;
  } else if (phase.includes('Wrap-Up')) {
    return <PartyPopper className="w-5 h-5 text-gray-400" />;
  }
  return null;
}

function getPhaseColors(status: string, phase: string) {
  if (phase.includes('Public')) {
    return {
      icon: 'bg-gray-200',
      bar: 'bg-[#20A39E]',
      badge: 'bg-gray-100 text-gray-800',
      text: 'text-gray-600'
    };
  } else if (phase.includes('Wrap-Up')) {
    return {
      icon: 'bg-gray-200',
      bar: 'bg-[#FFBA49]',
      badge: 'bg-gray-100 text-gray-800',
      text: 'text-gray-600'
    };
  }
  
  switch (status) {
    case 'completed':
      return {
        icon: 'bg-green-500',
        bar: 'bg-green-500',
        badge: 'bg-green-100 text-green-800',
        text: 'text-green-700'
      };
    case 'active':
      return {
        icon: 'bg-blue-500',
        bar: 'bg-blue-500',
        badge: 'bg-blue-100 text-blue-800',
        text: 'text-blue-700'
      };
    default:
      return {
        icon: 'bg-gray-200',
        bar: 'bg-gray-300',
        badge: 'bg-gray-100 text-gray-800',
        text: 'text-gray-600'
      };
  }
}

export default function CampaignTimeline() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Campaign Timeline</h2>
        <button 
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          onClick={() => {
            // This is where we'd implement the date editor
            alert('Date editor coming soon!');
          }}
        >
          Edit Timeline
        </button>
      </div>
      <div className="space-y-8">
        {campaignConfig.phases.map((item, index) => {
          const colors = getPhaseColors(item.status, item.phase);
          const startPos = calculatePosition(item.startDate);
          const sameMonth = isSameMonth(item.startDate, item.endDate);
          
          return (
            <div key={index} className="relative">
              <div className="flex gap-4">
                {/* Status Icon */}
                <div className={`shrink-0 relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${colors.icon}`}>
                  {getPhaseIcon(item.status, item.phase)}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{item.phase}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.milestones.map((milestone, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}
                      >
                        {milestone}
                      </span>
                    ))}
                  </div>
                  
                  {/* Timeline Bar */}
                  <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className={`absolute h-full rounded-lg ${colors.bar}`}
                      style={{
                        left: `${startPos}%`,
                        width: `${calculatePosition(item.endDate) - startPos}%`
                      }}
                    >
                      {sameMonth ? (
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white z-20">
                          {formatMonthYear(item.startDate)}
                        </span>
                      ) : (
                        <>
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-medium text-white z-20">
                            {formatMonthYear(item.startDate)}
                          </span>
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-white z-20">
                            {formatMonthYear(item.endDate)}
                          </span>
                        </>
                      )}
                    </div>
                    {!sameMonth && (
                      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                        <span>{formatDate(item.startDate)}</span>
                        <span>{formatDate(item.endDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}