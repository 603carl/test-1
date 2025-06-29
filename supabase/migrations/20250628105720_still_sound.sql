/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `type` (text)
      - `features` (jsonb)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  type text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'beta', 'coming_soon')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Trigger to update updated_at on products
CREATE OR REPLACE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (id, name, description, price, type, features, status) VALUES
('gold-scalping-bot', 'Gold Scalping Bot', 'Advanced AI-powered scalping algorithm specifically designed for gold trading with high-frequency execution.', 2999, 'Premium Bot', 
 '["Real-time gold market analysis", "Sub-second execution speed", "Risk management protocols", "95% win rate over 6 months", "24/7 autonomous trading", "Backtesting & optimization"]', 'active'),
('forex-scanner', 'Multi-Timeframe Market Scanner', 'Comprehensive market scanning tool that analyzes multiple timeframes across all major currency pairs.', 499, 'Utility Tool',
 '["Scans 28 major pairs", "Multiple timeframe analysis", "Custom alert system", "Pattern recognition", "Trend strength indicator", "Export capabilities"]', 'active'),
('lot-calculator', 'Advanced Lot Size Calculator', 'Professional risk management tool for optimal position sizing with advanced money management features.', 0, 'Free Utility',
 '["Risk percentage calculator", "Multi-currency support", "Portfolio risk analysis", "Margin requirement calculator", "Historical volatility data", "Custom risk profiles"]', 'active'),
('news-analyzer', 'Economic News Analyzer', 'AI-driven news analysis tool with signal prediction for major economic events and market impact assessment.', 799, 'Analysis Tool',
 '["Real-time news parsing", "Sentiment analysis", "Impact prediction", "Affected pairs identification", "Historical correlation data", "Custom alert filters"]', 'active'),
('neural-trader', 'Neural Network Trader Pro', 'Advanced neural network trading system that adapts to market conditions with deep learning algorithms.', 4999, 'AI Trading System',
 '["Deep learning algorithms", "Adaptive market analysis", "Multi-asset support", "Real-time optimization", "Advanced backtesting", "API integration"]', 'coming_soon'),
('portfolio-manager', 'Portfolio Risk Manager', 'Comprehensive portfolio management system with advanced risk analytics and position optimization.', 1299, 'Risk Management',
 '["Portfolio optimization", "Risk metrics dashboard", "Correlation analysis", "Stress testing", "Performance attribution", "Compliance monitoring"]', 'beta')
ON CONFLICT (id) DO NOTHING;