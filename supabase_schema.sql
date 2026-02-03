-- ⚠️ UPDATED SCHEMA FOR LEVEL SYSTEM
-- We drop and recreate to ensure 'level' is included correctly.

drop policy if exists "Allow anonymous inserts" on games;
drop policy if exists "Allow anonymous updates" on games;
drop policy if exists "Allow anonymous select" on games;
drop table if exists games cascade;

create table games (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  player_name text not null,
  reg_no text not null,
  level integer not null default 1, -- Added Level
  score integer not null,
  rolls_used integer not null,
  result text not null check (result in ('won', 'lost')),
  
  -- Constraint: One entry per Student per Level
  -- (e.g., you can be on the leaderboard for Level 1 AND Level 2 separately)
  constraint games_reg_no_level_key unique (reg_no, level)
);

alter table games enable row level security;

create policy "Allow anonymous inserts"
  on games for insert
  with check (true);

create policy "Allow anonymous updates"
  on games for update
  using (true);

create policy "Allow anonymous select"
  on games for select
  using (true);
