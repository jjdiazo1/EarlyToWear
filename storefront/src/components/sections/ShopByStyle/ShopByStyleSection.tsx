'use client'

import { useState, useEffect } from 'react';

interface Style {
  id: number;
  name: string;
  href: string;
  aiMatch: string;
  color: string;
  delay: number;
}

interface FloatingParticleProps {
  delay: number;
  size: number;
  duration: number;
  left: number;
  top: number;
}

const styles: Style[] = [
  {
    id: 1,
    name: "LUXURY",
    href: "/collections/luxury",
    aiMatch: "87%",
    color: "from-amber-400 to-orange-500",
    delay: 0
  },
  {
    id: 2,
    name: "VINTAGE",
    href: "/collections/vintage", 
    aiMatch: "73%",
    color: "from-rose-400 to-pink-500",
    delay: 200
  },
  {
    id: 3,
    name: "CASUAL",
    href: "/collections/casual",
    aiMatch: "92%",
    color: "from-blue-400 to-cyan-500", 
    delay: 400
  },
  {
    id: 4,
    name: "STREETWEAR",
    href: "/collections/streetwear",
    aiMatch: "68%",
    color: "from-purple-400 to-indigo-500",
    delay: 600
  },
  {
    id: 5,
    name: "Y2K",
    href: "/collections/y2k",
    aiMatch: "81%",
    color: "from-green-400 to-emerald-500",
    delay: 800
  },
];

const FloatingParticle = ({ delay, size, duration, left, top }: FloatingParticleProps) => (
  <div 
    className="absolute bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-sm animate-bounce"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`
    }}
  />
);

const ScanLine = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
    <div 
      className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60"
      style={{
        animation: 'scan 4s linear infinite',
        transform: 'translateY(-50px)'
      }}
    />
  </div>
);

export function ShopByStyleSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activePoint, setActivePoint] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number, top: number, size: number, duration: number}>>([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 12 + 6,
      duration: Math.random() * 3000 + 4000
    }));
    setParticles(newParticles);
    
    setIsVisible(true);
    // Simulate AI analysis completion
    const timer = setTimeout(() => setIsAnalyzing(false), 2500);
    
    // Cycle through detection points
    const pointInterval = setInterval(() => {
      setActivePoint(prev => (prev + 1) % 5);
    }, 2000);
    
    // Cycle through style cards
    const cardInterval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 5);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(pointInterval);
      clearInterval(cardInterval);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes grid-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
      
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-32 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/20 via-indigo-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-200/25 via-rose-200/25 to-orange-200/25 rounded-full blur-2xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <FloatingParticle 
              key={i}
              delay={i * 300}
              size={particle.size}
              duration={particle.duration}
              left={particle.left}
              top={particle.top}
            />
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Header with AI Status */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full mb-8 shadow-lg">
              <div className={`w-3 h-3 rounded-full ${isAnalyzing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
              <span className="text-gray-700 font-medium">
                {isAnalyzing ? 'AI CREATING YOUR PERFECT STYLE...' : 'PERFECT STYLE CREATED ✨'}
              </span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-['Anton'] tracking-wider uppercase mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                SHOP BY YOUR STYLE
              </span>
            </h2>
            
            <p className="text-gray-600 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Our AI analyzes millions of fashion trends to create the perfect style designed especially for you
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 items-stretch">
            
            {/* Interactive Style Cards - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
              {styles.map((style) => (
                <div
                  key={style.id}
                  className={`group relative transform transition-all duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                  }`}
                  style={{ transitionDelay: `${style.delay}ms` }}
                  onMouseEnter={() => setSelectedStyle(style.id)}
                  onMouseLeave={() => setSelectedStyle(null)}
                >
                  {/* Halo Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 -z-10"></div>
                  
                  {/* Card */}
                  <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 shadow-lg hover:shadow-xl">
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-2xl"></div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* AI Match Indicator */}
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${style.color} p-0.5 shadow-lg`}>
                            <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <span className="text-gray-800 text-xs font-bold">{style.aiMatch}</span>
                            </div>
                          </div>
                          {activeCard === style.id - 1 && (
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${style.color} animate-ping opacity-30`}></div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-['Anton'] tracking-wider text-gray-800 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {style.name}
                          </h3>
                          <p className="text-gray-500 text-sm">AI Match: {style.aiMatch}</p>
                        </div>
                      </div>
                      
                      {/* Arrow with Glow */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-indigo-500/30">
                          <svg className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        {selectedStyle === style.id && (
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-ping opacity-40"></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-6 h-2 bg-gray-200/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${style.color} rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ 
                          width: isVisible ? style.aiMatch : '0%',
                          transitionDelay: `${style.delay}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Visualization Panel - Takes 3 columns */}
            <div className="lg:col-span-3 relative flex items-center">
              {/* Main Display */}
              <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-xl w-full">
                
                {/* Holographic Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
                
                {/* Image Container - Much Larger */}
                <div className="relative overflow-hidden rounded-2xl group">
                  {/* AI Scan Lines - Only over image */}
                  <ScanLine />
                  
                  <img
                    src="/images/shop-by-styles/Image.jpg"
                    alt="AI Fashion Analysis - Creating Your Perfect Style"
                    className="w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* AI Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Scanning Grid */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: 'linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                        animation: 'grid-scan 3s linear infinite'
                      }}
                    ></div>
                  </div>
                  
                  {/* AI Detection Points - Only ONE active at a time */}
                  {[
                    { top: '15%', left: '15%', label: 'TEXTURE ANALYSIS' },
                    { top: '35%', left: '70%', label: 'COLOR PALETTE' },
                    { top: '65%', left: '20%', label: 'PATTERN RECOGNITION' },
                    { top: '50%', left: '85%', label: 'STYLE DNA' },
                    { top: '80%', left: '60%', label: 'TREND FORECAST' }
                  ].map((point, i) => (
                    <div
                      key={i}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ${
                        activePoint === i ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
                      }`}
                      style={{ 
                        top: point.top, 
                        left: point.left
                      }}
                    >
                      <div className="relative">
                        <div className={`w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg border-2 border-white/50 ${
                          activePoint === i ? 'animate-pulse' : ''
                        }`}></div>
                        {activePoint === i && (
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping opacity-60"></div>
                        )}
                        <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-800 whitespace-nowrap font-medium shadow-lg border border-gray-200/50 transition-all duration-500 ${
                          activePoint === i ? 'opacity-100 scale-100' : 'opacity-60 scale-90'
                        }`}>
                          {point.label}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* AI Creating Badge - Better positioned to avoid overlap */}
                  <div className="absolute top-6 right-6">
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200/50 px-4 py-2 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold text-sm">
                        AI CREATING STYLE
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* AI Status Panel */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Neural Network Analysis</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-200/60 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-sm" style={{ width: '84%' }}></div>
                    </div>
                    <span className="text-gray-800 text-sm font-bold">84% Perfect Match</span>
                  </div>
                  
                  <div className="flex gap-2 text-xs flex-wrap">
                    {['TREND ANALYSIS', 'COLOR MATCHING', 'STYLE PREDICTION', 'AI PERSONALIZATION'].map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200/50 rounded-full text-indigo-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}