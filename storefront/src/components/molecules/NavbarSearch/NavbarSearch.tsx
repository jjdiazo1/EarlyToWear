"use client"

import { Input } from "@/components/atoms"
import { SearchIcon } from "@/icons"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { redirect } from "next/navigation"

export const NavbarSearch = () => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("query") || "")
  const [isFocused, setIsFocused] = useState(false)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      redirect(`/categories?query=${search}`)
    } else {
      redirect(`/categories`)
    }
  }

  return (
    <div className="relative group">
      {/* Halo effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      {/* Search form container */}
      <form 
        className="relative flex items-center" 
        method="POST" 
        onSubmit={submitHandler}
      >
        <div className={`
          relative flex items-center
          bg-white/80 backdrop-blur-md border border-gray-200/50 
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-200 ease-in-out
          hover:scale-[1.02] hover:bg-white/90
          ${isFocused ? 'ring-2 ring-indigo-500/20 bg-white/90 scale-[1.02]' : ''}
        `}>
          {/* Search icon */}
          <div className="pl-4 pr-3 flex items-center">
            <SearchIcon className={`
              w-5 h-5 transition-colors duration-200
              ${isFocused || search ? 'text-indigo-600' : 'text-gray-400'}
            `} />
          </div>

          {/* Input field */}
          <input
            type="text"
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              flex-1 py-3 pr-4 bg-transparent
              text-gray-900 placeholder-gray-500
              label-md font-medium
              border-0 outline-none ring-0
              transition-all duration-200
            `}
          />

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/50 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full rounded-xl overflow-hidden pointer-events-none"></div>
          
          {/* Submit button (hidden but functional) */}
          <input type="submit" className="hidden" />
        </div>

        {/* Floating search hint */}
        {isFocused && !search && (
          <div className="absolute top-full left-4 mt-2 z-20">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200/50 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Find your perfect style
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}