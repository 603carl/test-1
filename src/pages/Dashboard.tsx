import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Plus, Eye, Download, AlertCircle } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useInvestments } from '../hooks/useInvestments';
import { useTransactions } from '../hooks/useTransactions';
import { SecurityDashboard } from '../components/SecurityDashboard';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthContext();
  const { investments, loading: investmentsLoading, error: investmentsError } = useInvestments();
  const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions();

  const portfolioData = {
    totalValue: investments.reduce((sum, inv) => sum + inv.current_value, 0),
    totalInvested: investments.reduce((sum, inv) => sum + inv.amount, 0),
    dailyChange: 234.67,
    dailyChangePercentage: 1.86
  };

  const totalGain = portfolioData.totalValue - portfolioData.totalInvested;
  const gainPercentage = portfolioData.totalInvested > 0 ? (totalGain / portfolioData.totalInvested) * 100 : 0;

  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y'];
  const tabs = [
    { id: 'overview', label: 'Portfolio Overview' },
    { id: 'security', label: 'Security Center' },
  ];

  if (investmentsLoading || transactionsLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {user?.user_metadata?.first_name || 'Investor'}!
          </h1>
          <p className="text-neutral-600">Monitor your investment packages and track performance in real-time.</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Error Messages */}
            {(investmentsError || transactionsError) && (
              <div className="mb-6 bg-error-50 border border-error-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
                  <span className="text-error-800 text-sm">
                    {investmentsError || transactionsError}
                  </span>
                </div>
              </div>
            )}

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-neutral-600">Total Portfolio Value</h3>
                  <DollarSign className="h-5 w-5 text-neutral-400" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  ${portfolioData.totalValue.toLocaleString()}
                </div>
                <div className="flex items-center text-sm">
                  {totalGain >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-success-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-error-600 mr-1" />
                  )}
                  <span className={`font-medium ${totalGain >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString()} ({gainPercentage.toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-neutral-600">Today's Change</h3>
                  <TrendingUp className="h-5 w-5 text-success-600" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  +${portfolioData.dailyChange.toLocaleString()}
                </div>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-success-600 mr-1" />
                  <span className="text-success-600 font-medium">
                    +{portfolioData.dailyChangePercentage}%
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-neutral-600">Active Packages</h3>
                  <div className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">{investments.length}</div>
                <div className="text-sm text-neutral-600">
                  {investments.length > 0 ? 'All performing well' : 'No active investments'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-neutral-600">Total Invested</h3>
                  <Plus className="h-5 w-5 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  ${portfolioData.totalInvested.toLocaleString()}
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Add investment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Performance Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900">Performance Chart</h2>
                    <div className="flex space-x-2">
                      {periods.map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            selectedPeriod === period
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-success-600 mx-auto mb-4" />
                      <p className="text-neutral-600">Interactive chart showing portfolio performance</p>
                      <p className="text-sm text-neutral-500 mt-2">
                        {gainPercentage >= 0 ? '+' : ''}{gainPercentage.toFixed(2)}% overall growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                      <Plus className="h-4 w-4" />
                      <span>Add Investment</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 bg-secondary-600 text-white py-3 px-4 rounded-lg hover:bg-secondary-700 transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>Withdraw Funds</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 bg-neutral-100 text-neutral-700 py-3 px-4 rounded-lg hover:bg-neutral-200 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Portfolio Health</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Risk Level:</span>
                      <span className="font-medium">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Diversification:</span>
                      <span className="font-medium">
                        {investments.length > 1 ? 'Good' : 'Limited'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Performance:</span>
                      <span className="font-medium">
                        {gainPercentage > 10 ? 'Excellent' : gainPercentage > 0 ? 'Good' : 'Needs Attention'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investments & Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Active Investment Packages */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Active Investment Packages</h2>
                {investments.length > 0 ? (
                  <div className="space-y-4">
                    {investments.map((investment) => {
                      const gain = investment.current_value - investment.amount;
                      const gainPercentage = (gain / investment.amount) * 100;
                      
                      return (
                        <div key={investment.id} className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-medium text-neutral-900">{investment.package_name}</h3>
                              <p className="text-sm text-neutral-600">Investment Package</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              investment.status === 'active' ? 'bg-success-100 text-success-800' :
                              investment.status === 'paused' ? 'bg-warning-100 text-warning-800' :
                              'bg-neutral-100 text-neutral-800'
                            }`}>
                              {investment.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-neutral-600">Initial Investment</p>
                              <p className="font-medium">${investment.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-neutral-600">Current Value</p>
                              <p className="font-medium">${investment.current_value.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-neutral-600">Total Gain</p>
                              <p className={`font-medium ${gain >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                                {gain >= 0 ? '+' : ''}${gain.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-neutral-600">Return</p>
                              <p className={`font-medium ${gainPercentage >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                                {gainPercentage >= 0 ? '+' : ''}{gainPercentage.toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <button className="mt-3 flex items-center text-primary-600 hover:text-primary-700 text-sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600 mb-4">No active investments yet</p>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Start Investing
                    </button>
                  </div>
                )}
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Recent Transactions</h2>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 ? 'bg-success-100' : 'bg-neutral-100'
                          }`}>
                            {transaction.amount > 0 ? (
                              <ArrowUpRight className="h-4 w-4 text-success-600" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-neutral-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 text-sm">{transaction.description}</p>
                            <p className="text-xs text-neutral-500">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            transaction.amount > 0 ? 'text-success-600' : 'text-neutral-900'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <p className="text-xs text-neutral-500">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ArrowUpRight className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600">No transactions yet</p>
                  </div>
                )}
                {transactions.length > 5 && (
                  <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All Transactions
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'security' && <SecurityDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;