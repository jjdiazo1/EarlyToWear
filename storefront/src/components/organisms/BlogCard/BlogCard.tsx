import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "@/types/blog"
import { ArrowRightIcon } from "@/icons"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link
      href={post.href}
      className={cn(
        "group block border border-gray-200/50 bg-white/80 backdrop-blur-sm p-1 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1",
        index > 0 && "hidden lg:block"
      )}
    >
      {/* Halo effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 -z-10"></div>
      
      <div className="relative overflow-hidden rounded-xl h-full">
        <Image
          src={decodeURIComponent(post.image)}
          alt={post.title}
          width={467}
          height={472}
          className="object-cover max-h-[472px] h-full w-full transition-transform duration-500 group-hover:scale-110"
          priority
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-white/20">
            {post.category}
          </div>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>
      
      <div className="absolute bottom-0 left-1 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md border border-white/20 shadow-xl lg:opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-t-xl w-[calc(100%-8px)] p-6">
        <div className="space-y-3">
          <h3 className="heading-sm text-gray-900 leading-tight">{post.title}</h3>
          <p className="text-md line-clamp-2 text-gray-600">{post.excerpt}</p>
          <div className="flex items-center gap-3 uppercase label-md text-indigo-600 font-semibold pt-2">
            <span>Read more</span>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRightIcon size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}