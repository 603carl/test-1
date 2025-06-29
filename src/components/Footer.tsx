import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="https://ivory-capitalist-cockroach-275.mypinata.cloud/ipfs/bafkreiavl5es6ojh3gmxhhpowks5hjesbsdm6trxjuhgasvfvm3hlscysm"
                  alt="Smart Algos Logo"
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    // Fallback to gradient background if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden h-12 w-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg items-center justify-center">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Smart Algos</h3>
                <p className="text-xs text-neutral-400">Institutional Hedge Fund</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Advanced algorithmic trading solutions powered by neural networks and AI-driven market analysis for institutional investors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/market-analysis" className="text-sm hover:text-primary-400 transition-colors">Market Analysis</Link></li>
              <li><Link to="/news-analysis" className="text-sm hover:text-primary-400 transition-colors">News Analysis</Link></li>
              <li><Link to="/products" className="text-sm hover:text-primary-400 transition-colors">Trading Products</Link></li>
              <li><Link to="/dashboard" className="text-sm hover:text-primary-400 transition-colors">Client Dashboard</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/career" className="text-sm hover:text-primary-400 transition-colors">Careers</Link></li>
              <li><Link to="/insights" className="text-sm hover:text-primary-400 transition-colors">Insights</Link></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Legal</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-sm">contact@smartalgos.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-400">
            © {currentYear} Smart Algos. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;