import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Smart Algos AI assistant. I can help you with information about our products, services, and investment packages. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const knowledgeBase = {
    products: {
      keywords: ['product', 'bot',  'trading', 'algorithm', 'gold', 'scanner', 'calculator'],
      response: "We offer several trading products:\n\n• Gold Scalping Bot ($2,999) - Advanced AI-powered scalping for gold trading\n• Multi-Timeframe Market Scanner ($499) - Comprehensive market analysis tool\n• Advanced Lot Size Calculator (Free) - Professional risk management tool\n• Economic News Analyzer ($799) - AI-driven news analysis with predictions\n• Neural Network Trader Pro ($4,999) - Advanced deep learning trading system\n\nWould you like more details about any specific product?"
    },
    packages: {
      keywords: ['package', 'investment', 'starter', 'professional', 'institutional', 'pricing'],
      response: "We offer three investment packages:\n\n• Starter Package: $500-$1,000 (3-5 months)\n  - Gold Scalping Bot, Basic Analysis, Email Support\n\n• Professional Package: $1,500-$10,000 (5-9 months)\n  - Multi-Currency Bots, Advanced Analytics, Priority Support\n\n• Institutional Package: $10,000-$25,000 (6-12 months)\n  - Custom Algorithms, Dedicated Manager, 24/7 Support\n\nWhich package interests you most?"
    },
    performance: {
      keywords: ['performance', 'return', 'profit', 'results', 'track record'],
      response: "Our track record speaks for itself:\n\n• 127% average annual return\n• 95.3% win rate on our Gold Scalping Bot\n• 4.2% maximum drawdown\n• $2.3B in assets under management\n• 99.7% system uptime reliability\n\nAll performance metrics are audited and transparent. Would you like to see detailed performance reports?"
    },
    company: {
      keywords: ['company', 'about', 'team', 'history', 'founded'],
      response: "Smart Algos is an institutional hedge fund founded in 2009, specializing in algorithmic trading:\n\n• 15+ years of experience in quantitative finance\n• Serving 1,200+ institutional clients globally\n• Operating in 50+ markets worldwide\n• SEC registered and BBB A+ rated\n• Led by experienced professionals from Goldman Sachs, Citadel, and JPMorgan\n\nWe're committed to sustainable growth and social responsibility."
    },
    security: {
      keywords: ['security', 'safe', 'trust', 'regulation', 'escrow'],
      response: "Security and trust are our top priorities:\n\n• SEC registered and fully compliant\n• BBB A+ rating from Better Business Bureau\n• Multi-signature escrow protection for all transactions\n• Bank-level encryption for all data\n• Institutional-grade security measures\n• Transparent audited performance metrics\n\nYour investments are protected by comprehensive insurance and regulatory oversight."
    },
    support: {
      keywords: ['support', 'help', 'contact', 'assistance'],
      response: "We provide comprehensive support:\n\n• 24/7 customer support for institutional clients\n• Dedicated account managers for premium packages\n• Email support: support@smartalgos.com\n• Phone: +1 (555) 123-4567\n• Live chat available during business hours\n• Comprehensive documentation and tutorials\n\nHow can I help you get started?"
    }
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return data.response;
      }
    }

    // Default responses for common queries
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! Welcome to Smart Algos. I'm here to help you learn about our algorithmic trading solutions. What would you like to know?";
    }

    if (input.includes('price') || input.includes('cost')) {
      return "Our pricing varies by package:\n\n• Products: $499-$4,999 (one-time)\n• Investment packages: $500-$25,000\n• Free tools available\n\nWhat specific pricing information do you need?";
    }

    if (input.includes('start') || input.includes('begin')) {
      return "Getting started is easy:\n\n1. Choose your investment package\n2. Complete our onboarding process\n3. Fund your account securely\n4. Start earning with our AI algorithms\n\nWould you like to begin the onboarding process?";
    }

    return "I'd be happy to help! I can provide information about:\n\n• Our trading products and algorithms\n• Investment packages and pricing\n• Company background and performance\n• Security and regulatory compliance\n• Getting started process\n\nWhat specific topic interests you?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: generateResponse(inputText),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-neutral-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Smart Algos AI</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'bg-primary-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <Bot className="h-4 w-4 mt-0.5 text-primary-600 flex-shrink-0" />
                    )}
                    {!message.isBot && (
                      <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                    )}
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Smart Algos..."
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;