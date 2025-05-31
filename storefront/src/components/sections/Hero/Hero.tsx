import { Link } from "@/i18n/routing"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"

import tailwindConfig from "../../../../tailwind.config"
import { ArrowRightIcon } from "@/icons"
import clsx from "clsx"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="w-full flex container mt-5 flex-col lg:flex-row text-primary relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute top-40 right-40 w-48 h-48 bg-pink-200/30 rounded-full blur-2xl animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full order-2 lg:order-1 rounded-xl overflow-hidden border border-gray-200/50 shadow-2xl">
        <Image
          src={decodeURIComponent(image)}
          width={700}
          height={600}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
      </div>

      <div className="w-full lg:order-2 relative z-10">
        <div className="border border-gray-200/50 bg-white/80 backdrop-blur-md rounded-xl shadow-xl w-full px-8 py-8 flex flex-col justify-between h-[calc(100%-144px)]">
          <div className="w-full">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-indigo-200/50 px-4 py-2 rounded-full text-sm font-medium shadow-lg mb-6 hover:scale-105 transition-all duration-300">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                #TRENDING NOW
              </span>
            </div>

            <h1 className="font-bold mb-6 uppercase display-md max-w-[652px] bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              {heading}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">{paragraph}</p>
          </div>
          
          {/* Spacer para empujar los botones hacia abajo */}
          <div className="flex-1 min-h-8"></div>
        </div>

        {buttons.length && (
          <div className="h-[72px] lg:h-[144px] flex font-bold uppercase gap-2">
            {buttons.map(({ label, path }, index) => (
              <Link
                key={uuidv4()}
                href={path}
                className={clsx(
                  "group flex border border-gray-200/50 rounded-xl h-full w-1/2 transition-all duration-300 p-6 justify-between items-end relative overflow-hidden shadow-lg hover:shadow-xl",
                  index === 0 
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700" 
                    : "bg-white/80 backdrop-blur-md text-gray-900 hover:bg-white hover:scale-[1.02]"
                )}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/50 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
                
                <span className="relative z-10">
                  <span className="group-hover:inline-flex hidden animate-pulse">#</span>
                  {label}
                </span>

                <ArrowRightIcon
                  className={clsx(
                    "relative z-10 transition-all duration-300 group-hover:translate-x-1",
                    index === 0 ? "text-white" : "text-gray-700"
                  )}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}