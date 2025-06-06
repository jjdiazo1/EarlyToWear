import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Lista de códigos de país que queremos redirigir a Colombia
  const countryRedirects = ['pl', 'es', 'fr', 'de', 'it', 'us', 'uk', 'eu']
  
  // Verificar si la URL empieza con uno de estos códigos de país
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  
  if (countryRedirects.includes(firstSegment)) {
    console.log(`🇨🇴 Redirecting ${firstSegment} to Colombia`)
    
    // Construir la nueva URL con 'co' en lugar del país original
    const newPathname = pathname.replace(`/${firstSegment}`, '/co')
    const url = request.nextUrl.clone()
    url.pathname = newPathname
    
    console.log(`Redirecting from ${pathname} to ${newPathname}`)
    
    return NextResponse.redirect(url)
  }
  
  // Si no tiene código de país, agregar 'co' por defecto
  if (!pathSegments[0] || pathSegments[0].length !== 2) {
    // Pero solo si no es una ruta de API o archivo estático
    if (!pathname.startsWith('/api') && 
        !pathname.startsWith('/_next') && 
        !pathname.includes('.') && 
        pathname !== '/') {
      
      console.log(`🇨🇴 Adding Colombia prefix to ${pathname}`)
      
      const url = request.nextUrl.clone()
      url.pathname = `/co${pathname}`
      
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  // Ejecutar el middleware en todas las rutas excepto archivos estáticos y API
  matcher: [
    /*
     * Hacer match con todas las rutas excepto:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}