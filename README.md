# Courttak

QR ile kort başlatılan, kamera ile kayıt alınan, CourtCheck-benzeri analizlerden beslenen tenis/padel platformu.

## Hızlı başlangıç

```bash
npm install
cp .env.example .env.local
npm run dev
```

Uygulama: [http://localhost:3000](http://localhost:3000)

Mock analiz demo API: [http://localhost:3000/api/analysis/demo](http://localhost:3000/api/analysis/demo)

## Yapı

```
src/
  app/(player)/          # Oyuncu ekranları (CourtDemo taşındı)
  app/api/analysis/      # AnalysisProvider demo endpoint
  components/            # UI
  lib/analysis/          # AnalysisProvider + MockProvider
  lib/supabase/          # Client helpers
  types/                 # Shared contracts
supabase/migrations/     # Schema + RLS + storage buckets
legacy/CourtDemo.jsx     # Orijinal prototip
```

## AnalysisProvider

`src/lib/analysis` altında pluggable adapter:

- `AnalysisProvider` arayüzü
- `MockAnalysisProvider` (MVP / UI)
- `normalizeAnalytics()` — Zod ile normalize sözleşme
- CourtCheck henüz yok; `getAnalysisProvider()` içine eklenecek

## Supabase

Migration’lar:

1. `20260316000001_init_schema.sql`
2. `20260316000002_rls_policies.sql`
3. `20260316000003_storage_buckets.sql`

```bash
npx supabase db push
# veya SQL editor’dan sırayla uygula
```

## Sonraki adımlar

- QR claim + edge agent protokolü
- Auth (Supabase Auth)
- CourtCheck provider adapter
- Gerçek video upload pipeline
