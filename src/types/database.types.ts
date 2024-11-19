export interface Organization {
  id: string;
  created_at: string;
  name: string;
  website?: string;
  logo_url?: string;
}

export interface Campaign {
  id: string;
  created_at: string;
  organization_id: string;
  name: string;
  goal_amount: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  description?: string;
}

export interface Donor {
  id: string;
  created_at: string;
  organization_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  notes?: string;
  total_donated: number;
  last_donation_date?: string;
}

export interface Donation {
  id: string;
  created_at: string;
  campaign_id: string;
  donor_id: string;
  amount: number;
  type: 'one_time' | 'recurring' | 'pledge';
  status: 'completed' | 'pending' | 'failed';
  notes?: string;
}

export interface CampaignMilestone {
  id: string;
  created_at: string;
  campaign_id: string;
  title: string;
  target_date: string;
  target_amount: number;
  completed: boolean;
  description?: string;
}

export interface TeamMember {
  id: string;
  created_at: string;
  organization_id: string;
  user_id: string;
  role: 'admin' | 'manager' | 'member';
  title?: string;
}