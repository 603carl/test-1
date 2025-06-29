import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, DollarSign, Target, Clock, TrendingUp, User, BarChart } from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: '',
    investmentHistory: '',
    income: '',
    investmentGoal: '',
    timeline: '',
    investmentAmount: ''
  });

  const totalSteps = 6;

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPackageRecommendation = () => {
    const amount = parseInt(formData.investmentAmount.replace(/[^0-9]/g, ''));
    if (amount >= 10000) return 'Institutional';
    if (amount >= 1500) return 'Professional';
    return 'Starter';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Investment Experience</h2>
              <p className="text-neutral-600">Tell us about your experience with investments</p>
            </div>
            <div className="space-y-4">
              {[
                'New to investing',
                'Some experience with stocks/bonds',
                'Experienced with mutual funds',
                'Active trader (forex, crypto)',
                'Professional investor'
              ].map((exp) => (
                <button
                  key={exp}
                  onClick={() => handleInputChange('experience', exp)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    formData.experience === exp
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BarChart className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Investment History</h2>
              <p className="text-neutral-600">What types of investments have you made before?</p>
            </div>
            <div className="space-y-4">
              {[
                'Traditional savings accounts only',
                'Stocks and bonds',
                'Mutual funds and ETFs',
                'Cryptocurrency',
                'Forex trading',
                'Real estate investments',
                'Alternative investments (hedge funds, private equity)'
              ].map((history) => (
                <button
                  key={history}
                  onClick={() => handleInputChange('investmentHistory', history)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    formData.investmentHistory === history
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {history}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Annual Income</h2>
              <p className="text-neutral-600">What's your approximate annual income?</p>
            </div>
            <div className="space-y-4">
              {[
                'Under $50,000',
                '$50,000 - $100,000',
                '$100,000 - $250,000',
                '$250,000 - $500,000',
                'Over $500,000'
              ].map((income) => (
                <button
                  key={income}
                  onClick={() => handleInputChange('income', income)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    formData.income === income
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {income}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Investment Goals</h2>
              <p className="text-neutral-600">What are your primary investment objectives?</p>
            </div>
            <div className="space-y-4">
              {[
                'Capital Preservation',
                'Steady Income Generation',
                'Moderate Growth',
                'Aggressive Growth',
                'Portfolio Diversification'
              ].map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleInputChange('investmentGoal', goal)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    formData.investmentGoal === goal
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Investment Timeline</h2>
              <p className="text-neutral-600">How long do you plan to invest?</p>
            </div>
            <div className="space-y-4">
              {[
                '3-5 months',
                '5-9 months',
                '9-12 months',
                '1-2 years',
                '2+ years'
              ].map((timeline) => (
                <button
                  key={timeline}
                  onClick={() => handleInputChange('timeline', timeline)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    formData.timeline === timeline
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {timeline}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Investment Amount</h2>
              <p className="text-neutral-600">How much would you like to invest with Smart Algos?</p>
            </div>
            <div className="space-y-4">
              {['$500 - $1,000', '$1,500 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleInputChange('investmentAmount', amount)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    formData.investmentAmount === amount
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = () => {
    const values = Object.values(formData);
    return values[currentStep - 1] && values[currentStep - 1] !== '';
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-neutral-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
          {currentStep < totalSteps ? (
            <>
              {renderStep()}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'text-neutral-400 cursor-not-allowed'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>

                <button
                  onClick={nextStep}
                  disabled={!isStepComplete()}
                  className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                    isStepComplete()
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </>
          ) : (
            /* Recommendation Page */
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-success-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Perfect Match Found!</h2>
                <p className="text-neutral-600">Based on your profile, we recommend:</p>
              </div>
              
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">
                    {getPackageRecommendation()} Package
                  </h3>
                  <p className="text-primary-700 mb-4">
                    Tailored for your experience level and investment goals
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-neutral-900">
                        {formData.investmentAmount}
                      </div>
                      <div className="text-sm text-neutral-600">Investment Amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-neutral-900">
                        {formData.timeline}
                      </div>
                      <div className="text-sm text-neutral-600">Timeline</div>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Proceed to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Back to Previous Step */}
              <div className="flex justify-center">
                <button
                  onClick={prevStep}
                  className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to modify answers
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Need help? Contact our team at{' '}
            <a href="mailto:support@smartalgos.com" className="text-primary-600 hover:text-primary-700">
              support@smartalgos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;