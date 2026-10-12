-- Public-site availability switch for an existing Mvuto Supabase project.
-- Run this once in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin full access settings" ON site_settings;
CREATE POLICY "Admin full access settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read site availability" ON site_settings;
CREATE POLICY "Public read site availability" ON site_settings
  FOR SELECT USING (key = 'site_availability');

INSERT INTO site_settings (key, value)
VALUES ('site_availability', '{"publicDisabled": false}'::jsonb)
ON CONFLICT (key) DO NOTHING;
