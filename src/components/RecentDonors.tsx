import React from 'react';

const recentDonors = [
  {
    name: 'Sarah Johnson',
    amount: 25000,
    date: '2024-03-15',
    type: 'Major Gift'
  },
  {
    name: 'Michael Chen',
    amount: 10000,
    date: '2024-03-14',
    type: 'Annual Fund'
  },
  {
    name: 'Emily Williams',
    amount: 15000,
    date: '2024-03-13',
    type: 'Capital Campaign'
  },
  {
    name: 'Robert Davis',
    amount: 5000,
    date: '2024-03-12',
    type: 'Restricted Gift'
  }
];

export default function RecentDonors() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-6">Recent Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Donor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
            </tr>
          </thead>
          <tbody>
            {recentDonors.map((donor, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{donor.name}</td>
                <td className="py-3 px-4">${donor.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{new Date(donor.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {donor.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}