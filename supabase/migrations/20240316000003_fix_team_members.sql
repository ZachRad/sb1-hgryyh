-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_organization_created ON organizations;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS set_initial_owner_role();

-- Create or replace the handle_new_user function
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
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the auth trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();