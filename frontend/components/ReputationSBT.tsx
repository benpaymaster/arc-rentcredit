"use client";

import { useState, useEffect } from 'react';
import { Award, TrendingUp, MapPin, Calendar, Star } from 'lucide-react';

interface ReputationSBTProps {
  userAddress?: string;
  score?: number;
  rentals?: number;
  countries?: string[];
  successRate?: number;
  usdcVolume?: number;
  eurcVolume?: number;
}

export default function ReputationSBT({
  userAddress = "0x742d35Cc6634C0532925a3b8D0F62292C4e5B74e",
  score = 847,
  rentals = 12,
  countries = ["USA", "Canada", "Singapore"],
  successRate = 98,
  usdcVolume = 47500,
  eurcVolume = 12300
}: ReputationSBTProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(score);

  const isMultiToken = usdcVolume > 0 && eurcVolume > 0;
  const totalVolume = usdcVolume + eurcVolume;
  
  // Calculate tier based on score
  const getTier = (score: number) => {
    if (score >= 900) return { name: "Diamond", color: "from-blue-400 to-purple-600", icon: "💎" };
    if (score >= 800) return { name: "Platinum", color: "from-gray-300 to-gray-500", icon: "🏆" };
    if (score >= 700) return { name: "Gold", color: "from-yellow-300 to-yellow-600", icon: "🥇" };
    if (score >= 600) return { name: "Silver", color: "from-gray-200 to-gray-400", icon: "🥈" };
    return { name: "Bronze", color: "from-orange-300 to-orange-600", icon: "🥉" };
  };

  const tier = getTier(displayScore);

  // Animate score changes
  useEffect(() => {
    if (score !== displayScore) {
      setIsAnimating(true);
      const increment = score > displayScore ? 1 : -1;
      const interval = setInterval(() => {
        setDisplayScore(prev => {
          if ((increment > 0 && prev >= score) || (increment < 0 && prev <= score)) {
            clearInterval(interval);
            setIsAnimating(false);
            return score;
          }
          return prev + increment;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [score, displayScore]);

  // Generate dynamic SVG NFT
  const generateSVG = () => {
    return `
      <svg width="400" height="600" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="tierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#${tier.color.includes('blue') ? '3b82f6' : tier.color.includes('yellow') ? 'fbbf24' : '6b7280'};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#${tier.color.includes('purple') ? '8b5cf6' : tier.color.includes('orange') ? 'f97316' : '374151'};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="600" fill="url(#grad)" rx="20"/>
        
        <!-- Header -->
        <text x="200" y="60" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">RentCredit Reputation</text>
        <text x="200" y="90" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">Reputation Score</text>
        
        <!-- Score Circle -->
        <circle cx="200" cy="180" r="80" fill="none" stroke="white" stroke-width="4"/>
        <text x="200" y="195" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${displayScore}</text>
        <text x="200" y="220" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">${tier.name}</text>
        
        <!-- Stats -->
        <text x="50" y="320" font-family="Arial, sans-serif" font-size="14" fill="white">Total Rentals: ${rentals}</text>
        <text x="50" y="350" font-family="Arial, sans-serif" font-size="14" fill="white">Success Rate: ${successRate}%</text>
        <text x="50" y="380" font-family="Arial, sans-serif" font-size="14" fill="white">Countries: ${countries.length}</text>
        <text x="50" y="410" font-family="Arial, sans-serif" font-size="14" fill="white">Total Value: $${totalVolume.toLocaleString()}</text>
        
        <!-- Multi-token indicator -->
        ${isMultiToken ? `<text x="200" y="480" font-family="Arial, sans-serif" font-size="14" fill="#fbbf24" text-anchor="middle">Multi-Stablecoin User ⭐</text>` : ''}
        
        <!-- Footer -->
        <text x="200" y="550" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">Soulbound - Non-transferable</text>
        <text x="200" y="570" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">CrossRent Protocol</text>
      </svg>
    `;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* NFT Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="mr-2 text-yellow-500" size={24} />
            Reputation SBT
          </h3>
          
          <div className="text-center">
            <div 
              className="mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg"
              style={{ width: '280px', height: '420px' }}
              dangerouslySetInnerHTML={{ __html: generateSVG() }}
            />
            
            <div className="text-sm text-gray-600 mb-4">
              Token ID: #{userAddress.slice(-6)}
            </div>
            
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
              View Full Metadata
            </button>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-6">
          
          {/* Score Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-green-500" size={24} />
              Score Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Base Score</span>
                <span className="font-bold text-2xl text-blue-600">
                  {displayScore}
                  {isAnimating && <span className="animate-pulse text-green-500 ml-2">↗</span>}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rental History</span>
                  <span className="font-medium">+{Math.floor(rentals * 15)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium">+{Math.floor(successRate * 5)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">International Experience</span>
                  <span className="font-medium">+{countries.length * 25} pts</span>
                </div>
                {isMultiToken && (
                  <div className="flex justify-between text-yellow-600">
                    <span className="text-sm font-medium">Multi-Stablecoin Bonus</span>
                    <span className="font-bold">+50 pts ⭐</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Current Tier</span>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{tier.icon}</span>
                    <span className="font-bold text-lg">{tier.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="mr-2 text-blue-500" size={24} />
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-green-800">Deposit Released</div>
                    <div className="text-sm text-green-600">Harvard St Property</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+30 pts</div>
                  <div className="text-xs text-gray-500">2 days ago</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-blue-800">Escrow Created</div>
                    <div className="text-sm text-blue-600">MIT Ave Property</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">+10 pts</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-yellow-800">Multi-Token Achievement</div>
                    <div className="text-sm text-yellow-600">First EURC transaction</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-600">+50 pts</div>
                  <div className="text-xs text-gray-500">2 weeks ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="mr-2 text-purple-500" size={24} />
              Global Footprint
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              {countries.map((country, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">
                    {country === 'USA' ? '🇺🇸' : country === 'Canada' ? '🇨🇦' : '🇸🇬'}
                  </div>
                  <div className="text-sm font-medium">{country}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">${usdcVolume.toLocaleString()}</div>
                <div className="text-sm text-gray-600">USDC Volume</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">${eurcVolume.toLocaleString()}</div>
                <div className="text-sm text-gray-600">EURC Volume</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}