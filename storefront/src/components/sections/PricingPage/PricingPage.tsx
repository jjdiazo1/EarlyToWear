'use client'

import { useState, useEffect } from 'react'

const brandFeatures = [
  { name: "Payment processing + payouts", percentage: "3.6%" },
  { name: "Platform, AI & Growth tools", percentage: "2.9%" }
]

const competitorData = [
  {
    name: "Early To Wear",
    commission: "6.5%",
    aiFeatures: true,
    community: true,
    targeting: true,
    support: true,
    highlight: true
  },
  {
    name: "Instagram Shopping",
    commission: "5% + fees",
    aiFeatures: false,
    community: "Only hashtags",
    targeting: false,
    support: false
  },
  {
    name: "Mercado Libre",
    commission: "13-16%",
    aiFeatures: false,
    community: false,
    targeting: false,
    support: false
  },
  {
    name: "Traditional Marketplaces",
    commission: "10-20%",
    aiFeatures: false,
    community: false,
    targeting: false,
    support: false
  }
]

const userPlans = [
  {
    name: "BASIC",
    price: "$10,000",
    subtitle: "Perfect for exploring",
    features: [
      "Virtual closet: Up to 20 items",
      "Generated outfits: 10 per month",
      "Basic purchase recommendations"
    ],
    ideal: "Casual users who want to try the experience",
    gradient: "from-emerald-500 to-teal-600",
    icon: "🌱"
  },
  {
    name: "PREMIUM",
    price: "$20,000",
    subtitle: "For fashion lovers",
    features: [
      "Virtual closet: Up to 75 items",
      "Generated outfits: 50 per month",
      "Advanced recommendations with color analysis",
      "Automatic shopping integration",
      "Personal style analysis"
    ],
    ideal: "Fashion enthusiasts who want to maximize their wardrobe",
    gradient: "from-indigo-500 to-purple-600",
    icon: "✨",
    popular: true
  },
  {
    name: "PRO",
    price: "$100,000",
    subtitle: "The complete stylist",
    features: [
      "Virtual closet: Unlimited items",
      "Generated outfits: 200 per month",
      "Advanced AI with trend analysis",
      "Personal stylist: 2 consultations per month",
      "Early access to new brands",
      "Custom requests for events"
    ],
    ideal: "Fashionistas, influencers, fashion professionals",
    gradient: "from-purple-500 to-pink-600",
    icon: "🚀"
  },
  {
    name: "CUSTOM",
    price: "Contact",
    subtitle: "For Professional Stylists",
    features: [
      "Everything unlimited: Closets, outfits, analysis",
      "API access for integration",
      "White label with your brand",
      "Priority 24/7 support",
      "Custom pricing"
    ],
    ideal: "Professional stylists and companies",
    gradient: "from-rose-500 to-orange-600",
    icon: "💎"
  }
]

export function PricingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'brands' | 'users'>('brands')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/20 via-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-200/15 via-teal-200/15 to-cyan-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full mb-8 shadow-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
              <span className="text-gray-700 font-medium">TRANSPARENT PRICING</span>
            </div>
            
            <h1 className={`text-5xl lg:text-7xl font-['Anton'] tracking-wider uppercase mb-6 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                SIMPLE PRICING
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                POWERFUL AI
              </span>
            </h1>
            
            <p className={`text-gray-600 text-xl max-w-3xl mx-auto transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              Choose the plan that fits your needs. Whether you're a brand looking to sell or a fashion lover seeking AI-powered styling.
            </p>
          </div>

          {/* Tab Selector */}
          <div className={`flex justify-center mb-16 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('brands')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'brands'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                For Brands 💼
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'users'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                For Users 👗
              </button>
            </div>
          </div>

          {/* Brands Section */}
          {activeTab === 'brands' && (
            <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
              
              {/* Main Value Proposition */}
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-['Anton'] tracking-wider uppercase mb-6">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Sell More with AI
                  </span>
                </h2>
                <p className="text-2xl text-gray-600 mb-8">Pay less than other marketplaces</p>
                
                {/* Commission Breakdown */}
                <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto mb-12">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-['Anton'] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      6.5%
                    </div>
                    <p className="text-gray-600 text-lg">Total Commission</p>
                  </div>
                  
                  <div className="space-y-4">
                    {brandFeatures.map((feature, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50/80 rounded-xl">
                        <span className="text-gray-700">{feature.name}</span>
                        <span className="font-semibold text-indigo-600">{feature.percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Competitor Comparison */}
              <div className="mb-16">
                <h3 className="text-3xl font-['Anton'] tracking-wider text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  COMPARISON VS COMPETITION
                </h3>
                
                <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                          <th className="px-6 py-4 text-left">Marketplace</th>
                          <th className="px-6 py-4 text-center">Commission</th>
                          <th className="px-6 py-4 text-center">AI Features</th>
                          <th className="px-6 py-4 text-center">Community</th>
                          <th className="px-6 py-4 text-center">Targeting</th>
                          <th className="px-6 py-4 text-center">Support</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitorData.map((competitor, index) => (
                          <tr key={index} className={`border-b border-gray-200/50 ${competitor.highlight ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : 'hover:bg-gray-50/50'}`}>
                            <td className="px-6 py-4 font-semibold">{competitor.name}</td>
                            <td className="px-6 py-4 text-center font-bold">{competitor.commission}</td>
                            <td className="px-6 py-4 text-center">
                              {competitor.aiFeatures ? (
                                <span className="text-green-600">✅ Custom Styling AI</span>
                              ) : (
                                <span className="text-red-500">❌</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {competitor.community === true ? (
                                <span className="text-green-600">✅ Active community</span>
                              ) : competitor.community === false ? (
                                <span className="text-red-500">❌</span>
                              ) : (
                                <span className="text-yellow-600">❌ {competitor.community}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {competitor.targeting ? (
                                <span className="text-green-600">✅ AI Recommendations</span>
                              ) : (
                                <span className="text-red-500">❌</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {competitor.support ? (
                                <span className="text-green-600">✅ Dedicated support</span>
                              ) : (
                                <span className="text-red-500">❌</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Volume Plans */}
              <div className="text-center">
                <h3 className="text-3xl font-['Anton'] tracking-wider mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  VOLUME PLANS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "Startup", rate: "6.5%", volume: "Standard" },
                    { name: "Growth", rate: "5.5%", volume: "From $10M COP/month" },
                    { name: "Enterprise", rate: "Custom", volume: "+$50M COP/month" },
                    { name: "Custom", rate: "Negotiable", volume: "High volumes" }
                  ].map((plan, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                      <div className="text-3xl font-['Anton'] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {plan.rate}
                      </div>
                      <p className="text-gray-600 text-sm">{plan.volume}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl text-lg">
                    Start selling in 48 hours
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users Section */}
          {activeTab === 'users' && (
            <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
              
              {/* Comparison with Real Stylist */}
              <div className="mb-16">
                <h2 className="text-4xl lg:text-6xl font-['Anton'] tracking-wider uppercase text-center mb-6">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Your Personal Stylist
                  </span>
                </h2>
                <p className="text-2xl text-gray-600 text-center mb-8">Cheaper than a consultation</p>
                
                <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                        <th className="px-6 py-4 text-left">Service</th>
                        <th className="px-6 py-4 text-center">Monthly Cost</th>
                        <th className="px-6 py-4 text-center">Availability</th>
                        <th className="px-6 py-4 text-center">Personalization</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200/50">
                        <td className="px-6 py-4 font-semibold">Professional stylist</td>
                        <td className="px-6 py-4 text-center font-bold text-red-600">$300,000-800,000 COP</td>
                        <td className="px-6 py-4 text-center text-yellow-600">Limited appointments</td>
                        <td className="px-6 py-4 text-center text-yellow-600">Personal but expensive</td>
                      </tr>
                      <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                        <td className="px-6 py-4 font-semibold">Our AI Stylist</td>
                        <td className="px-6 py-4 text-center font-bold text-green-600">From $10,000 COP</td>
                        <td className="px-6 py-4 text-center text-green-600">24/7</td>
                        <td className="px-6 py-4 text-center text-green-600">Learns your unique style</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            {/* User Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
              {userPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-500 h-full ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${1000 + index * 200}ms` }}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        MÁS POPULAR
                      </div>
                    </div>
                  )}
                  
                  {/* Halo Effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500 scale-105 -z-10`}></div>
                  
                  {/* Main Card */}
                  <div className={`relative bg-white/90 backdrop-blur-md border-2 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden h-full flex flex-col ${plan.popular ? 'border-rose-200' : 'border-gray-200/50'}`}>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full z-10"></div>
                    
                    {/* Content */}
                    <div className="relative z-20 flex flex-col justify-between h-full">
                      {/* Icon & Name */}
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3">{plan.icon}</div>
                        <h3 className="text-2xl font-['Anton'] tracking-wider text-gray-800 mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600 text-sm italic">{plan.subtitle}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="text-center mb-8">
                        <div className={`text-4xl font-['Anton'] bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent mb-1`}>
                          {plan.price}
                        </div>
                        {plan.price !== "Contact" && (
                          <p className="text-gray-500 text-sm">COP/mes</p>
                        )}
                      </div>
                      
                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${plan.gradient} mt-2 flex-shrink-0`}></div>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Ideal For */}
                      <div className="mb-8">
                        <p className="text-xs text-gray-500 font-semibold mb-2">IDEAL FOR:</p>
                        <p className="text-gray-600 text-sm italic">{plan.ideal}</p>
                      </div>
                      
                      {/* CTA Button */}
                      <button className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        {plan.price === "Contact" ? "Contact" : "Try for free 7 days"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

              {/* User Benefits */}
              <div className="mt-16 text-center">
                <h3 className="text-3xl font-['Anton'] tracking-wider mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  UNIQUE BENEFITS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: "🧠", title: "AI that learns your style", desc: "Each outfit improves future recommendations" },
                    { icon: "🛍️", title: "Full integration", desc: "What you buy is automatically added to your virtual closet" },
                    { icon: "📱", title: "Wardrobe management", desc: "Organize, categorize and optimize what you already have" },
                    { icon: "🎯", title: "Smart recommendations", desc: "AI suggests purchases based on gaps in your closet" },
                    { icon: "👥", title: "Fashion community", desc: "Connect with other fashion lovers" },
                    { icon: "📈", title: "Outfit tracking", desc: "See which combinations work best" }
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="text-3xl mb-3">{benefit.icon}</div>
                      <h4 className="font-bold text-gray-800 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className={`text-center mt-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
              <h2 className="text-4xl font-['Anton'] tracking-wider uppercase mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Have Questions?
                </span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Our team is here to help you choose the perfect plan for your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Team
                </button>
                
                <a 
                  href="mailto:earlytowear@gmail.com"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 13l-8-5h16l-8 5zm0 2l-8-5v10h16V10l-8 5z"/>
                  </svg>
                  earlytowear@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}