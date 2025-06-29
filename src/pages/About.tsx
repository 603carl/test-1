import React from 'react';
import { TrendingUp, Users, Award, Globe, Brain, Shield, Zap, Target, Leaf, Heart, Scale } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Assets Under Management', value: '$2.3B', icon: TrendingUp },
    { label: 'Active Clients', value: '1,200+', icon: Users },
    { label: 'Years of Experience', value: '15+', icon: Award },
    { label: 'Global Markets', value: '50+', icon: Globe }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI and machine learning to stay ahead of market trends and deliver superior results.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Implementing institutional-grade security measures to protect client assets and ensure operational integrity.'
    },
    {
      icon: Target,
      title: 'Performance',
      description: 'Maintaining a relentless focus on generating consistent, risk-adjusted returns for our institutional clients.'
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Optimizing every aspect of our operations to deliver faster execution and better outcomes.'
    }
  ];

  const commitments = [
    {
      icon: Leaf,
      title: 'Sustainable Growth',
      description: 'We prioritize long-term sustainable returns over short-term gains, ensuring our strategies contribute to market stability and client wealth preservation.',
      color: 'success'
    },
    {
      icon: Heart,
      title: 'Social Responsibility',
      description: 'Our ESG-compliant investment strategies support sustainable businesses while delivering superior returns and positive societal impact.',
      color: 'primary'
    },
    {
      icon: Scale,
      title: 'Systemic Risk Control',
      description: 'Advanced risk management protocols and stress testing ensure our operations contribute to financial system stability.',
      color: 'error'
    }
  ];

  const team = [
    {
      name: 'Michael Chen',
      role: 'Chief Executive Officer',
      experience: '20+ years in quantitative finance',
      background: 'Former Goldman Sachs Managing Director',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Chief Technology Officer',
      experience: '15+ years in algorithmic trading',
      background: 'Former head of quant development at Citadel',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kim',
      role: 'Head of Risk Management',
      experience: '18+ years in risk analytics',
      background: 'Former JPMorgan Chase VP of Risk',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Elena Kowalski',
      role: 'Head of Research',
      experience: '12+ years in market research',
      background: 'Former Deutsche Bank Senior Analyst',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Smart Algos founded with focus on forex algorithmic trading' },
    { year: '2012', event: 'First neural network trading system deployed successfully' },
    { year: '2015', event: 'Reached $100M in assets under management' },
    { year: '2018', event: 'Expanded to serve institutional clients globally' },
    { year: '2021', event: 'Launched AI-powered risk management platform' },
    { year: '2024', event: 'Surpassed $2B AUM with industry-leading performance' }
  ];

  const getCommitmentColor = (color: string) => {
    switch (color) {
      case 'success': return 'bg-success-100 text-success-600';
      case 'primary': return 'bg-primary-100 text-primary-600';
      case 'error': return 'bg-error-100 text-error-600';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Pioneering the Future of
              <span className="text-white font-black tracking-tight block" style={{ fontWeight: 900 }}>Algorithmic Trading</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Since 2009, Smart Algos has been at the forefront of quantitative finance, developing sophisticated 
              AI-driven trading systems that deliver consistent returns for institutional investors worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                We believe that advanced technology should democratize access to sophisticated investment strategies. 
                Our mission is to develop and deploy institutional-grade algorithmic trading systems that consistently 
                outperform traditional investment approaches while managing risk with precision.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                Through continuous innovation in artificial intelligence, machine learning, and quantitative analysis, 
                we're building the next generation of investment tools that adapt to changing market conditions and 
                deliver superior risk-adjusted returns.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">127%</div>
                  <div className="text-sm text-neutral-600">Average Annual Return</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-600 mb-1">4.2%</div>
                  <div className="text-sm text-neutral-600">Maximum Drawdown</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600/20 to-secondary-600/20 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8">
                <img
                  src="https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Trading Technology"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we develop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Commitments</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Sustainable growth, social responsibility, and systemic risk control are at the core of our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${getCommitmentColor(commitment.color)}`}>
                  <commitment.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{commitment.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Meet the experienced professionals driving innovation in algorithmic trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-200 p-6 text-center hover:shadow-md transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-neutral-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-neutral-600 mb-1">{member.experience}</p>
                <p className="text-sm text-neutral-500">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Journey</h2>
            <p className="text-xl text-neutral-600">
              Key milestones in our evolution as a leading algorithmic trading firm.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                    <p className="text-neutral-700 leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join institutional investors who trust Smart Algos for superior risk-adjusted returns 
            and cutting-edge algorithmic trading solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
              Schedule a Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Our Prospectus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;