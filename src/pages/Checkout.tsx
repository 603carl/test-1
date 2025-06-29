import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock, AlertCircle, CreditCard } from 'lucide-react';
import { SecurePaymentForm } from '../components/SecurePaymentForm';
import { useProducts } from '../hooks/useProducts';
import { useAuthContext } from '../contexts/AuthContext';
import { useInvestments } from '../hooks/useInvestments';
import { useTransactions } from '../hooks/useTransactions';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const { user } = useAuthContext();
  const { getProductById } = useProducts();
  const { createInvestment } = useInvestments();
  const { createTransaction } = useTransactions();

  // Get product from URL params or default to gold scalping bot
  const productId = searchParams.get('product') || 'gold-scalping-bot';
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-error-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Product Not Found</h1>
          <p className="text-neutral-600 mb-6">The product you're trying to purchase could not be found.</p>
          <Link
            to="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setProcessing(true);
    try {
      // For free products, create records manually
      if (product.price === 0) {
        await createTransaction(
          'investment',
          0,
          `Free access to ${product.name}`
        );
      }

      setPaymentSuccess(true);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      setPaymentError('Payment succeeded but failed to create records. Please contact support.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-success-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Payment Successful!</h1>
          <p className="text-neutral-600 mb-6">
            Thank you for your purchase of {product.name}. You will be redirected to your dashboard shortly.
          </p>
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
            <p className="text-success-800 text-sm">
              <strong>What's next?</strong><br />
              Check your email for setup instructions and download links.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/products/${productId}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Product Details
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900">Secure Checkout</h1>
          <p className="text-neutral-600 mt-2">Complete your purchase with bank-level security</p>
        </div>

        {/* Error Message */}
        {paymentError && (
          <div className="mb-8 bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
              <span className="text-error-800 text-sm">{paymentError}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-neutral-900">Payment Information</h2>
              </div>

              {product.price === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-success-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Free Product</h3>
                  <p className="text-neutral-600 mb-6">
                    This product is free! Click below to add it to your account.
                  </p>
                  <button
                    onClick={() => handlePaymentSuccess('free-product')}
                    disabled={processing}
                    className="bg-success-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-success-700 transition-colors disabled:opacity-50"
                  >
                    {processing ? 'Adding to Account...' : 'Add to Account'}
                  </button>
                </div>
              ) : (
                <SecurePaymentForm
                  amount={product.price}
                  productId={product.id}
                  productName={product.name}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Product Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Product:</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Type:</span>
                    <span className="font-medium">{product.type}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary-600">
                        {product.price === 0 ? 'Free' : `$${product.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Features */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {product.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{feature}</span>
                    </li>
                  ))}
                  {product.features.length > 6 && (
                    <li className="text-sm text-neutral-500 ml-8">
                      +{product.features.length - 6} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Enhanced Security Notice */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-6 w-6" />
                  <h3 className="font-semibold">Enterprise Security</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">PCI DSS Level 1 Compliance</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">AES-256 Bank-Level Encryption</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">Real-time Fraud Detection</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">Multi-Factor Authentication</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-primary-100">30-day Money-Back Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-neutral-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-neutral-900 mb-2">Need Help?</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Our security team is available 24/7 to assist with your purchase.
                </p>
                <a
                  href="mailto:security@smartalgos.com"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Contact Security Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;