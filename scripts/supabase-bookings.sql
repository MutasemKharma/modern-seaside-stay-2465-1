-- Run this in Supabase SQL editor on your project
-- Creates a bookings table used by the website form and allows public (anon) inserts only

-- Enable required extensions
create extension if not exists pgcrypto;

-- Table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  apartment_id text not null,
  apartment_name text not null,
  full_name text not null,
  email text not null,
  phone text,
  check_in date not null,
  check_out date not null,
  guests int not null default 1,
  notes text,
  price_per_night numeric(10,2) not null,
  currency text not null default 'JOD',
  status text not null default 'pending',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

-- RLS
alter table public.bookings enable row level security;

-- Policy: allow anonymous inserts from the website
create policy if not exists "allow anon insert" on public.bookings
  for insert
  to anon
  with check (true);

-- Optional: allow service_role/full access (already implied by service key)
-- Optional: add an index on created_at
create index if not exists bookings_created_at_idx on public.bookings (created_at);