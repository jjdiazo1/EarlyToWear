import { Carousel } from "@/components/cells"
import { CategoryCard } from "@/components/organisms"

export const categories: { id: number; name: string; handle: string }[] = [
  {
    id: 1,
    name: "Sneakers",
    handle: "sneakers",
  },
  {
    id: 2,
    name: "Sandals",
    handle: "sandals",
  },
  {
    id: 3,
    name: "Boots",
    handle: "boots",
  },
  {
    id: 4,
    name: "Sport",
    handle: "sport",
  },
  {
    id: 5,
    name: "Accessories",
    handle: "accessories",
  },
]

export const HomeCategories = async ({ heading }: { heading: string }) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 py-16 pb-48 w-full">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main container with subtle glassmorphism */}
      <div className="relative container mx-auto px-4">
        
        {/* Header section */}
        <div className="mb-12 text-center">
          
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-6 hover:scale-105 transition-all duration-300">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold uppercase tracking-wider">
              Discover
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent uppercase tracking-wide mb-4">
            {heading}
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of premium fashion categories
          </p>
          
          {/* Decorative line */}
          <div className="flex justify-center mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"></div>
          </div>
        </div>

        {/* Categories carousel with enhanced container */}
        <div className="relative mx-8 mb-16">
          
          {/* Glassmorphism background for carousel */}
          <div className="absolute -inset-8 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl"></div>
          
          <div className="relative z-10 py-8">
            <Carousel
              items={categories?.map((category) => (
                <div key={category.id} className="px-4">
                  <CategoryCard category={category} />
                </div>
              ))}
            />
          </div>
        </div>

        {/* Bottom section with call to action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-md border border-gray-200/50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-indigo-400 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-gray-700 font-medium">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">1000+</span> brands available
            </span>
          </div>
        </div>
      </div>

      {/* Additional floating decorative elements */}
      <div className="absolute top-20 right-8 opacity-60">
        <div className="w-16 h-16 border border-white/30 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-300/50 to-purple-300/50 rounded-lg"></div>
        </div>
      </div>
      
      <div className="absolute bottom-20 left-8 opacity-60">
        <div className="w-12 h-12 border border-white/30 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="w-4 h-4 bg-gradient-to-br from-purple-300/50 to-pink-300/50 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}