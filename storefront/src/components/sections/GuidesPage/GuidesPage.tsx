'use client'

import { useState, useEffect } from 'react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  href: string
  readTime: string
  author: string
  date: string
  featured?: boolean
}

interface FloatingParticleProps {
  delay: number
  size: number
  duration: number
  left: number
  top: number
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Summer's Most Elegant Accessories",
    excerpt: "Discover this season's most sophisticated accessories that blend timeless elegance with modern design. From statement jewelry to classic handbags.",
    image: '/images/blog/post-1.jpg',
    category: 'ACCESSORIES',
    href: '/guides/summer-accessories',
    readTime: '5 min read',
    author: 'Early To Wear Team',
    date: 'June 2025',
    featured: true
  },
  {
    id: 2,
    title: 'The Season\'s Hottest Trends',
    excerpt: 'From bold colors to nostalgic silhouettes, explore the must-have looks defining this season\'s fashion narrative and how to style them.',
    image: '/images/blog/post-2.jpg',
    category: 'STYLE GUIDE',
    href: '/guides/seasonal-trends',
    readTime: '7 min read',
    author: 'Early To Wear Team',
    date: 'May 2025'
  },
  {
    id: 3,
    title: 'Sustainable Fashion Revolution',
    excerpt: 'Discover how you can shop clothes made from sustainable materials, perfect for those who value style and substance in their wardrobe.',
    image: '/images/blog/post-3.jpg',
    category: 'SUSTAINABILITY',
    href: '/guides/sustainable-fashion',
    readTime: '6 min read',
    author: 'Early To Wear Team',
    date: 'May 2025'
  },
  {
    id: 4,
    title: 'Building Your Capsule Wardrobe',
    excerpt: 'Learn how to create a versatile wardrobe with fewer pieces that work together seamlessly for any occasion.',
    image: '/images/blog/post-4.jpg',
    category: 'WARDROBE',
    href: '/guides/capsule-wardrobe',
    readTime: '8 min read',
    author: 'Early To Wear Team',
    date: 'April 2025'
  },
  {
    id: 5,
    title: 'Color Theory in Fashion',
    excerpt: 'Master the art of color coordination and discover which colors complement your skin tone and personal style.',
    image: '/images/blog/post-5.jpg',
    category: 'STYLING TIPS',
    href: '/guides/color-theory',
    readTime: '4 min read',
    author: 'Early To Wear Team',
    date: 'April 2025'
  },
  {
    id: 6,
    title: 'Pre-loved Fashion: A Smart Choice',
    excerpt: 'Why choosing pre-loved fashion is not just sustainable but also opens doors to unique pieces and timeless styles.',
    image: '/images/blog/post-6.jpg',
    category: 'SUSTAINABILITY',
    href: '/guides/preloved-fashion',
    readTime: '5 min read',
    author: 'Early To Wear Team',
    date: 'March 2025'
  }
]

const categories = ['ALL', 'ACCESSORIES', 'STYLE GUIDE', 'SUSTAINABILITY', 'WARDROBE', 'STYLING TIPS']

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
)

export function GuidesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [particles, setParticles] = useState<Array<{left: number, top: number, size: number, duration: number}>>([])

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 4000 + 3000
    }))
    setParticles(newParticles)
    
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setFilteredPosts(blogPosts)
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory))
    }
  }, [selectedCategory])

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      <style jsx global>{`
        @keyframes data-flow {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
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

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full mb-8 shadow-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
              <span className="text-gray-700 font-medium">FASHION INTELLIGENCE</span>
            </div>
            
            <h1 className={`text-5xl lg:text-7xl font-['Anton'] tracking-wider uppercase mb-6 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                GUIDES & INSIGHTS
              </span>
            </h1>
            
            <p className={`text-gray-600 text-xl max-w-3xl mx-auto transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              Discover the latest fashion insights, styling tips, and sustainable practices from our fashion experts.
            </p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:bg-white hover:scale-105 shadow-md'
                }`}
              >
                {category.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Featured Post (if exists) */}
          {featuredPost && selectedCategory === 'ALL' && (
            <div className={`mb-16 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
              <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-sm font-semibold">FEATURED</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200/50 px-3 py-1 rounded-full shadow-lg mb-4 w-fit">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-gray-700">{featuredPost.category}</span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      
                      <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg">
                        <span>READ MORE</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <div
                key={post.id}
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Halo Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 -z-10"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full z-10"></div>
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
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
                  </div>
                  
                  {/* Content Section */}
                  <div className="relative p-6 z-10">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    {/* Read More Button */}
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg text-sm">
                      <span>READ MORE</span>
                      <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className={`text-center mt-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
              <h2 className="text-4xl font-['Anton'] tracking-wider uppercase mb-6">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest fashion guides and insights delivered to your inbox. No spam, just great content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent w-80 transition-all duration-300"
                />
                
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}