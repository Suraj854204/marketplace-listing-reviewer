"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/config";

interface UserProfile {
  plan: "free" | "starter" | "pro" | "agency";
  stripe_customer_id: string | null;
  generations_used: number;
  generations_limit: number;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const DEFAULT_PROFILE: UserProfile = {
  plan: "free",
  stripe_customer_id: null,
  generations_used: 0,
  generations_limit: 3,
};

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  configured: false,
  signIn: async () => ({ error: "Not configured" }),
  signUp: async () => ({ error: "Not configured" }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  const fetchProfile = useCallback(
    async (userId: string) => {
      if (!configured) return;
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("profiles")
          .select("plan, stripe_customer_id, generations_used, generations_limit")
          .eq("id", userId)
          .single();
        if (data) {
          setProfile(data as UserProfile);
        } else {
          setProfile(DEFAULT_PROFILE);
        }
      } catch {
        setProfile(DEFAULT_PROFILE);
      }
    },
    [configured]
  );

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [configured, fetchProfile]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!configured) return { error: "Authentication is not configured yet." };
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error?.message ?? null };
    },
    [configured]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!configured) return { error: "Authentication is not configured yet." };
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { error: error?.message ?? null };
    },
    [configured]
  );

  const signOut = useCallback(async () => {
    if (!configured) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfile(null);
  }, [configured]);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        configured,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
