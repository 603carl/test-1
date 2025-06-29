/*
  # Create market data tables

  1. New Tables
    - `market_predictions`
      - `id` (uuid, primary key)
      - `pair` (text)
      - `current_price` (numeric)
      - `predicted_price` (numeric)
      - `prediction_type` (text)
      - `confidence` (integer)
      - `timeframe` (text)
      - `signals` (jsonb)
      - `created_at` (timestamp)

    - `news_events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `impact` (text)
      - `currency` (text)
      - `prediction` (text)
      - `confidence` (integer)
      - `event_time` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS market_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pair text NOT NULL,
  current_price numeric NOT NULL,
  predicted_price numeric NOT NULL,
  prediction_type text NOT NULL CHECK (prediction_type IN ('bullish', 'bearish', 'neutral')),
  confidence integer NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  timeframe text NOT NULL,
  signals jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  impact text NOT NULL CHECK (impact IN ('high', 'medium', 'low')),
  currency text NOT NULL,
  prediction text NOT NULL,
  confidence integer NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  event_time timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE market_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Market predictions are viewable by everyone"
  ON market_predictions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "News events are viewable by everyone"
  ON news_events
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample market predictions
INSERT INTO market_predictions (pair, current_price, predicted_price, prediction_type, confidence, timeframe, signals) VALUES
('EUR/USD', 1.0847, 1.0920, 'bullish', 87, '24h', '["MA Cross", "RSI Oversold", "News Positive"]'),
('GBP/USD', 1.2634, 1.2580, 'bearish', 73, '24h', '["Support Break", "Volume Decline", "BoE Hawkish"]'),
('USD/JPY', 149.67, 151.20, 'bullish', 91, '48h', '["Momentum Strong", "Fed Policy", "Technical Breakout"]'),
('AUD/USD', 0.6789, 0.6800, 'neutral', 54, '24h', '["Consolidation", "Mixed Signals", "RBA Wait"]'),
('USD/CAD', 1.3521, 1.3480, 'bearish', 68, '36h', '["Oil Strength", "CAD Rally", "Risk On"]'),
('NZD/USD', 0.6234, 0.6290, 'bullish', 79, '24h', '["Commodity Rally", "RBNZ Hawkish", "China PMI"]')
ON CONFLICT DO NOTHING;

-- Insert sample news events
INSERT INTO news_events (title, description, impact, currency, prediction, confidence, event_time) VALUES
('Federal Reserve Interest Rate Decision', 'Expected 25bp rate hike will likely strengthen USD across major pairs. Watch for hawkish guidance.', 'high', 'USD', 'Bullish USD', 89, now() + interval '2 hours'),
('US Non-Farm Payrolls', 'Employment data may show cooling job market. Lower than expected could weaken USD temporarily.', 'high', 'USD', 'Mixed USD', 67, now() + interval '3 days'),
('European Central Bank Rate Decision', 'ECB maintained rates as expected but dovish tone suggests pause in tightening cycle.', 'high', 'EUR', 'Bearish EUR', 78, now() - interval '1 day'),
('UK Consumer Price Index', 'Core CPI expected to remain elevated, supporting BoE hawkish stance and GBP strength.', 'medium', 'GBP', 'Bullish GBP', 72, now() + interval '1 day'),
('Bank of Japan Policy Meeting', 'BoJ likely to maintain ultra-loose policy but may adjust YCC parameters slightly.', 'medium', 'JPY', 'Neutral JPY', 56, now() + interval '1 week'),
('Australian Employment Data', 'Strong employment growth expected to support RBA hawkish bias and AUD appreciation.', 'medium', 'AUD', 'Bullish AUD', 81, now() + interval '4 days')
ON CONFLICT DO NOTHING;