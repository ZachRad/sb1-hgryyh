export const campaignConfig = {
  name: "Building Tomorrow's Future Campaign",
  goal: 5000000,
  startDate: new Date('2024-11-01'),
  endDate: new Date('2026-01-31'),
  theme: {
    type: 'image',
    headerImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    gradientFrom: 'indigo-600',
    gradientTo: 'indigo-900',
  },
  phases: [
    {
      id: 1,
      phase: 'Planning Phase',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2025-03-31'),
      status: 'completed',
      description: 'Campaign strategy and goal setting',
      milestones: ['Feasibility study', 'Case for support', 'Budget planning']
    },
    {
      id: 2,
      phase: 'Quiet Phase',
      startDate: new Date('2025-04-01'),
      endDate: new Date('2026-01-31'),
      status: 'active',
      description: 'Major gift solicitation and leadership commitments',
      milestones: ['Board giving', 'Leadership gifts', 'Key donor meetings']
    },
    {
      id: 3,
      phase: 'Public Phase',
      startDate: new Date('2025-10-01'),
      endDate: new Date('2026-01-31'),
      status: 'upcoming',
      description: 'Broad community engagement and fundraising',
      milestones: ['Public announcement', 'Community events', 'Media outreach']
    },
    {
      id: 4,
      phase: 'Campaign Wrap-Up - Celebrate!',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-01-31'),
      status: 'upcoming',
      description: 'Celebrate success and transition to stewardship',
      milestones: ['Donor recognition', 'Impact report', 'Victory celebration']
    }
  ]
};