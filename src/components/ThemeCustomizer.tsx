import React, { useState } from 'react';
import { X, Image as ImageIcon, Palette } from 'lucide-react';
import { presetBackgrounds, presetColors } from '../config/headerConfig';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (theme: any) => void;
  currentTheme: any;
}

export default function ThemeCustomizer({ isOpen, onClose, onUpdate, currentTheme }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState('background');
  const [customColor, setCustomColor] = useState('#4F46E5');
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Customize Header</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'background' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('background')}
          >
            <ImageIcon className="w-4 h-4" />
            Background
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'color' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('color')}
          >
            <Palette className="w-4 h-4" />
            Colors
          </button>
        </div>

        {activeTab === 'background' && (
          <div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Custom Image URL</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Enter image URL..."
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  onClick={() => onUpdate({ 
                    ...currentTheme,
                    headerImage: customImageUrl,
                    type: 'image'
                  })}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Apply
                </button>
              </div>
            </div>

            <h3 className="font-medium mb-2">Preset Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {presetBackgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => onUpdate({ 
                    ...currentTheme,
                    headerImage: bg.url,
                    type: 'image'
                  })}
                  className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 ring-indigo-600"
                >
                  <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-2">
                    <span className="text-white text-sm">{bg.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'color' && (
          <div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Custom Color</h3>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <button
                  onClick={() => onUpdate({ 
                    type: 'solid',
                    backgroundColor: customColor
                  })}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Apply Solid Color
                </button>
              </div>
            </div>

            <h3 className="font-medium mb-2">Preset Gradients</h3>
            <div className="grid grid-cols-3 gap-4">
              {presetColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onUpdate({ 
                    type: 'gradient',
                    gradientFrom: color.from,
                    gradientTo: color.to
                  })}
                  className={`h-24 rounded-lg bg-gradient-to-r from-${color.from} to-${color.to} hover:ring-2 ring-indigo-600`}
                >
                  <span className="text-white text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}