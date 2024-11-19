import React from 'react';
import { 
  Users, Gift, PieChart, UserCheck, Calendar, 
  FileText, Settings, LogOut, Home
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: Users, label: 'Donors' },
  { icon: Gift, label: 'Gifts' },
  { icon: PieChart, label: 'Reports' },
  { icon: UserCheck, label: 'Volunteers' },
  { icon: Calendar, label: 'Events' },
  { icon: FileText, label: 'Documents' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <Gift className="w-8 h-8" />
        <h1 className="text-xl font-bold">CampaignPro</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 w-full p-3 hover:bg-indigo-800 rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <button className="flex items-center gap-3 w-full p-3 hover:bg-indigo-800 rounded-lg transition-colors mt-auto absolute bottom-4">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}