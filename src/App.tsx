import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SecurityProvider } from './components/SecurityProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import MarketAnalysis from './pages/MarketAnalysis';
import NewsAnalysis from './pages/NewsAnalysis';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Career from './pages/Career';
import Insights from './pages/Insights';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import RunningPrices from './components/RunningPrices';

function App() {
  return (
    <AuthProvider>
      <SecurityProvider>
        <Router>
          <div className="min-h-screen bg-neutral-50">
            <Header />
            <RunningPrices />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/market-analysis" element={<MarketAnalysis />} />
                <Route path="/news-analysis" element={<NewsAnalysis />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/career" element={<Career />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <AIAssistant />
          </div>
        </Router>
      </SecurityProvider>
    </AuthProvider>
  );
}

export default App;