"use client"
import { BrandCard } from "@/components/organisms"
import { SellerProps } from "@/types/seller"
import { Input } from "@/components/atoms"
import { SearchIcon } from "@/icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

interface BrandsListingProps {
  brands: SellerProps[]
  searchQuery?: string
}

export function BrandsListing({ brands, searchQuery = "" }: BrandsListingProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(searchQuery)

  // Filter brands based on search query
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(search.toLowerCase()) ||
    brand.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (value: string) => {
    setSearch(value)
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`/brands?${params.toString()}`)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
      {/* Enhanced Hero Section - Much Lighter */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 text-gray-800">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute top-40 right-40 w-48 h-48 bg-pink-200/20 rounded-full blur-2xl animate-pulse" 
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
        
        <div className="relative py-10 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200/50 px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Discover Amazing Brands
              </span>
            </div>
            
            {/* Main heading with gradient text */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                ALL BRANDS
              </span>
            </h1>
            
            {/* Enhanced description */}
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover amazing brands and their unique collections. Each brand brings its own{" "}
              <span className="text-amber-600 font-semibold">style</span> and{" "}
              <span className="text-rose-600 font-semibold">story</span>.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center gap-4 text-sm font-medium">
              <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
                <span className="text-indigo-600 font-semibold">{brands.length}+ Brands</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
                <span className="text-purple-600 font-semibold">Premium Quality</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
                <span className="text-pink-600 font-semibold">Verified Sellers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Search Section - Fix icon overlap */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center px-6 py-4">
              <div className="relative mr-4 flex-shrink-0">
                <SearchIcon size={20} className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                {isPending && (
                  <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <Input
                placeholder="Search brands..."
                value={search}
                changeValue={handleSearch}
                className="w-full text-lg bg-transparent border-none focus:ring-0 placeholder:text-gray-400 p-0"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <p className="text-lg font-medium text-gray-700">
                <span className="text-2xl font-bold text-indigo-600">{filteredBrands.length}</span>{" "}
                brand{filteredBrands.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {search && (
              <button
                onClick={() => handleSearch("")}
                className="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Brands Grid - Con animaciones para móviles */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-20">
            {filteredBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="group relative opacity-100 translate-y-0"
                style={{ 
                  animationDelay: `${index * 100}ms`
                }}
              >
               {/* El halo - centrado */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 -z-10"></div>                {/* Card wrapper con hover y animación móvil */}
                <div className="relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up md:animate-none">
                  <BrandCard
                    seller={brand}
                    showStats={true}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Enhanced Empty State */
          <div className="text-center py-24">
            <div className="relative max-w-md mx-auto">
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-indigo-100 rounded-full blur-sm opacity-60 animate-pulse"></div>
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 bg-purple-100 rounded-full blur-sm opacity-60 animate-pulse" 
                style={{ animationDelay: '1s' }}
              ></div>
              <div 
                className="absolute -bottom-4 left-8 w-8 h-8 bg-pink-100 rounded-full blur-sm opacity-60 animate-pulse" 
                style={{ animationDelay: '2s' }}
              ></div>
              
              <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <SearchIcon size={32} className="text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  No brands found
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Try adjusting your search criteria or browse all brands.
                </p>
                
                <button
                  onClick={() => handleSearch("")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Browse All Brands
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}