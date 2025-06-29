import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, TrendingUp, Shield, Zap, Star, CheckCircle, MessageSquare, Code, Wrench, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

const Products = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { products, loading, error } = useProducts();

  const customBotFeatures = [
    'Tailored algorithm development',
    'Custom risk parameters',
    'Specific market focus',
    'Proprietary indicators',
    'Backtesting & optimization',
    'Full source code access',
    'Ongoing support & updates',
    'Performance monitoring'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800 border-success-200';
      case 'beta': return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'coming_soon': return 'bg-neutral-100 text-neutral-800 border-neutral-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('Bot') || type.includes('AI')) return <Bot className="h-5 w-5" />;
    if (type.includes('Tool') || type.includes('Utility')) return <Zap className="h-5 w-5" />;
    if (type.includes('Risk')) return <Shield className="h-5 w-5" />;
    return <TrendingUp className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Our Trading Solutions</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Professional algorithmic trading solutions designed for institutional investors and serious traders.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
              <span className="text-error-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span>Ready-Made Products</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'custom'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Custom Bot Development</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    {getTypeIcon(product.type)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-primary-600/20">
                      {getTypeIcon(product.type)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-neutral-600">{product.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {product.price === 0 ? 'Free' : `$${product.price.toLocaleString()}`}
                      </div>
                      {product.price > 0 && (
                        <div className="text-xs text-neutral-500">one-time</div>
                      )}
                    </div>
                  </div>

                  <p className="text-neutral-700 text-sm mb-4 leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-neutral-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-700">
                          <CheckCircle className="h-4 w-4 text-success-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {product.features.length > 3 && (
                      <p className="text-sm text-neutral-500 mt-2">+{product.features.length - 3} more features</p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/products/${product.id}`}
                    className="block w-full bg-primary-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors group"
                  >
                    <span className="flex items-center justify-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Bot Development Tab */}
        {activeTab === 'custom' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-primary-600 to-secondary-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <Wrench className="h-16 w-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Custom Bot Development</h2>
                    <p className="text-xl text-primary-100">Tailored algorithmic solutions for your specific needs</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Why Choose Custom Development?</h3>
                    <p className="text-neutral-700 mb-6 leading-relaxed">
                      Our expert team of quantitative developers and AI specialists can create bespoke trading algorithms 
                      tailored to your specific requirements, market focus, and risk parameters. Get a competitive edge 
                      with proprietary strategies designed exclusively for your trading objectives.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <Code className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900">Proprietary Algorithms</h4>
                          <p className="text-sm text-neutral-600">Unique strategies not available to competitors</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-secondary-100 p-2 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-secondary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900">Market-Specific Focus</h4>
                          <p className="text-sm text-neutral-600">Optimized for your preferred markets and timeframes</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-accent-100 p-2 rounded-lg">
                          <Shield className="h-5 w-5 text-accent-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900">Custom Risk Management</h4>
                          <p className="text-sm text-neutral-600">Risk parameters aligned with your tolerance</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-neutral-900 mb-2">Development Timeline</h4>
                      <div className="space-y-2 text-sm text-neutral-700">
                        <div className="flex justify-between">
                          <span>Requirements Analysis:</span>
                          <span className="font-medium">1-2 weeks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Algorithm Development:</span>
                          <span className="font-medium">4-8 weeks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Testing & Optimization:</span>
                          <span className="font-medium">2-4 weeks</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deployment & Training:</span>
                          <span className="font-medium">1 week</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">What's Included</h3>
                    <ul className="space-y-3 mb-8">
                      {customBotFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-success-600 mr-3 flex-shrink-0" />
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-neutral-900 mb-3">Pricing Structure</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-700">Basic Custom Bot:</span>
                          <span className="font-bold text-primary-600">$15,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-700">Advanced AI System:</span>
                          <span className="font-bold text-primary-600">$35,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-700">Enterprise Solution:</span>
                          <span className="font-bold text-primary-600">$75,000+</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 mt-3">
                        Final pricing depends on complexity and requirements
                      </p>
                    </div>

                    <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Request Custom Development</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Escrow Section */}
        <div className="mt-16 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl font-bold mb-4">Secure Escrow Service</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              All transactions are protected by our multi-signature escrow system. Your funds are held securely 
              until product delivery is confirmed, ensuring complete peace of mind for every purchase.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-4 mb-3">
                  <Shield className="h-8 w-8 mx-auto text-white" />
                </div>
                <h3 className="font-semibold mb-2">Multi-Sig Protection</h3>
                <p className="text-sm text-white/80">Advanced cryptographic security</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-4 mb-3">
                  <CheckCircle className="h-8 w-8 mx-auto text-white" />
                </div>
                <h3 className="font-semibold mb-2">12-Hour Review Period</h3>
                <p className="text-sm text-white/80">Test before funds are released</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-4 mb-3">
                  <Star className="h-8 w-8 mx-auto text-white" />
                </div>
                <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                <p className="text-sm text-white/80">Professional mediation available</p>
              </div>
            </div>
            <Link
              to="/auth"
              className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
            >
              Learn More About Security
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;