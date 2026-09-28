import type { Drug, PharmacyDrugOffer } from '@/types'
import { pharmaciesSeed } from './pharmacies'

export const drugsSeed: Drug[] = [
  { id: 'dr1', name: 'Paratsetamol 500 mg', category: 'Ogʻriq qoldiruvchi', basePrice: 8000 },
  { id: 'dr2', name: 'Ibuprofen 400 mg', category: 'Ogʻriq qoldiruvchi', basePrice: 12000 },
  { id: 'dr3', name: 'Nurofen Express', category: 'Ogʻriq qoldiruvchi', basePrice: 25000 },
  { id: 'dr4', name: 'Coldrex', category: 'Shamollash', basePrice: 35000 },
  { id: 'dr5', name: 'TeraFlu', category: 'Shamollash', basePrice: 42000 },
  { id: 'dr6', name: 'Ambroxol sirop', category: 'Yoʻtal', basePrice: 18000 },
  { id: 'dr7', name: 'Lazolvan', category: 'Yoʻtal', basePrice: 55000 },
  { id: 'dr8', name: 'Suprastin', category: 'Allergiya', basePrice: 15000 },
  { id: 'dr9', name: 'Cetirizine', category: 'Allergiya', basePrice: 22000 },
  { id: 'dr10', name: 'Omeprazol 20 mg', category: 'Oshqozon', basePrice: 14000 },
  { id: 'dr11', name: 'Mezim', category: 'Oshqozon', basePrice: 28000 },
  { id: 'dr12', name: 'Smecta', category: 'Oshqozon', basePrice: 32000 },
  { id: 'dr13', name: 'Vitamin D3', category: 'Vitamin', basePrice: 45000 },
  { id: 'dr14', name: 'Multivitamin Kompleks', category: 'Vitamin', basePrice: 38000 },
  { id: 'dr15', name: 'Magniy B6', category: 'Vitamin', basePrice: 30000 },
  { id: 'dr16', name: 'No-shpa', category: 'Spazmolitik', basePrice: 20000 },
  { id: 'dr17', name: 'Drotaverin', category: 'Spazmolitik', basePrice: 9000 },
  { id: 'dr18', name: 'Amoksiklav', category: 'Antibiotik', basePrice: 48000 },
  { id: 'dr19', name: 'Azitromitsin', category: 'Antibiotik', basePrice: 52000 },
  { id: 'dr20', name: 'Loratadin', category: 'Allergiya', basePrice: 11000 },
  { id: 'dr21', name: 'Nimesil', category: 'Ogʻriq qoldiruvchi', basePrice: 65000 },
  { id: 'dr22', name: 'Ketorol', category: 'Ogʻriq qoldiruvchi', basePrice: 24000 },
  { id: 'dr23', name: 'Ingavirin', category: 'Antiviral', basePrice: 85000 },
  { id: 'dr24', name: 'Arbidol', category: 'Antiviral', basePrice: 72000 },
  { id: 'dr25', name: 'Validol', category: 'Yurak', basePrice: 6000 },
  { id: 'dr26', name: 'Corvalol', category: 'Yurak', basePrice: 7000 },
  { id: 'dr27', name: 'Aktivlangan koʻmir', category: 'Oshqozon', basePrice: 5000 },
  { id: 'dr28', name: 'Regidron', category: 'Rehydratatsiya', basePrice: 16000 },
  { id: 'dr29', name: 'Chlorhexidine', category: 'Antiseptik', basePrice: 13000 },
  { id: 'dr30', name: 'Betadine', category: 'Antiseptik', basePrice: 34000 },
]

function offer(pharmacyId: string, drugId: string, offset: number): PharmacyDrugOffer {
  const drug = drugsSeed.find((d) => d.id === drugId)!
  const inStock = (hash(pharmacyId + drugId) % 7) !== 0
  return {
    pharmacyId,
    drugId,
    price: drug.basePrice + offset,
    inStock,
    stock: inStock ? 5 + (hash(drugId) % 40) : 0,
  }
}

function hash(s: string): number {
  return s.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
}

export const pharmacyOffersSeed: PharmacyDrugOffer[] = pharmaciesSeed.flatMap((ph) =>
  drugsSeed.map((dr, i) => offer(ph.id, dr.id, (i % 5) * 1000)),
)

export function getOffersForDrug(drugId: string) {
  return pharmacyOffersSeed.filter((o) => o.drugId === drugId)
}
