-- Users profile (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  generations_used INTEGER DEFAULT 0,
  generations_limit INTEGER DEFAULT 5,
  billing_period_start TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generation history
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  category TEXT,
  marketplace TEXT NOT NULL,
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own generations" ON generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own generations" ON generations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to increment generations_used counter
CREATE OR REPLACE FUNCTION increment_generations_used(uid UUID, count INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET generations_used = generations_used + count,
      updated_at = NOW()
  WHERE id = uid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
