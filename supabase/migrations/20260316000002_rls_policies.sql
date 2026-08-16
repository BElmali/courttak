-- Row Level Security policies for Courttak MVP

alter table public.clubs enable row level security;
alter table public.courts enable row level security;
alter table public.devices enable row level security;
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.match_participants enable row level security;
alter table public.recordings enable row level security;
alter table public.analysis_jobs enable row level security;
alter table public.match_analytics enable row level security;
alter table public.heatmaps enable row level security;
alter table public.shot_events enable row level security;
alter table public.highlights enable row level security;
alter table public.player_match_stats enable row level security;

-- Profiles: users can read all display names; update own row
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Clubs & courts: public read for active discovery (tighten later for B2B)
create policy "clubs_select_all"
  on public.clubs for select
  using (true);

create policy "courts_select_active"
  on public.courts for select
  using (is_active = true);

-- Devices: no client access by default (service role / edge only)
-- (intentionally no policies for authenticated users)

-- Matches: participants can read their matches; creators can insert
create policy "matches_select_participant_or_creator"
  on public.matches for select
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.match_participants mp
      where mp.match_id = matches.id
        and mp.profile_id = auth.uid()
    )
  );

create policy "matches_insert_authenticated"
  on public.matches for insert
  with check (auth.uid() is not null and created_by = auth.uid());

create policy "matches_update_creator"
  on public.matches for update
  using (created_by = auth.uid());

-- Participants
create policy "match_participants_select_if_match_visible"
  on public.match_participants for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = match_participants.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp2
            where mp2.match_id = m.id and mp2.profile_id = auth.uid()
          )
        )
    )
  );

create policy "match_participants_insert_creator"
  on public.match_participants for insert
  with check (
    exists (
      select 1 from public.matches m
      where m.id = match_id and m.created_by = auth.uid()
    )
  );

-- Helper macro pattern for match-scoped analytics tables
create policy "recordings_select_if_match_visible"
  on public.recordings for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = recordings.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );

create policy "analysis_jobs_select_if_match_visible"
  on public.analysis_jobs for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = analysis_jobs.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );

create policy "match_analytics_select_if_match_visible"
  on public.match_analytics for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = match_analytics.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );

create policy "heatmaps_select_if_match_visible"
  on public.heatmaps for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = heatmaps.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );

create policy "shot_events_select_if_match_visible"
  on public.shot_events for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = shot_events.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );

create policy "highlights_select_if_match_visible"
  on public.highlights for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = highlights.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );

create policy "player_match_stats_select_if_match_visible"
  on public.player_match_stats for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = player_match_stats.match_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.match_participants mp
            where mp.match_id = m.id and mp.profile_id = auth.uid()
          )
        )
    )
  );
