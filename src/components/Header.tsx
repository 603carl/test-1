import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ArrowLeft } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Market Analysis', path: '/market-analysis' },
    { name: 'News Analysis', path: '/news-analysis' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Career', path: '/career' },
    { name: 'Insights', path: '/insights' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const showBackButton = location.pathname !== '/';

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Back Button */}
          {showBackButton && (
            <Link
              to="/"
              className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors mr-4 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          )}

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src="https://ivory-capitalist-cockroach-275.mypinata.cloud/ipfs/bafkreiavl5es6ojh3gmxhhpowks5hjesbsdm6trxjuhgasvfvm3hlscysm"
                alt="Smart Algos Logo"
                className="h-16 w-16 object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
                onError={(e) => {
                  // Fallback to gradient background if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden h-16 w-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                <span className="text-white font-bold text-xl">SA</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Smart Algos</h1>
              <p className="text-xs text-neutral-600 font-semibold tracking-wide">INSTITUTIONAL HEDGE FUND</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-primary-600 ${
                  isActive(link.path) ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/auth"
              className="px-6 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200">
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-neutral-200 space-y-2">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/auth"
                  className="block px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;