import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, TrendingUp, Award, Search, Filter, ArrowLeft } from 'lucide-react';

const Career = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const positions = [
    {
      title: 'Senior Quantitative Trader',
      department: 'Trading',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$200K - $350K',
      description: 'Lead algorithmic trading strategies and develop high-frequency trading systems for forex markets.',
      requirements: [
        'Advanced degree in Mathematics, Physics, or Computer Science',
        '5+ years of quantitative trading experience',
        'Proficiency in Python, C++, and statistical modeling',
        'Experience with machine learning and AI algorithms',
        'Strong understanding of forex markets and derivatives'
      ],
      posted: '2 days ago'
    },
    {
      title: 'Portfolio Manager',
      department: 'Investment Management',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '7+ years',
      salary: '$250K - $400K',
      description: 'Manage institutional client portfolios and develop investment strategies aligned with risk parameters.',
      requirements: [
        'CFA designation required',
        '7+ years of portfolio management experience',
        'Strong track record in alternative investments',
        'Experience with institutional clients',
        'Excellent communication and presentation skills'
      ],
      posted: '1 week ago'
    },
    {
      title: 'Machine Learning Engineer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$150K - $250K',
      description: 'Develop and deploy ML models for market prediction and algorithmic trading systems.',
      requirements: [
        'MS/PhD in Computer Science or related field',
        '3+ years of ML engineering experience',
        'Expertise in TensorFlow, PyTorch, and cloud platforms',
        'Experience with time series analysis and financial data',
        'Strong software engineering fundamentals'
      ],
      posted: '3 days ago'
    },
    {
      title: 'Risk Analyst',
      department: 'Risk Management',
      location: 'London, UK',
      type: 'Full-time',
      experience: '4+ years',
      salary: '£80K - £120K',
      description: 'Monitor and analyze portfolio risk metrics, develop risk models and stress testing frameworks.',
      requirements: [
        'Degree in Finance, Economics, or Mathematics',
        '4+ years of risk management experience',
        'Proficiency in VaR, stress testing, and risk metrics',
        'Experience with regulatory frameworks (Basel III, MiFID II)',
        'Strong analytical and problem-solving skills'
      ],
      posted: '5 days ago'
    },
    {
      title: 'Quantitative Researcher',
      department: 'Research',
      location: 'Singapore',
      type: 'Full-time',
      experience: '2+ years',
      salary: 'S$120K - S$180K',
      description: 'Research and develop new trading strategies, conduct market microstructure analysis.',
      requirements: [
        'PhD in Quantitative Finance, Mathematics, or Physics',
        '2+ years of quantitative research experience',
        'Strong programming skills in R, Python, or MATLAB',
        'Experience with statistical modeling and backtesting',
        'Published research in quantitative finance preferred'
      ],
      posted: '1 week ago'
    },
    {
      title: 'DevOps Engineer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      salary: '$130K - $200K',
      description: 'Maintain and scale trading infrastructure, ensure high availability and low latency systems.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '4+ years of DevOps/Infrastructure experience',
        'Expertise in AWS, Kubernetes, and containerization',
        'Experience with high-frequency trading systems',
        'Strong understanding of network optimization and security'
      ],
      posted: '4 days ago'
    }
  ];

  const departments = ['All', 'Trading', 'Investment Management', 'Technology', 'Risk Management', 'Research'];
  const locations = ['All', 'New York, NY', 'London, UK', 'Singapore', 'Remote'];

  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || position.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || position.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Industry-leading salaries with performance-based bonuses and equity participation.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths with mentorship programs and continuous learning opportunities.'
    },
    {
      icon: Award,
      title: 'Recognition Programs',
      description: 'Regular recognition for outstanding performance and innovative contributions.'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with world-class professionals in a supportive and inclusive environment.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Join the Future of
              <span className="text-white font-black tracking-tight block" style={{ fontWeight: 900 }}>Algorithmic Trading</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed mb-8">
              Build your career with industry leaders in quantitative finance. We're looking for exceptional talent 
              to help shape the future of institutional trading and investment management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">150+</div>
                <div className="text-neutral-300">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400 mb-2">25+</div>
                <div className="text-neutral-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">$2.3B</div>
                <div className="text-neutral-300">Assets Under Management</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Work at Smart Algos?</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We offer more than just a job – we provide a platform for exceptional professionals to excel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Open Positions</h2>
            <p className="text-xl text-neutral-600">
              Discover opportunities to make an impact in quantitative finance.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <button className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredPositions.map((position, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{position.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-neutral-600">
                          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
                            {position.department}
                          </span>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">{position.salary}</div>
                        <div className="text-sm text-neutral-500">{position.experience}</div>
                      </div>
                    </div>

                    <p className="text-neutral-700 mb-4 leading-relaxed">{position.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-neutral-900 mb-2">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {position.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="text-sm text-neutral-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                      {position.requirements.length > 3 && (
                        <p className="text-sm text-neutral-500 mt-2">
                          +{position.requirements.length - 3} more requirements
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">Posted {position.posted}</span>
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No positions match your search criteria.</p>
              <p className="text-neutral-500 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Don't See the Right Role?</h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            We're always looking for exceptional talent. Send us your resume and let us know how you can contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
              Submit General Application
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact HR Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;