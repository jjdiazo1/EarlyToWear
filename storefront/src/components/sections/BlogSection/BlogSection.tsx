'use client'

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  href: string;
}

interface FloatingParticleProps {
  delay: number;
  size: number;
  duration: number;
  left: number;
  top: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Summer's Most Elegant Accessories",
    excerpt:
      "Discover this season's most sophisticated accessories that blend timeless elegance with modern design.",
    image: '/images/blog/post-1.jpg',
    category: 'ACCESSORIES',
    href: '#',
  },
  {
    id: 2,
    title: 'The Season\'s Hottest Trends',
    excerpt:
      'From bold colors to nostalgic silhouettes, explore the must-have looks defining this season\'s fashion narrative.',
    image: '/images/blog/post-2.jpg',
    category: 'STYLE GUIDE',
    href: '#',
  },
  {
    id: 3,
    title: 'Minimalist Outerwear Trends',
    excerpt:
      'Explore the latest minimalist outerwear pieces that combine functionality with clean aesthetics.',
    image: '/images/blog/post-3.jpg',
    category: 'TRENDS',
    href: '#',
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

const ConnectionLine = ({ startX, startY, endX, endY, delay }: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
}) => {
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  return (
    <div
      className="absolute origin-left pointer-events-none"
      style={{
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${length}px`,
        height: '2px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%'
      }}
    >
      <div 
        className="w-full h-full bg-gradient-to-r from-indigo-400/60 via-purple-400/60 to-pink-400/60 rounded-full opacity-40"
        style={{
          animation: `pulse-line 3s ease-in-out infinite ${delay}s`
        }}
      />
      <div 
        className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-80"
        style={{
          animation: `travel 4s linear infinite ${delay}s`
        }}
      />
    </div>
  );
};

export function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{left: number, top: number, size: number, duration: number}>>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 10 + 6,
      duration: Math.random() * 4000 + 3000
    }));
    setParticles(newParticles);
    
    setIsVisible(true);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.5); }
        }
        @keyframes travel {
          0% { transform: translateX(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100% + 100px)); opacity: 0; }
        }
        @keyframes data-flow {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }
      `}</style>
      
      <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-r from-purple-200/30 via-indigo-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-200/25 via-rose-200/25 to-orange-200/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <FloatingParticle 
              key={i}
              delay={i * 400}
              size={particle.size}
              duration={particle.duration}
              left={particle.left}
              top={particle.top}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full mb-8 shadow-lg">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
              <span className="text-gray-700 font-medium">TREND NETWORK ACTIVE</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-['Anton'] tracking-wider uppercase mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                STAY UP TO DATE
              </span>
            </h2>
            
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Discover the latest fashion insights flowing through our trend network
            </p>
          </div>

          {/* Connected Cards Grid */}
          <div className="relative">
            {/* Connection Lines Network */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <ConnectionLine startX={200} startY={300} endX={500} endY={200} delay={0} />
              <ConnectionLine startX={500} startY={400} endX={800} endY={300} delay={1} />
              <ConnectionLine startX={200} startY={100} endX={800} endY={150} delay={2} />
              
              {/* Data flow indicators */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200/50">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">TREND DATA FLOWING</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`group relative transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Halo Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 -z-10"></div>
                  
                  {/* Network Node Indicator */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-20">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    {hoveredCard === post.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping opacity-60"></div>
                    )}
                  </div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full z-10"></div>
                    
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200/50 px-3 py-1 rounded-full shadow-lg">
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-gray-700">{post.category}</span>
                        </div>
                      </div>
                      
                      {/* Scanning Grid Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: 'linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="relative p-6 z-10">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Read More Button */}
                      <div className="flex items-center justify-between">
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25">
                          <span>READ MORE</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                        
                        {/* Data Connection Indicator */}
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}