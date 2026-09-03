-- Storage bucket for admin image uploads
-- Run in Supabase SQL Editor after schema.sql

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-uploads',
  'admin-uploads',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read admin uploads" ON storage.objects;
CREATE POLICY "Public read admin uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-uploads');

DROP POLICY IF EXISTS "Admin upload images" ON storage.objects;
CREATE POLICY "Admin upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'admin-uploads'
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Admin update images" ON storage.objects;
CREATE POLICY "Admin update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'admin-uploads' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin delete images" ON storage.objects;
CREATE POLICY "Admin delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'admin-uploads' AND auth.role() = 'authenticated');
