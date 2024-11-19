import React from 'react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Demo'],
  Company: ['About', 'Blog', 'Careers'],
  Resources: ['Documentation', 'Help Center', 'Guides'],
  Legal: ['Privacy', 'Terms', 'Security']
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} CampaignPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}