'use client'

import { useState, useEffect } from 'react'

const values = [
  {
    icon: "🤖",
    title: "IA que Empodera",
    description: "Creemos que la inteligencia artificial debe trabajar para nosotros, no reemplazarnos. Nuestra IA genera nuevas oportunidades económicas y empodera tanto a marcas como a usuarios.",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    icon: "🌱",
    title: "Moda Sostenible",
    description: "Combatimos la moda rápida promoviendo el consumo consciente. Cada recomendación de nuestra IA está diseñada para maximizar el valor de lo que ya tienes.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: "💡",
    title: "Innovación Accesible",
    description: "Democratizamos la tecnología fashion. Desde pequeñas marcas hasta grandes usuarios, todos merecen acceso a herramientas de styling inteligente.",
    gradient: "from-orange-500 to-pink-600"
  },
  {
    icon: "🤝",
    title: "Comunidad Colaborativa",
    description: "Construimos un ecosistema donde marcas y usuarios se benefician mutuamente. La IA conecta necesidades reales con productos perfectos.",
    gradient: "from-purple-500 to-rose-600"
  }
]

const milestones = [
  {
    year: "2024",
    title: "La Visión Nace",
    description: "Fundamos Early To Wear con la misión de unir fashion y technology de manera revolucionaria.",
    icon: "💡"
  },
  {
    year: "2025",
    title: "Marketplace Launch",
    description: "Lanzamos nuestra plataforma conectando marcas con usuarios a través de recomendaciones AI.",
    icon: "🚀"
  },
  {
    year: "2025+",
    title: "AI Features",
    description: "Desarrollamos herramientas de IA avanzadas: visual search, closet management y style DNA analysis.",
    icon: "🤖"
  },
  {
    year: "Futuro",
    title: "Fashion Revolution",
    description: "Nos convertimos en el primer marketplace 100% AI-powered, transformando el consumo de moda global.",
    icon: "🌟"
  }
]

export function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes tech-grid {
          0% { opacity: 0.3; transform: translateX(-100px); }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; transform: translateX(100px); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-rose-200/20 via-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-200/15 via-teal-200/15 to-cyan-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full mb-8 shadow-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse"></div>
              <span className="text-gray-700 font-medium">OUR STORY</span>
            </div>
            
            <h1 className={`text-5xl lg:text-8xl font-['Anton'] tracking-wider uppercase mb-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Fashion
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                meets AI
              </span>
            </h1>
            
            <p className={`text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              Fundamos Early To Wear con un sueño: unir la pasión por la moda con el poder transformador de la tecnología. 
              Creemos que la IA debe trabajar para nosotros, generando nuevas oportunidades económicas sin quitar empleos, 
              sino creando un ecosistema donde la tecnología eleva la experiencia humana.
            </p>
          </div>

          {/* Founder's Vision */}
          <div className={`mb-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 shadow-xl max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-['Anton'] tracking-wider uppercase mb-6">
                    <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                      La Visión
                    </span>
                  </h2>
                  
                  <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                    <p>
                      <strong className="text-gray-800">¿Por qué Early To Wear?</strong> Porque amamos la moda y la tecnología por igual. 
                      Vimos una oportunidad única de crear algo que nunca había existido: un marketplace que entiende tu estilo personal 
                      y te conecta con las piezas perfectas.
                    </p>
                    
                    <p>
                      Nuestra misión va más allá de vender ropa. Queremos <strong className="text-rose-600">transformar la forma en que 
                      consumimos moda</strong>, acabar con la moda rápida, y crear un futuro donde cada compra sea consciente, 
                      personalizada y valiosa.
                    </p>
                    
                    <p>
                      La IA no está aquí para reemplazar la creatividad humana, sino para <strong className="text-purple-600">amplificarla</strong>. 
                      Cada algoritmo, cada recomendación, cada conexión que hacemos está diseñada para empoderar tanto a las marcas 
                      como a los usuarios, generando valor real para todos.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-rose-100 to-purple-100 rounded-3xl p-8 shadow-lg">
                    <div className="text-center">
                      <div className="text-6xl mb-4" style={{ animation: 'pulse-heart 3s ease-in-out infinite' }}>💝</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Fundado con Amor</h3>
                      <p className="text-gray-600">
                        Por la intersección entre fashion & technology, por la innovación que empodera, 
                        y por un futuro más consciente y personalizado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className={`mb-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-['Anton'] tracking-wider uppercase mb-6">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Nuestros Valores
                </span>
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                Los principios que guían cada decisión y cada línea de código que escribimos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative transform transition-all duration-500 hover:scale-105"
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  {/* Halo Effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500 -z-10`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full z-10"></div>
                    
                    {/* Content */}
                    <div className="relative z-20">
                      <div className="text-5xl mb-6" style={{ animation: hoveredValue === index ? 'float-gentle 3s ease-in-out infinite' : 'none' }}>
                        {value.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className={`mb-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-['Anton'] tracking-wider uppercase mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Nuestro Camino
                </span>
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                Desde la idea inicial hasta la revolución de la moda con IA.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-teal-400 to-purple-400 rounded-full hidden lg:block"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-12 gap-6`}
                  >
                    {/* Content */}
                    <div className="flex-1 lg:text-right" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                      <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="text-emerald-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                        {milestone.icon}
                      </div>
                    </div>
                    
                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className={`mb-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white text-center shadow-2xl">
              <h2 className="text-4xl lg:text-6xl font-['Anton'] tracking-wider uppercase mb-8">
                Nuestra Misión
              </h2>
              
              <p className="text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                "Ser el primer marketplace 100% potenciado por IA que transforme la forma en que el mundo 
                consume moda, promoviendo la sostenibilidad, la personalización y la expresión auténtica 
                del estilo personal."
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                  <p className="text-indigo-100">Transformar el consumo de moda a nivel mundial</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Personalización Total</h3>
                  <p className="text-indigo-100">Cada usuario tiene su experiencia única</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">♻️</div>
                  <h3 className="text-xl font-bold mb-2">Sostenibilidad</h3>
                  <p className="text-indigo-100">Acabar con la moda rápida para siempre</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us */}
          <div className={`text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 shadow-xl max-w-5xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-['Anton'] tracking-wider uppercase mb-8">
                <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Únete a la Revolución
                </span>
              </h2>
              
              <p className="text-gray-600 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Estamos construyendo el futuro de la moda y la tecnología. Si compartes nuestra visión 
                y quieres ser parte de esta revolución, te invitamos a colaborar con nosotros.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200/50">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="font-bold text-gray-800 mb-2">Marcas</h3>
                  <p className="text-gray-600 text-sm">Sé parte del primer marketplace AI-powered</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200/50">
                  <div className="text-3xl mb-4">💻</div>
                  <h3 className="font-bold text-gray-800 mb-2">Desarrolladores</h3>
                  <p className="text-gray-600 text-sm">Construye el futuro de fashion tech</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/50">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="font-bold text-gray-800 mb-2">Creativos</h3>
                  <p className="text-gray-600 text-sm">Ayuda a definir la experiencia del usuario</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:earlytowear@gmail.com"
                  className="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold hover:from-rose-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Colabora con Nosotros
                </a>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 13l-8-5h16l-8 5zm0 2l-8-5v10h16V10l-8 5z"/>
                  </svg>
                  <span>earlytowear@gmail.com</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Juntos podemos crear el futuro de la moda consciente y personalizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}