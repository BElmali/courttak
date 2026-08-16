-- Private storage buckets for match media
-- Apply via Supabase SQL editor or storage migration tooling

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('recordings', 'recordings', false, 5368709120, array['video/mp4', 'video/webm', 'video/quicktime']),
  ('highlights', 'highlights', false, 524288000, array['video/mp4', 'video/webm', 'image/jpeg', 'image/png', 'image/webp']),
  ('thumbnails', 'thumbnails', false, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('heatmaps', 'heatmaps', false, 52428800, array['application/json', 'application/octet-stream'])
on conflict (id) do nothing;

-- Authenticated users may read objects only through signed URLs issued by the app.
-- Direct storage.object policies stay locked down; service role uploads from edge/orchestrator.
