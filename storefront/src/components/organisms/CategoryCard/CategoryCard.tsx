import { Link } from "@/i18n/routing"
import Image from "next/image"

export function CategoryCard({
  category,
}: {
  category: { id: number; name: string; handle: string }
}) {
  return (
    <Link
      href={`/categories/${category.handle}`}
      className="group relative flex flex-col items-center border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-[233px] aspect-square p-6 hover:scale-105 hover:-translate-y-2 overflow-hidden"
    >
      {/* Halo effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 -z-10"></div>
      
      {/* Efecto de brillo */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
      
      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center h-full justify-center">
        <div className="flex relative aspect-square overflow-hidden w-[180px] mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-4 group-hover:bg-gradient-to-br group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-300">
          <Image
            src={`/images/categories/${category.handle}.png`}
            alt={category.name}
            width={180}
            height={180}
            className="object-contain scale-90 group-hover:scale-100 transition-transform duration-300 filter group-hover:drop-shadow-lg"
          />
        </div>
        
        <h3 className="text-center label-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
          {category.name}
        </h3>
        
        {/* Badge decorativo */}
        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Explore
        </div>
      </div>
    </Link>
  )
}