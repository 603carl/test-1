import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const RunningPrices = () => {
  const [prices, setPrices] = useState([
    { symbol: 'EUR/USD', price: 1.0847, change: 0.0023, changePercent: 0.21 },
    { symbol: 'GBP/USD', price: 1.2634, change: -0.0045, changePercent: -0.35 },
    { symbol: 'USD/JPY', price: 149.67, change: 0.34, changePercent: 0.23 },
    { symbol: 'AUD/USD', price: 0.6789, change: 0.0012, changePercent: 0.18 },
    { symbol: 'USD/CAD', price: 1.3521, change: -0.0018, changePercent: -0.13 },
    { symbol: 'USD/CHF', price: 0.8934, change: 0.0009, changePercent: 0.10 },
    { symbol: 'NZD/USD', price: 0.6234, change: -0.0034, changePercent: -0.54 },
    { symbol: 'GOLD', price: 2034.50, change: 12.30, changePercent: 0.61 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => ({
          ...price,
          price: price.price + (Math.random() - 0.5) * 0.01,
          change: (Math.random() - 0.5) * 0.01,
          changePercent: (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-900 text-white py-2 overflow-hidden">
      <div className="animate-scroll">
        <div className="flex space-x-8 whitespace-nowrap">
          {prices.concat(prices).map((item, index) => (
            <div key={index} className="flex items-center space-x-2 px-4">
              <span className="font-medium text-sm">{item.symbol}</span>
              <span className="text-sm">{item.price.toFixed(item.symbol === 'GOLD' ? 2 : 4)}</span>
              <div className={`flex items-center space-x-1 ${
                item.change >= 0 ? 'text-success-500' : 'text-error-500'
              }`}>
                {item.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-xs">{item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RunningPrices;