// Proveedor/contexto para Wompi si necesitas compartir estado entre componentes

import React, { createContext } from 'react'

export const WompiContext = createContext(false)

const WompiWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Aquí puedes inicializar el SDK de Wompi si aplica
  return (
    <WompiContext.Provider value={true}>
      {children}
    </WompiContext.Provider>
  )
}

export default WompiWrapper
