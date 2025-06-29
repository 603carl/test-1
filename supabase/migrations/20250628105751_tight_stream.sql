/*
  # Create insights table

  1. New Tables
    - `insights`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `type` (text)
      - `author` (text)
      - `featured` (boolean)
      - `image_url` (text)
      - `read_time` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `insights` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  type text NOT NULL CHECK (type IN ('article', 'video', 'whitepaper', 'report')),
  author text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  image_url text NOT NULL,
  read_time text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insights are viewable by everyone"
  ON insights
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Trigger to update updated_at on insights
CREATE OR REPLACE TRIGGER update_insights_updated_at
  BEFORE UPDATE ON insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample insights
INSERT INTO insights (title, content, category, type, author, featured, image_url, read_time) VALUES
('The Future of Algorithmic Trading: AI and Machine Learning Trends', 'Exploring how artificial intelligence and machine learning are revolutionizing algorithmic trading strategies and market analysis.', 'Technology', 'article', 'Dr. Sarah Chen', true, 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800', '8 min read'),
('Risk Management in High-Frequency Trading: Best Practices', 'Comprehensive guide to implementing effective risk management strategies in high-frequency trading environments.', 'Risk Management', 'whitepaper', 'Michael Rodriguez', false, 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800', '15 min read'),
('Market Microstructure Analysis: Understanding Order Flow', 'Deep dive into market microstructure and how order flow analysis can improve trading performance.', 'Market Analysis', 'video', 'Elena Kowalski', false, 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800', '25 min watch'),
('Forex Market Outlook 2024: Key Trends and Opportunities', 'Annual outlook on forex markets with analysis of major currency pairs and emerging opportunities.', 'Market Analysis', 'report', 'David Kim', true, 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800', '12 min read'),
('Building Robust Trading Algorithms: A Technical Guide', 'Technical insights into developing reliable and scalable algorithmic trading systems.', 'Technology', 'article', 'Alex Thompson', false, 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=800', '10 min read'),
('Regulatory Landscape for Algorithmic Trading in 2024', 'Overview of current and upcoming regulatory changes affecting algorithmic trading firms.', 'Regulation', 'article', 'Jennifer Walsh', false, 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800', '7 min read')
ON CONFLICT DO NOTHING;