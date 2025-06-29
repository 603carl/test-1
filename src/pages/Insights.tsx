import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen, Video, FileText, AlertCircle } from 'lucide-react';
import { useInsights } from '../hooks/useInsights';

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { insights, loading, error, getInsightsByCategory, getFeaturedInsights } = useInsights();

  const categories = ['All', 'Technology', 'Market Analysis', 'Risk Management', 'Regulation'];

  const filteredInsights = getInsightsByCategory(selectedCategory);
  const featuredInsights = getFeaturedInsights();
  const regularInsights = selectedCategory === 'All' ? 
    filteredInsights.filter(insight => !insight.featured) : 
    filteredInsights;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'whitepaper': 
      case 'report': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-error-100 text-error-800';
      case 'whitepaper': return 'bg-warning-100 text-warning-800';
      case 'report': return 'bg-secondary-100 text-secondary-800';
      default: return 'bg-primary-100 text-primary-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-white font-black tracking-tight" style={{ fontWeight: 900 }}>Market Insights &</span>
              <span className="text-white font-black tracking-tight block" style={{ fontWeight: 900 }}> Research</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Stay ahead of market trends with our expert analysis, research reports, and educational content 
              covering algorithmic trading, market dynamics, and financial technology.
            </p>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="py-8 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
                <span className="text-error-800 text-sm">{error}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {selectedCategory === 'All' && featuredInsights.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Featured Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredInsights.map((insight) => (
                <article
                  key={insight.id}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={insight.image_url}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(insight.type)}`}>
                        {getTypeIcon(insight.type)}
                        <span className="ml-1 capitalize">{insight.type}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-3">
                      <span className="px-2 py-1 bg-neutral-100 rounded-full">{insight.category}</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(insight.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {insight.read_time}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">{insight.content.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-neutral-400 mr-2" />
                        <span className="text-sm text-neutral-600">{insight.author}</span>
                      </div>
                      <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                        <span className="text-sm font-medium mr-1">Read More</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Insights */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            {selectedCategory === 'All' ? 'Latest Insights' : `${selectedCategory} Insights`}
          </h2>
          {regularInsights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularInsights.map((insight) => (
                <article
                  key={insight.id}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={insight.image_url}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(insight.type)}`}>
                        {getTypeIcon(insight.type)}
                        <span className="ml-1 capitalize">{insight.type}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-neutral-600 mb-3">
                      <span className="px-2 py-1 bg-neutral-100 rounded-full">{insight.category}</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(insight.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {insight.content.substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-3 w-3 text-neutral-400 mr-1" />
                        <span className="text-xs text-neutral-600">{insight.author}</span>
                      </div>
                      <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                        <span className="text-xs font-medium mr-1">{insight.read_time}</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 text-lg">No insights found for this category.</p>
              <p className="text-neutral-500 mt-2">Try selecting a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <TrendingUp className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">Stay Informed</h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Subscribe to our newsletter and get the latest market insights, research reports, 
            and trading strategies delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-primary-200 text-sm mt-4">
            No spam, unsubscribe at any time. Read our privacy policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Insights;