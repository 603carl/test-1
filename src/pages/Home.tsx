import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, Brain, CheckCircle, Star, Award, Users, Globe } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Neural network algorithms analyze market patterns and predict currency movements with high accuracy.'
    },
    {
      icon: Zap,
      title: 'Real-Time Execution',
      description: 'Lightning-fast trade execution with minimal latency for optimal entry and exit points.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Advanced risk management protocols protect capital while maximizing returns.'
    },
    {
      icon: TrendingUp,
      title: 'Proven Performance',
      description: 'Consistent returns backed by transparent performance metrics and audited results.'
    }
  ];

  const packages = [
    {
      name: 'Starter',
      range: '$500 - $1,000',
      duration: '3-5 months',
      features: ['Gold Scalping Bot', 'Basic Market Analysis', 'Email Support', 'Monthly Reports'],
      popular: false
    },
    {
      name: 'Professional',
      range: '$1,500 - $10,000',
      duration: '5-9 months',
      features: ['Multi-Currency Bots', 'Advanced Analytics', 'Priority Support', 'Weekly Reports', 'Risk Management Tools'],
      popular: true
    },
    {
      name: 'Institutional',
      range: '$10,000 - $25,000',
      duration: '6-12 months',
      features: ['Custom Algorithms', 'Dedicated Manager', '24/7 Support', 'Daily Reports', 'Custom Risk Parameters', 'API Access'],
      popular: false
    }
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: 'SEC Registered',
      description: 'Fully compliant with regulatory requirements'
    },
    {
      icon: Award,
      title: 'BBB A+ Rating',
      description: 'Better Business Bureau accredited'
    },
    {
      icon: Users,
      title: '1,200+ Clients',
      description: 'Trusted by institutional investors'
    },
    {
      icon: Globe,
      title: 'Global Presence',
      description: 'Operating in 25+ countries'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="animate-slide-up">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white font-black tracking-tight" style={{ fontWeight: 900 }}>Algorithmic Trading</span>
                  <span className="text-white font-black tracking-tight" style={{ fontWeight: 900 }}> Redefined</span>
                </h1>
                <p className="text-xl text-neutral-300 mt-6 leading-relaxed">
                  Harness the power of neural networks and AI-driven market analysis to maximize your forex investments with institutional-grade algorithmic trading solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all hover:scale-105 group shadow-lg"
                >
                  Explore Our Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-accent-400 text-accent-400 font-semibold rounded-lg hover:bg-accent-400 hover:text-neutral-900 transition-all hover:scale-105"
                >
                  Start Investing Now
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-700 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div>
                  <div className="text-3xl font-bold text-accent-400">127%</div>
                  <div className="text-sm text-neutral-400">Avg. Annual Return</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-400">$2.3B</div>
                  <div className="text-sm text-neutral-400">Assets Under Management</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-400">99.7%</div>
                  <div className="text-sm text-neutral-400">Uptime Reliability</div>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="bg-gradient-to-br from-primary-600/20 to-secondary-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                {/* Neural Network Visualization */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Neural Trading Engine</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-neutral-300">Live</span>
                    </div>
                  </div>

                  {/* Advanced Neural Network Visualization */}
                  <div className="relative h-56 bg-gradient-to-br from-neutral-900/80 to-primary-900/60 rounded-xl p-6 overflow-hidden">
                    {/* Background Network Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full">
                        <defs>
                          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                          </radialGradient>
                          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
                          </linearGradient>
                        </defs>
                        
                        {/* Connection Lines */}
                        <g stroke="url(#connectionGradient)" strokeWidth="1" fill="none">
                          <line x1="15%" y1="20%" x2="85%" y2="30%" opacity="0.6">
                            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                          </line>
                          <line x1="15%" y1="40%" x2="85%" y2="50%" opacity="0.5">
                            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
                          </line>
                          <line x1="15%" y1="60%" x2="85%" y2="70%" opacity="0.7">
                            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
                          </line>
                          <line x1="15%" y1="80%" x2="85%" y2="40%" opacity="0.4">
                            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
                          </line>
                        </g>
                      </svg>
                    </div>

                    {/* Central Brain/AI Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Outer Ring */}
                        <div className="w-20 h-20 border-2 border-success-400/50 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-success-400 rounded-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-primary-400 rounded-full"></div>
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-accent-400 rounded-full"></div>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-secondary-400 rounded-full"></div>
                        </div>
                        
                        {/* Inner Circle with Brain Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-success-400 to-primary-600 rounded-full flex items-center justify-center">
                            <Brain className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Pulsing Rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 border border-success-400/30 rounded-full animate-ping"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 border border-primary-400/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Data Nodes */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-success-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-8 right-6 w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-1/2 left-2 w-2 h-2 bg-success-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/3 right-2 w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
                  </div>

                  {/* Real-time Data - Maintaining Current Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-neutral-300 text-xs">Market Signals</div>
                      <div className="text-success-400 font-semibold">87 Bullish</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-neutral-300 text-xs">Accuracy</div>
                      <div className="text-accent-400 font-semibold">94.7%</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-neutral-300 text-xs">Active Trades</div>
                      <div className="text-primary-400 font-semibold">1,247</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-neutral-300 text-xs">Today's P&L</div>
                      <div className="text-success-400 font-semibold">+$12,847</div>
                    </div>
                  </div>

                  {/* Processing Indicator */}
                  <div className="flex items-center justify-center space-x-2 text-xs text-neutral-400">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-primary-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>Processing 2.3M data points/sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Trusted by Institutions Worldwide</h2>
            <p className="text-neutral-600">Regulated, accredited, and committed to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <indicator.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{indicator.title}</h3>
                <p className="text-sm text-neutral-600">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Smart Algos?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our cutting-edge technology and proven strategies deliver consistent results for institutional investors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-neutral-200"
              >
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Packages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Investment Packages
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Choose the package that best fits your investment goals and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 ${
                  pkg.popular
                    ? 'border-primary-600 bg-white shadow-lg scale-105'
                    : 'border-neutral-200 bg-white hover:border-primary-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-1">{pkg.range}</div>
                  <div className="text-neutral-600">{pkg.duration}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success-600 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/onboarding"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability & Responsibility */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Commitment</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Sustainable growth, social responsibility, and systemic risk control are at the core of our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="bg-success-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Sustainable Growth</h3>
              <p className="text-neutral-600 leading-relaxed">
                We prioritize long-term sustainable returns over short-term gains, ensuring our strategies 
                contribute to market stability and client wealth preservation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Social Responsibility</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our ESG-compliant investment strategies support sustainable businesses while delivering 
                superior returns for our clients and positive impact for society.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
              <div className="bg-error-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-error-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Systemic Risk Control</h3>
              <p className="text-neutral-600 leading-relaxed">
                Advanced risk management protocols and stress testing ensure our operations contribute 
                to financial system stability rather than systemic risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Investment Strategy?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join institutional investors who trust Smart Algos for their algorithmic trading needs. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:scale-105 shadow-lg"
            >
              Start Investing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;