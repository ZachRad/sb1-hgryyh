import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  milestones: string[];
}

const defaultPhases: Phase[] = [
  {
    id: '1',
    name: 'Planning Phase',
    startDate: '',
    endDate: '',
    description: 'Initial campaign planning and strategy development',
    milestones: ['Feasibility study', 'Case for support', 'Budget planning']
  },
  {
    id: '2',
    name: 'Quiet Phase',
    startDate: '',
    endDate: '',
    description: 'Major gift solicitation and leadership commitments',
    milestones: ['Board giving', 'Leadership gifts', 'Key donor meetings']
  },
  {
    id: '3',
    name: 'Public Phase',
    startDate: '',
    endDate: '',
    description: 'Broad community engagement and fundraising',
    milestones: ['Public announcement', 'Community events', 'Media outreach']
  }
];

export default function TimelinePage() {
  const navigate = useNavigate();
  const [phases, setPhases] = useState<Phase[]>(defaultPhases);

  const handlePhaseChange = (id: string, field: keyof Phase, value: string) => {
    setPhases(phases.map(phase =>
      phase.id === id ? { ...phase, [field]: value } : phase
    ));
  };

  const addPhase = () => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      milestones: []
    };
    setPhases([...phases, newPhase]);
  };

  const removePhase = (id: string) => {
    if (phases.length > 1) {
      setPhases(phases.filter(phase => phase.id !== id));
    }
  };

  const addMilestone = (phaseId: string) => {
    setPhases(phases.map(phase =>
      phase.id === phaseId
        ? { ...phase, milestones: [...phase.milestones, ''] }
        : phase
    ));
  };

  const updateMilestone = (phaseId: string, index: number, value: string) => {
    setPhases(phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            milestones: phase.milestones.map((m, i) => (i === index ? value : m))
          }
        : phase
    ));
  };

  const removeMilestone = (phaseId: string, index: number) => {
    setPhases(phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            milestones: phase.milestones.filter((_, i) => i !== index)
          }
        : phase
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Plan Timeline</h1>
            <p className="text-gray-600">Define your campaign phases and key activities</p>
          </div>
        </div>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={phase.name}
                    onChange={(e) => handlePhaseChange(phase.id, 'name', e.target.value)}
                    placeholder="Phase Name"
                    className="text-lg font-semibold w-full border-none p-0 focus:ring-0"
                  />
                </div>
                {phases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhase(phase.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={phase.startDate}
                    onChange={(e) => handlePhaseChange(phase.id, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={phase.endDate}
                    onChange={(e) => handlePhaseChange(phase.id, 'endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={phase.description}
                  onChange={(e) => handlePhaseChange(phase.id, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe this phase"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Milestones</label>
                <div className="space-y-2">
                  {phase.milestones.map((milestone, mIndex) => (
                    <div key={mIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={milestone}
                        onChange={(e) => updateMilestone(phase.id, mIndex, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter milestone"
                      />
                      <button
                        type="button"
                        onClick={() => removeMilestone(phase.id, mIndex)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addMilestone(phase.id)}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  + Add Milestone
                </button>
              </div>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={addPhase}
            className="flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Phase
          </button>

          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/setup')}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate('/setup/team')}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue to Team Setup
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}