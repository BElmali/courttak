-- Courttak core schema (MVP)
-- Clubs, courts, devices, matches, analytics, media metadata

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Clubs & courts
-- ---------------------------------------------------------------------------

create table public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.courts (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  name text not null,
  sport text not null check (sport in ('padel', 'tennis')),
  qr_secret text not null,
  camera_config jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index courts_club_id_idx on public.courts (club_id);

create table public.devices (
  id uuid primary key default gen_random_uuid(),
  court_id uuid not null unique references public.courts (id) on delete cascade,
  device_key text not null unique,
  last_seen_at timestamptz,
  status text not null default 'offline'
    check (status in ('online', 'offline', 'error')),
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profiles (extends auth.users)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Matches
-- ---------------------------------------------------------------------------

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  court_id uuid not null references public.courts (id),
  club_id uuid not null references public.clubs (id),
  status text not null
    check (status in (
      'draft', 'claimed', 'recording', 'uploading', 'queued',
      'analyzing', 'ready', 'failed', 'cancelled'
    )),
  started_at timestamptz,
  ended_at timestamptz,
  duration_sec numeric,
  winner_side text check (winner_side in ('A', 'B')),
  sport text not null check (sport in ('padel', 'tennis')),
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create index matches_club_id_idx on public.matches (club_id);
create index matches_court_id_idx on public.matches (court_id);
create index matches_status_idx on public.matches (status);
create index matches_created_at_idx on public.matches (created_at desc);

create table public.match_participants (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  profile_id uuid references public.profiles (id),
  display_name text not null,
  side text not null check (side in ('A', 'B')),
  slot smallint not null check (slot in (1, 2)),
  unique (match_id, side, slot)
);

create index match_participants_profile_id_idx
  on public.match_participants (profile_id);

create table public.recordings (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  storage_path text not null,
  bytes bigint,
  duration_sec numeric,
  checksum text,
  created_at timestamptz not null default now()
);

create index recordings_match_id_idx on public.recordings (match_id);

-- ---------------------------------------------------------------------------
-- Analysis jobs & results
-- ---------------------------------------------------------------------------

create table public.analysis_jobs (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  provider text not null,
  external_job_id text,
  status text not null
    check (status in ('queued', 'running', 'succeeded', 'failed')),
  attempt int not null default 0,
  error text,
  started_at timestamptz,
  finished_at timestamptz,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index analysis_jobs_match_id_idx on public.analysis_jobs (match_id);
create index analysis_jobs_external_job_id_idx
  on public.analysis_jobs (external_job_id);

create table public.match_analytics (
  match_id uuid primary key references public.matches (id) on delete cascade,
  ball_in_play_sec numeric,
  longest_rally_shots int,
  court_usage_pct numeric,
  dominant_zone text,
  shot_direction jsonb,
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.heatmaps (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  kind text not null
    check (kind in ('coverage', 'player_position', 'shot_density')),
  profile_id uuid references public.profiles (id),
  grid jsonb,
  storage_path text,
  blobs jsonb,
  created_at timestamptz not null default now(),
  unique (match_id, kind, profile_id)
);

create index heatmaps_match_id_idx on public.heatmaps (match_id);

create table public.shot_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  profile_id uuid references public.profiles (id),
  t_ms int not null,
  x numeric not null,
  y numeric not null,
  shot_type text,
  outcome text,
  meta jsonb not null default '{}'::jsonb
);

create index shot_events_match_id_idx on public.shot_events (match_id);

create table public.highlights (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches (id) on delete cascade,
  label text not null,
  detail text,
  duration_sec numeric,
  start_ms int,
  end_ms int,
  storage_path text,
  thumbnail_path text,
  rank int not null default 0,
  created_at timestamptz not null default now()
);

create index highlights_match_id_idx on public.highlights (match_id);

create table public.player_match_stats (
  match_id uuid not null references public.matches (id) on delete cascade,
  profile_id uuid references public.profiles (id),
  display_name text not null,
  shots int,
  winners int,
  errors int,
  distance_m numeric,
  coverage_pct numeric,
  primary key (match_id, display_name)
);

-- ---------------------------------------------------------------------------
-- Updated-at helper (optional future use)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
