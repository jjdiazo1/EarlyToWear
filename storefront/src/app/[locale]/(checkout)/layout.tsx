import { Button } from "@/components/atoms"
import { Link } from "@/i18n/routing"
import { CollapseIcon } from "@/icons"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        {/* Elementos decorativos sutiles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full py-5 lg:px-8 px-4">
          <div className="absolute top-3">
            <Link href="/cart">
              <Button variant="tonal" className="flex items-center gap-2">
                <CollapseIcon className="rotate-90" />
                <span className="hidden lg:block">Back to cart</span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center pl-4 lg:pl-0 w-full">
            <Link
              href="/"
              className="text-3xl font-bold uppercase group transition-transform duration-300 hover:scale-105 font-['Anton'] tracking-wide"
            >
              <div className="relative">
                {/* Glow effect en el logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                Early To Wear
              </div>
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}