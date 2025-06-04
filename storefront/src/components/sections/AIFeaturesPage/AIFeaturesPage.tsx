'use client'

import { useState, useEffect } from 'react'

const features = [
  {
    title: "AI Visual Search",
    description: "Upload a photo or describe what you're looking for. Our AI will find similar items from our marketplace brands.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8a3 3 0 100 6"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-600",
    delay: 0
  },
  {
    title: "Smart Closet Manager",
    description: "Digitize your wardrobe and get AI-powered outfit suggestions based on weather, occasion, and your personal style.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    gradient: "from-purple-500 to-pink-600",
    delay: 200
  },
  {
    title: "Style DNA Analysis",
    description: "Our AI learns your unique style preferences and suggests products that match your aesthetic perfectly.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    gradient: "from-pink-500 to-rose-600",
    delay: 400
  }
]

export function AIFeaturesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes neural-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes data-stream {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/20 via-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-200/15 via-indigo-200/15 to-purple-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `neural-pulse ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full mb-8 shadow-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
              <span className="text-gray-700 font-medium">AI FEATURES LAUNCHING SOON</span>
            </div>
            
            <h1 className={`text-6xl lg:text-8xl font-['Anton'] tracking-wider uppercase mb-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                The Future
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
                of Fashion AI
              </span>
            </h1>
            
            <p className={`text-gray-600 text-xl max-w-3xl mx-auto transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              We're building revolutionary AI features that will transform how you discover, organize, and style fashion. Get ready for a personalized shopping experience like never before.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${600 + feature.delay}ms` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Halo Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 -z-10"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden">
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full z-10"></div>
                  
                  {/* Content */}
                  <div className="relative z-20">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Coming Soon Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Coming Soon</span>
                    </div>
                  </div>
                  
                  {/* Data Stream Effect */}
                  {hoveredFeature === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full`} style={{ animation: 'data-stream 2s ease-in-out infinite' }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
              <h2 className="text-4xl font-['Anton'] tracking-wider uppercase mb-6">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Be the First to Know
                </span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Join our early access list and be among the first to experience these revolutionary AI features when they launch.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email for early access"
                    className="px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent w-80 transition-all duration-300"
                  />
                </div>
                
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Get Early Access
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                We'll notify you as soon as these features are available. No spam, we promise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}