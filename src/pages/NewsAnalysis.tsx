import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, TrendingDown, AlertCircle, Globe, ShoppingCart, DollarSign } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';

const NewsAnalysis = () => {
  const [selectedImpact, setSelectedImpact] = useState('All');
  const { newsEvents, loading, error } = useMarketData();

  const impactFilters = ['All', 'High', 'Medium', 'Low'];

  const filteredEvents = newsEvents.filter(event => {
    if (selectedImpact === 'All') return true;
    return event.impact.toLowerCase() === selectedImpact.toLowerCase();
  });

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-error-100 text-error-800 border-error-200';
      case 'medium': return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'low': return 'bg-success-100 text-success-800 border-success-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getSignalColor = (prediction: string) => {
    if (prediction.toLowerCase().includes('bullish')) return 'bg-success-600 text-white';
    if (prediction.toLowerCase().includes('bearish')) return 'bg-error-600 text-white';
    return 'bg-warning-600 text-white';
  };

  const getSignalIcon = (prediction: string) => {
    if (prediction.toLowerCase().includes('bullish')) return <ShoppingCart className="h-4 w-4" />;
    if (prediction.toLowerCase().includes('bearish')) return <DollarSign className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getPredictionIcon = (prediction: string) => {
    if (prediction.toLowerCase().includes('bullish')) return <TrendingUp className="h-4 w-4 text-success-600" />;
    if (prediction.toLowerCase().includes('bearish')) return <TrendingDown className="h-4 w-4 text-error-600" />;
    return <AlertCircle className="h-4 w-4 text-warning-600" />;
  };

  const upcomingEvents = newsEvents.filter(event => new Date(event.event_time) > new Date()).length;
  const highImpactEvents = newsEvents.filter(event => event.impact === 'high').length;
  const avgConfidence = newsEvents.length > 0 ? Math.round(newsEvents.reduce((acc, event) => acc + event.confidence, 0) / newsEvents.length) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading news analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">News Analysis & Predictions</h1>
          <p className="text-xl text-neutral-600">
            AI-powered analysis of economic events with buy/sell signals and predicted impact on currency pairs.
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-primary-600">{upcomingEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">High Impact</p>
                <p className="text-2xl font-bold text-error-600">{highImpactEvents}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-error-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-secondary-600">{avgConfidence}%</p>
              </div>
              <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-secondary-600 font-bold text-sm">{avgConfidence}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Global Coverage</p>
                <p className="text-2xl font-bold text-accent-600">24/7</p>
              </div>
              <Globe className="h-8 w-8 text-accent-600" />
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-neutral-700">Filter by Impact:</span>
            <div className="flex space-x-2">
              {impactFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedImpact(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedImpact === filter
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Events */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-6">
            {filteredEvents.map((event) => {
              const isUpcoming = new Date(event.event_time) > new Date();
              
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-2">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-neutral-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.event_time).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(event.event_time).toLocaleTimeString()}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(event.impact)}`}>
                              {event.impact} Impact
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isUpcoming ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-800'
                            }`}>
                              {isUpcoming ? 'Upcoming' : 'Completed'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-neutral-700 mb-4 leading-relaxed">{event.description}</p>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-neutral-600">Primary Currency:</p>
                          <p className="font-medium text-neutral-900">{event.currency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600">Event Time:</p>
                          <p className="font-medium text-neutral-900">
                            {new Date(event.event_time).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600">Impact Level:</p>
                          <p className="font-medium text-neutral-900 capitalize">{event.impact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Prediction Card */}
                    <div className="lg:w-80 bg-neutral-50 rounded-xl p-6">
                      <h4 className="font-semibold text-neutral-900 mb-4">Market Prediction</h4>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        {getPredictionIcon(event.prediction)}
                        <span className="font-medium text-neutral-900">{event.prediction}</span>
                      </div>

                      {/* Trading Signal */}
                      <div className="mb-4">
                        <p className="text-sm text-neutral-600 mb-2">Trading Signal:</p>
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${getSignalColor(event.prediction)}`}>
                          {getSignalIcon(event.prediction)}
                          <span>
                            {event.prediction.toLowerCase().includes('bullish') ? 'BUY' :
                             event.prediction.toLowerCase().includes('bearish') ? 'SELL' : 'HOLD'}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-neutral-600">Confidence Level</span>
                          <span className="text-sm font-medium text-neutral-900">{event.confidence}%</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-200 rounded-full">
                          <div
                            className="h-full bg-primary-600 rounded-full"
                            style={{ width: `${event.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-xs text-neutral-500">
                        Analysis created {new Date(event.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg">No news events available</p>
            <p className="text-neutral-500 mt-2">Check back later for updated market news analysis.</p>
          </div>
        )}

        {/* Economic Calendar CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Ahead of Market-Moving Events</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Get real-time notifications and detailed analysis of major economic events with actionable buy/sell signals.
          </p>
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
            Subscribe to Trading Signals
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsAnalysis;