-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'member')),
    title TEXT,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    active BOOLEAN DEFAULT true
);

-- Enable RLS on team_members
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for team_members
CREATE POLICY "Users can view team members in their organization"
ON team_members FOR SELECT
USING (
    organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
);

CREATE POLICY "Users can insert team members in their organization"
ON team_members FOR INSERT
WITH CHECK (
    organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
);

CREATE POLICY "Users can update team members in their organization"
ON team_members FOR UPDATE
USING (
    organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
);

CREATE POLICY "Users can delete team members in their organization"
ON team_members FOR DELETE
USING (
    organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
);