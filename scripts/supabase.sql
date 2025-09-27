-- Supabase SQL setup for Chalets app
-- Creates public tables and RLS policies for browser (anon) access
-- Run this in Supabase SQL editor on your project

-- 1) apartments table
create table if not exists public.apartments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  capacity int not null check (capacity >= 1),
  location text,
  image text,
  size int,
  features text[] default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_apartments_price on public.apartments (price);
create index if not exists idx_apartments_capacity on public.apartments (capacity);
create index if not exists idx_apartments_location on public.apartments (location);

-- 2) bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  apartment_id uuid not null references public.apartments(id) on delete cascade,
  apartment_name text,
  full_name text not null,
  email text not null,
  phone text,
  check_in date not null,
  check_out date not null,
  guests int not null check (guests >= 1),
  notes text,
  price_per_night numeric(10,2),
  currency text default 'JOD',
  status text not null default 'pending', -- pending | confirmed | cancelled
  source text default 'website',
  created_at timestamptz not null default now()
);

create index if not exists idx_bookings_apartment on public.bookings (apartment_id);
create index if not exists idx_bookings_dates on public.bookings (check_in, check_out);

-- Enable RLS
alter table public.apartments enable row level security;
alter table public.bookings enable row level security;

-- Policies
-- Anyone (anon) can read apartments
create policy if not exists "Allow read apartments for anon" on public.apartments
  for select
  to anon
  using (true);

-- Allow inserting bookings from anon (your website form)
create policy if not exists "Allow insert bookings for anon" on public.bookings
  for insert
  to anon
  with check (true);

-- Optional: allow reading own booking records if you later add auth; for now allow anon read of bookings = off
-- If you want to view bookings from the website (not recommended publicly), uncomment below.
-- create policy if not exists "Allow read bookings for anon" on public.bookings
--   for select
--   to anon
--   using (true);

-- Seed sample apartments (safe to run multiple times)
insert into public.apartments (id, name, description, price, capacity, location, image, size, features)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Sea Breeze Chalet',
    'Cozy beachfront chalet with modern amenities and a private terrace overlooking the sea.',
    150.00,
    4,
    'Aqaba',
    'https://images.unsplash.com/photo-1505692794403-34d498ca3e29?q=80&w=1600&auto=format&fit=crop',
    85,
    array['Wi-Fi','Kitchen','Bathroom','Sea View']
  )
  on conflict (id) do nothing;

insert into public.apartments (id, name, description, price, capacity, location, image, size, features)
values
  (
    '22222222-2222-2222-2222-222222222222',
    'Mountain Oasis Chalet',
    'Spacious mountain-side retreat with panoramic views and an indoor fireplace.',
    220.00,
    6,
    'Ajloun',
    'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1600&auto=format&fit=crop',
    120,
    array['Wi-Fi','Bathroom','Kitchen','Fireplace']
  )
  on conflict (id) do nothing;

insert into public.apartments (id, name, description, price, capacity, location, image, size, features)
values
  (
    '33333333-3333-3333-3333-333333333333',
    'Desert Star Chalet',
    'Minimalist desert chalet perfect for stargazing with an outdoor lounge.',
    180.00,
    3,
    'Wadi Rum',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop',
    70,
    array['Wi-Fi','Bathroom','Outdoor Lounge']
  )
  on conflict (id) do nothing;

-- Done.