import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Download, Play, CheckCircle, AlertCircle, TrendingUp, Bot, CreditCard } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuthContext } from '../contexts/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('features');
  const { products, loading, error, getProductById } = useProducts();
  const { user } = useAuthContext();

  const product = getProductById(id || '');

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'performance', label: 'Performance' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'requirements', label: 'Requirements' }
  ];

  // Mock data for additional product details
  const mockProductDetails = {
    rating: 4.9,
    reviewCount: 127,
    version: '2.1.4',
    lastUpdated: '2024-01-15',
    screenshots: [
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    performance: {
      winRate: '95.3%',
      avgReturn: '23.7%',
      maxDrawdown: '4.2%',
      sharpeRatio: '3.1',
      trades: '2,847',
      profitFactor: '2.8'
    },
    requirements: [
      'Windows 10 or later / macOS 10.14+',
      'Minimum 8GB RAM, 16GB recommended',
      'Stable internet connection (low latency preferred)',
      'Compatible broker account (MT4/MT5)',
      'Minimum account balance: $5,000'
    ],
    reviews: [
      {
        name: 'Michael Chen',
        role: 'Portfolio Manager',
        rating: 5,
        date: '2024-01-10',
        comment: 'Exceptional performance on gold scalping. The bot consistently delivers profits with minimal drawdown. Worth every penny.'
      },
      {
        name: 'Sarah Johnson',
        role: 'Hedge Fund Trader',
        rating: 5,
        date: '2024-01-08',
        comment: 'Been using this for 3 months. The AI adapts well to market conditions and the risk management is top-notch.'
      },
      {
        name: 'David Rodriguez',
        role: 'Independent Trader',
        rating: 4,
        date: '2024-01-05',
        comment: 'Great bot overall. Setup was straightforward and performance matches expectations. Customer support is responsive.'
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-error-600 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg">Product not found</p>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Product Header */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
                  <p className="text-neutral-600 mb-4">{product.type}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(mockProductDetails.rating) ? 'text-accent-500 fill-current' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-neutral-900">{mockProductDetails.rating}</span>
                      <span className="text-neutral-500">({mockProductDetails.reviewCount} reviews)</span>
                    </div>
                    <span className="text-sm text-neutral-500">v{mockProductDetails.version}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {product.price === 0 ? 'Free' : `$${product.price.toLocaleString()}`}
                  </div>
                  {product.price > 0 && (
                    <div className="text-sm text-neutral-500">one-time purchase</div>
                  )}
                </div>
              </div>

              <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-8xl text-primary-600/30">
                  <Bot />
                </div>
              </div>

              <p className="text-neutral-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="border-b border-neutral-200">
                <nav className="flex space-x-8 px-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary-600 text-primary-600'
                          : 'border-transparent text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-6">Complete Feature List</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start p-4 bg-neutral-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-success-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'screenshots' && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-6">Product Screenshots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockProductDetails.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                            <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-6">Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {Object.entries(mockProductDetails.performance).map(([key, value]) => (
                          <div key={key} className="text-center p-4 bg-neutral-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600 mb-1">{value}</div>
                            <div className="text-sm text-neutral-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Performance Chart</h3>
                      <div className="bg-neutral-50 rounded-lg p-8 text-center">
                        <TrendingUp className="h-16 w-16 text-success-600 mx-auto mb-4" />
                        <p className="text-neutral-600">Interactive performance charts available in the full dashboard</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-6">Customer Reviews</h3>
                    <div className="space-y-6">
                      {mockProductDetails.reviews.map((review, index) => (
                        <div key={index} className="border-b border-neutral-200 pb-6 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-neutral-900">{review.name}</h4>
                              <p className="text-sm text-neutral-600">{review.role}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-accent-500 fill-current' : 'text-neutral-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-neutral-500 mt-1">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-neutral-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-6">System Requirements</h3>
                    <ul className="space-y-3">
                      {mockProductDetails.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-warning-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                      <p className="text-sm text-warning-800">
                        <strong>Note:</strong> VPS hosting is recommended for optimal performance and 24/7 operation. 
                        We provide setup assistance and VPS recommendations upon purchase.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {product.price === 0 ? 'Free' : `$${product.price.toLocaleString()}`}
                  </div>
                  {product.price > 0 && (
                    <div className="text-sm text-neutral-600">One-time purchase</div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  {user ? (
                    <Link
                      to={`/checkout?product=${product.id}`}
                      className="block w-full bg-primary-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{product.price === 0 ? 'Get Free Product' : 'Purchase Now'}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/auth"
                      className="block w-full bg-primary-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Sign In to Purchase
                    </Link>
                  )}
                  <button className="block w-full bg-neutral-100 text-neutral-900 text-center py-3 px-6 rounded-lg font-semibold hover:bg-neutral-200 transition-colors">
                    <Download className="h-4 w-4 inline mr-2" />
                    Download Demo
                  </button>
                </div>

                <div className="text-center text-sm text-neutral-600">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Secured by Stripe payments
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Status:</span>
                    <span className="font-medium capitalize">{product.status.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Last Updated:</span>
                    <span className="font-medium">{mockProductDetails.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Support:</span>
                    <span className="font-medium text-success-600">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Refund Policy:</span>
                    <span className="font-medium">30 days</span>
                  </div>
                </div>
              </div>

              {/* Payment Security */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCard className="h-6 w-6" />
                  <h3 className="font-semibold">Secure Payments</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">Visa, Mastercard, Amex accepted</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">PCI DSS compliant processing</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">30-day money-back guarantee</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-primary-100">
                    Powered by Stripe - trusted by millions of businesses worldwide
                  </p>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-neutral-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-neutral-900 mb-2">Need Help?</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Our team is ready to assist with setup, configuration, and optimization.
                </p>
                <button className="w-full bg-white text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-neutral-50 transition-colors border border-neutral-200">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;