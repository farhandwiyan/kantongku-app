-- setup pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- create table transactions
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    embedding VECTOR(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- aktivasi sistem RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- policy access untuk semua diperbolehkan
CREATE POLICY "Permissive rules for all" on public.transactions
    FOR ALL USING (true);

-- jika sudah ada sistem auth
-- CREATE POLICY "Users can manage their own transactions" ON public.transactions
--     FOR ALL (auth.uid() = users_id);