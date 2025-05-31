import { Link } from "@/i18n/routing"
import footerLinks from "@/data/footerLinks"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Services Column */}
          <div className="p-6 border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            {/* Halo effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">CS</span>
              </div>
              <h2 className="heading-sm text-primary uppercase bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Customer services
              </h2>
            </div>
            <nav className="space-y-3" aria-label="Customer services navigation">
              {footerLinks.customerServices.map(({ label, path }) => (
                <Link 
                  key={label} 
                  href={path} 
                  className="block label-md text-gray-600 hover:text-indigo-600 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About Column */}
          <div className="p-6 border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AB</span>
              </div>
              <h2 className="heading-sm text-primary uppercase bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                About
              </h2>
            </div>
            <nav className="space-y-3" aria-label="About navigation">
              {footerLinks.about.map(({ label, path }) => (
                <Link 
                  key={label} 
                  href={path} 
                  className="block label-md text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Column */}
          <div className="p-6 border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">CO</span>
              </div>
              <h2 className="heading-sm text-primary uppercase bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Connect
              </h2>
            </div>
            <nav className="space-y-3" aria-label="Social media navigation">
              {footerLinks.connect.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  className="block label-md text-gray-600 hover:text-pink-600 transition-colors duration-200 hover:translate-x-1 transform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright section */}
        <div className="py-8">
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 text-center shadow-lg">
            <p className="text-md text-gray-500">
              © 2024 Early To Wear - 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold ml-1">
                Built with passion
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}