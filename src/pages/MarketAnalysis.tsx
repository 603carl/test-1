import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Calendar, Filter, AlertCircle } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';

const MarketAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { predictions, loading, error } = useMarketData();

  const timeframes = ['1H', '4H', '1D', '1W', '1M'];
  const filters = ['All', 'Bullish', 'Bearish', 'High Confidence'];

  const filteredPredictions = predictions.filter(p => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Bullish') return p.prediction_type === 'bullish';
    if (selectedFilter === 'Bearish') return p.prediction_type === 'bearish';
    if (selectedFilter === 'High Confidence') return p.confidence >= 80;
    return true;
  });

  const marketSummary = {
    bullish: predictions.filter(p => p.prediction_type === 'bullish').length,
    bearish: predictions.filter(p => p.prediction_type === 'bearish').length,
    neutral: predictions.filter(p => p.prediction_type === 'neutral').length,
    avgConfidence: predictions.length > 0 ? Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length) : 0
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return 'text-success-600 bg-success-50';
      case 'bearish': return 'text-error-600 bg-error-50';
      default: return 'text-warning-600 bg-warning-50';
    }
  };

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return <TrendingUp className="h-4 w-4" />;
      case 'bearish': return <TrendingDown className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading market analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Market Analysis</h1>
          <p className="text-xl text-neutral-600">
            AI-powered currency predictions and market insights based on neural network analysis.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
              <span className="text-error-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Bullish Signals</p>
                <p className="text-2xl font-bold text-success-600">{marketSummary.bullish}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Bearish Signals</p>
                <p className="text-2xl font-bold text-error-600">{marketSummary.bearish}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-error-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Neutral</p>
                <p className="text-2xl font-bold text-warning-600">{marketSummary.neutral}</p>
              </div>
              <Activity className="h-8 w-8 text-warning-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-primary-600">{marketSummary.avgConfidence}%</p>
              </div>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">{marketSummary.avgConfidence}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Timeframe:</span>
              <div className="flex space-x-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedTimeframe === tf
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Filter:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Predictions Grid */}
        {filteredPredictions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPredictions.map((pred) => (
              <div
                key={pred.id}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-900">{pred.pair}</h3>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getPredictionColor(pred.prediction_type)}`}>
                    {getPredictionIcon(pred.prediction_type)}
                    <span className="capitalize">{pred.prediction_type}</span>
                  </div>
                </div>

                {/* Current Price */}
                <div className="mb-4">
                  <p className="text-sm text-neutral-600">Current Price</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-neutral-900">{pred.current_price}</span>
                  </div>
                </div>

                {/* Prediction Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Target:</span>
                    <span className="text-sm font-medium text-neutral-900">{pred.predicted_price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Timeframe:</span>
                    <span className="text-sm font-medium text-neutral-900">{pred.timeframe}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Confidence:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-neutral-200 rounded-full">
                        <div
                          className="h-full bg-primary-600 rounded-full"
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-neutral-900">{pred.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Signals */}
                <div>
                  <p className="text-sm text-neutral-600 mb-2">Key Signals:</p>
                  <div className="flex flex-wrap gap-2">
                    {pred.signals.map((signal, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-lg"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg">No predictions available</p>
            <p className="text-neutral-500 mt-2">Check back later for updated market analysis.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 bg-warning-50 border border-warning-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-warning-800 mb-2">Risk Disclaimer</h3>
          <p className="text-sm text-warning-700 leading-relaxed">
            Market predictions are based on algorithmic analysis and historical data. Past performance does not guarantee future results. 
            Forex trading involves substantial risk and may not be suitable for all investors. Please ensure you understand the risks involved 
            and seek independent financial advice if necessary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;