-- Create team_members table with roles
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'member')),
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(organization_id, user_id)
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view team members in their organization"
    ON team_members FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM team_members WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Only owners and admins can manage team members"
    ON team_members FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM team_members
            WHERE user_id = auth.uid()
            AND organization_id = NEW.organization_id
            AND role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Only owners and admins can update team members"
    ON team_members FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM team_members
            WHERE user_id = auth.uid()
            AND organization_id = OLD.organization_id
            AND role IN ('owner', 'admin')
        )
    );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create organization
    WITH new_org AS (
        INSERT INTO organizations (name, owner_id)
        VALUES ('My Organization', NEW.id)
        RETURNING id
    )
    -- Create team member record
    INSERT INTO team_members (organization_id, user_id, role)
    SELECT id, NEW.id, 'owner'
    FROM new_org;
    
    -- Create profile
    INSERT INTO profiles (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();