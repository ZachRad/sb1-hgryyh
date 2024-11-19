-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create auth schema tables
CREATE TABLE IF NOT EXISTS auth.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    name TEXT NOT NULL,
    website TEXT,
    logo_url TEXT,
    owner_id UUID REFERENCES auth.users(id),
    CONSTRAINT organizations_name_check CHECK (char_length(name) >= 1)
);

-- Enable RLS on organizations
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for organizations
CREATE POLICY "Users can view their own organizations"
ON organizations FOR SELECT
USING (owner_id = auth.uid());

CREATE POLICY "Users can insert their own organizations"
ON organizations FOR INSERT
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update their own organizations"
ON organizations FOR UPDATE
USING (owner_id = auth.uid());