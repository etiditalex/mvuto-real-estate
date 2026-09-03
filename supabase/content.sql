-- MVUTO REAL ESTATE LTD — Content tables (blogs, news, market research, testimonials)
-- Run this in the Mvuto Supabase SQL Editor if the project already has schema.sql applied.
-- Safe to re-run.

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'MVUTO Investment Team',
  published_at DATE NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_html TEXT,
  hero_title TEXT,
  hero_image_alt TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  published_at DATE NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  details JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS market_research_reports (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  report_date DATE NOT NULL,
  report_type TEXT NOT NULL,
  file_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS market_research_insights (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'TrendingUp',
  title TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  property TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_blog_updated ON blog_posts;
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_news_updated ON news_items;
CREATE TRIGGER trg_news_updated BEFORE UPDATE ON news_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_reports_updated ON market_research_reports;
CREATE TRIGGER trg_reports_updated BEFORE UPDATE ON market_research_reports
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_insights_updated ON market_research_insights;
CREATE TRIGGER trg_insights_updated BEFORE UPDATE ON market_research_insights
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_testimonials_updated ON client_testimonials;
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON client_testimonials
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_research_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published blogs" ON blog_posts;
CREATE POLICY "Public read published blogs" ON blog_posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public read published news" ON news_items;
CREATE POLICY "Public read published news" ON news_items
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public read published reports" ON market_research_reports;
CREATE POLICY "Public read published reports" ON market_research_reports
  FOR SELECT USING (published = TRUE);

DROP POLICY IF EXISTS "Public read published insights" ON market_research_insights;
CREATE POLICY "Public read published insights" ON market_research_insights
  FOR SELECT USING (published = TRUE);

DROP POLICY IF EXISTS "Public read published testimonials" ON client_testimonials;
CREATE POLICY "Public read published testimonials" ON client_testimonials
  FOR SELECT USING (published = TRUE);

DROP POLICY IF EXISTS "Admin full access blogs" ON blog_posts;
CREATE POLICY "Admin full access blogs" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access news" ON news_items;
CREATE POLICY "Admin full access news" ON news_items
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access reports" ON market_research_reports;
CREATE POLICY "Admin full access reports" ON market_research_reports
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access insights" ON market_research_insights;
CREATE POLICY "Admin full access insights" ON market_research_insights
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access testimonials" ON client_testimonials;
CREATE POLICY "Admin full access testimonials" ON client_testimonials
  FOR ALL USING (auth.role() = 'authenticated');
