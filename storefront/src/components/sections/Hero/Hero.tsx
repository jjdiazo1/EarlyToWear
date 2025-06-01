import { Link } from "@/i18n/routing"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="relative w-full container mt-5 overflow-visible z-0">
      {/* Elementos decorativos de fondo (sin z-index extra) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Contenedor principal del Hero */}
      <div className="relative flex flex-col lg:flex-row text-primary gap-8">
        {/* Sección de la imagen con Glassmorphism */}
        <div className="w-full order-2 lg:order-1 relative group">
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Efecto “shine” al pasar el mouse */
              /** Esta capa también lleva un stacking context, pero no le asignamos ningún z-index “personalizado” */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>

            <Image
              src={decodeURIComponent(image)}
              width={700}
              height={600}
              alt="Hero"
              className="w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Sección de contenido (texto + badge) */}
        <div className="w-full lg:order-2 relative">
          <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full px-8 py-12 flex items-end h-[calc(100%-144px)] group">
            {/* “Halo” de fondo (no necesita z-index extra) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

            <div className="relative">
              {/* Badge flotante */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200/50 px-4 py-2 rounded-full text-sm font-medium shadow-lg mb-6 hover:scale-105 transition-all duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  #PREMIUM FASHION
                </span>
              </div>

              {/* Título principal */}
              <h1 className="font-bold mb-6 uppercase text-4xl lg:text-5xl xl:text-6xl max-w-[652px] leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  {heading}
                </span>
              </h1>

              {/* Párrafo descriptivo */}
              <p className="text-lg lg:text-xl mb-8 text-gray-700 max-w-[500px] leading-relaxed">
                {paragraph}
              </p>
            </div>
          </div>

          {/* Botones de acción (Buy Now / Sell Now) */}
          {buttons.length > 0 && (
            <div className="h-[72px] lg:h-[144px] flex font-bold uppercase gap-4">
              {buttons.map(({ label, path }, index) => (
                <Link
                  key={uuidv4()}
                  href={path}
                  className={`group relative flex-1 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl ${
                    index === 0
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-900"
                  }`}
                >
                  {/* Brillo en botón */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>

                  <div className="relative flex h-full p-6 justify-between items-end">
                    <span className="text-lg lg:text-xl">
                      <span className="group-hover:inline-flex hidden animate-pulse">#</span>
                      {label}
                    </span>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                        index === 0
                          ? "bg-white/20"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500"
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
