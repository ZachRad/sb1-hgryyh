import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CampaignSetup {
  // Basic Info
  name: string;
  goal: number;
  startDate: string;
  endDate: string;
  description: string;

  // Timeline
  phases: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    milestones: string[];
  }[];

  // Team
  teamMembers: {
    id: string;
    name: string;
    email: string;
    role: string;
    responsibilities: string[];
  }[];

  // Current step tracking
  currentStep: number;
  stepsCompleted: {
    basicInfo: boolean;
    timeline: boolean;
    team: boolean;
    contacts: boolean;
    communication: boolean;
  };
}

interface CampaignSetupStore extends CampaignSetup {
  updateBasicInfo: (info: Partial<CampaignSetup>) => void;
  updatePhases: (phases: CampaignSetup['phases']) => void;
  updateTeamMembers: (members: CampaignSetup['teamMembers']) => void;
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: keyof CampaignSetup['stepsCompleted']) => void;
  resetStore: () => void;
}

const initialState: CampaignSetup = {
  name: '',
  goal: 0,
  startDate: '',
  endDate: '',
  description: '',
  phases: [],
  teamMembers: [],
  currentStep: 0,
  stepsCompleted: {
    basicInfo: false,
    timeline: false,
    team: false,
    contacts: false,
    communication: false
  }
};

export const useCampaignSetupStore = create<CampaignSetupStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateBasicInfo: (info) =>
        set((state) => ({
          ...state,
          ...info
        })),

      updatePhases: (phases) =>
        set((state) => ({
          ...state,
          phases
        })),

      updateTeamMembers: (members) =>
        set((state) => ({
          ...state,
          teamMembers: members
        })),

      setCurrentStep: (step) =>
        set((state) => ({
          ...state,
          currentStep: step
        })),

      markStepComplete: (step) =>
        set((state) => ({
          ...state,
          stepsCompleted: {
            ...state.stepsCompleted,
            [step]: true
          }
        })),

      resetStore: () => set(initialState)
    }),
    {
      name: 'campaign-setup-storage'
    }
  )
);