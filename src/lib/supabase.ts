import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export async function signUpUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/setup`
      }
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return { error };
  }
}

export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export async function getUserRole(userId: string) {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.role || null;
  } catch (error) {
    console.error('Error loading user role:', error);
    return null;
  }
}

export async function checkConnection() {
  try {
    const { error } = await supabase.from('organizations').select('count');
    return !error;
  } catch {
    return false;
  }
}