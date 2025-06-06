import { sdk } from "../config"
import medusaError from "@/lib/helpers/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "@/lib/data/client-safe-cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "no-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export const retrieveRegion = async (id: string) => {
  console.log('🔍 retrieveRegion called with ID:', id)
  
  // Si nos piden la región de Europa, devolver Colombia en su lugar
  if (id === 'reg_01JWACGS0Y421HVZEYHE4K3V4P') {
    console.log('🇨🇴 Intercepting Europe region request, returning Colombia instead')
    const regions = await listRegions()
    const colombiaRegion = regions?.find(region => 
      region.currency_code?.toLowerCase() === 'cop'
    )
    
    if (colombiaRegion) {
      console.log('✅ Returning Colombia region:', colombiaRegion.name)
      return colombiaRegion
    }
  }

  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "no-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError)
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode: string) => {
  console.log(`🇨🇴 getRegion called for countryCode: ${countryCode} - FORCING COLOMBIA`)
  
  try {
    const regions = await listRegions()

    if (!regions || regions.length === 0) {
      console.error('❌ No regions found')
      return null
    }

    console.log('📋 Available regions:', regions.map(r => `${r.name} (${r.currency_code})`))

    // SIEMPRE buscar Colombia primero, sin importar el país
    const colombiaRegion = regions.find(region => 
      region.currency_code?.toLowerCase() === 'cop'
    )

    if (colombiaRegion) {
      console.log('✅ FORCED Colombia region:', {
        id: colombiaRegion.id,
        name: colombiaRegion.name,
        currency: colombiaRegion.currency_code
      })
      return colombiaRegion
    }

    console.warn('⚠️ Colombia region not found, using first available region')
    // Fallback to first available region if Colombia not found
    const fallbackRegion = regions[0]
    console.log('🆘 Using fallback region:', fallbackRegion.name)
    return fallbackRegion
  } catch (e: any) {
    console.error('❌ Error in getRegion:', e)
    return null
  }
}

// Función helper para debug
export const debugRegions = async () => {
  console.log('🔍 Debug: Listing all regions...')
  const regions = await listRegions()
  
  if (regions) {
    regions.forEach(region => {
      console.log(`- ${region.name}: ${region.currency_code} (ID: ${region.id})`)
    })
  }
  
  return regions
}