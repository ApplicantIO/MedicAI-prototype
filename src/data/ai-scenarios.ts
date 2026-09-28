import type { AIResult, UrgencyLevel } from '@/types'

export type AIStepKind = 'chips' | 'text' | 'slider' | 'multiselect' | 'result'

export interface AIStep {
  id: string
  aiMessage: string
  kind: AIStepKind
  chips?: string[]
  multiselectOptions?: string[]
  sliderLabel?: string
}

export interface AIScenario {
  id: string
  keywords: string[]
  chipLabel: string
  steps: AIStep[]
  result: AIResult
}

const disclaimer =
  'Bu tashxis emas, faqat dastlabki yoʻnalish. Demo maʼlumot. Shoshilinch holatda 103 ga murojaat qiling.'

function result(
  directions: string[],
  urgency: UrgencyLevel,
  specialist: string,
  selfCare: string[],
  emergency?: boolean,
  emergencyNote?: string,
): AIResult {
  return { directions, urgency, specialist, selfCare, emergency, emergencyNote }
}

export const AI_SCENARIOS: AIScenario[] = [
  {
    id: 'headache',
    keywords: ['bosh', 'migren', 'bosh og'],
    chipLabel: 'Bosh ogʻrigʻi',
    steps: [
      { id: 'h1', aiMessage: 'Salom! Asosiy shikoyatingiz nima?', kind: 'chips', chips: ['Bosh ogʻrigʻi', 'Yoʻtal', 'Qorin ogʻrigʻi', 'Boshqa'] },
      { id: 'h2', aiMessage: 'Bosh ogʻrigʻi qachondan beri?', kind: 'chips', chips: ['Bugun', '2–3 kun', 'Bir haftadan ortiq'] },
      { id: 'h3', aiMessage: 'Ogʻirlik darajasini 1–10 oraligʻida baholang.', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 'h4', aiMessage: 'Qoʻshimcha belgilar bormi?', kind: 'multiselect', multiselectOptions: ['Koʻz oldida chaqnash', 'Koʻngil aynishi', 'Yorugʻlikka sezgirlik', 'Yoʻq'] },
      { id: 'h5', aiMessage: 'Yosh guruhingiz?', kind: 'chips', chips: ['18–30', '31–50', '51+'] },
    ],
    result: result(
      ['Tension tipidagi bosh ogʻrigʻi ehtimoli', 'Migren belgilari tekshiriladi'],
      'medium',
      'Nevrolog',
      ['Yetarli suv iching', 'Ekran vaqtini kamaytiring', 'Dam oling'],
    ),
  },
  {
    id: 'cough',
    keywords: ['yoʻtal', 'yotal', 'shamol', 'tomoq'],
    chipLabel: 'Yoʻtal / shamollash',
    steps: [
      { id: 'c1', aiMessage: 'Yoʻtal quruqmi yoki balgam bilanmi?', kind: 'chips', chips: ['Quruq', 'Balgam bilan', 'Bilmayman'] },
      { id: 'c2', aiMessage: 'Isitma bormi?', kind: 'chips', chips: ['Ha', 'Yoʻq', 'Baʼzan'] },
      { id: 'c3', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 'c4', aiMessage: 'Qoʻshimcha belgilar:', kind: 'multiselect', multiselectOptions: ['Burun oqishi', 'Tomoq ogʻrigʻi', 'Nafas qisilishi', 'Yoʻq'] },
      { id: 'c5', aiMessage: 'Davomiyligi?', kind: 'chips', chips: ['3 kungacha', '4–7 kun', '1 haftadan ortiq'] },
    ],
    result: result(
      ['Virusli shamollash ehtimoli', 'Yuqori nafas yoʻllari irritatsiyasi'],
      'low',
      'Terapevt',
      ['Issiq suyuqlik', 'Dam olish', 'Paratsetamol dozasi boʻyicha shifokorga murojaat'],
    ),
  },
  {
    id: 'stomach',
    keywords: ['qorin', 'oshqozon', 'ichak'],
    chipLabel: 'Qorin ogʻrigʻi',
    steps: [
      { id: 's1', aiMessage: 'Ogʻriq qayerda aniqroq?', kind: 'chips', chips: ['Yuqori qorin', 'Pastki qorin', 'Butun qorin'] },
      { id: 's2', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 's3', aiMessage: 'Qoʻshimcha belgilar:', kind: 'multiselect', multiselectOptions: ['Koʻngil aynishi', 'Qusish', 'Isitma', 'Ich qotishi'] },
      { id: 's4', aiMessage: 'Ovqatdan keyin kuchayadimi?', kind: 'chips', chips: ['Ha', 'Yoʻq', 'Bilmayman'] },
    ],
    result: result(
      ['Gastrit yoki ovqat hazmi buzilish ehtimoli'],
      'medium',
      'Gastroenterolog',
      ['Yengil ovqat', 'Spazmolitik faqat shifokor tavsiyasi bilan', 'Koʻp suv'],
    ),
  },
  {
    id: 'fever',
    keywords: ['isitma', 'temperatura', 'qizib'],
    chipLabel: 'Isitma',
    steps: [
      { id: 'f1', aiMessage: 'Taxminiy temperatura?', kind: 'chips', chips: ['37–37.5', '37.6–38.5', '38.6+'] },
      { id: 'f2', aiMessage: 'Qancha vaqt davom etmoqda?', kind: 'chips', chips: ['1 kun', '2–3 kun', '3 kundan ortiq'] },
      { id: 'f3', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 'f4', aiMessage: 'Boshqa belgilar:', kind: 'multiselect', multiselectOptions: ['Yoʻtal', 'Tomoq ogʻrigʻi', 'Teri toshmasi', 'Yoʻq'] },
    ],
    result: result(['Virusli infeksiya ehtimoli', 'Infeksiya manbaini aniqlash kerak'], 'medium', 'Terapevt', [
      'Suv va dam olish',
      'Paratsetamol — dozani shifokor bilan kelishing',
    ]),
  },
  {
    id: 'skin',
    keywords: ['teri', 'qichish', 'toshma', 'syp'],
    chipLabel: 'Teri toshmasi',
    steps: [
      { id: 'sk1', aiMessage: 'Toshma qachon paydo boʻldi?', kind: 'chips', chips: ['Bugun', 'Bir necha kun', 'Uzoq vaqt'] },
      { id: 'sk2', aiMessage: 'Qichish bormi?', kind: 'chips', chips: ['Kuchli', 'Oʻrtacha', 'Yoʻq'] },
      { id: 'sk3', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 'sk4', aiMessage: 'Qoʻshimcha:', kind: 'multiselect', multiselectOptions: ['Isitma', 'Nafas qisilishi', 'Yuz shishi', 'Yoʻq'] },
    ],
    result: result(['Allergik reaksiya yoki ekzema ehtimoli'], 'low', 'Dermatolog', [
      'Trikotaj kiyim',
      'Maʼlum allergenlardan uzoqlashing',
      'Shifokor koʻrigiga boring',
    ]),
  },
  {
    id: 'tooth',
    keywords: ['tish', 'tish og'],
    chipLabel: 'Tish ogʻrigʻi',
    steps: [
      { id: 't1', aiMessage: 'Ogʻriq doimiy yoki urishma?', kind: 'chips', chips: ['Doimiy', 'Urishma', 'Ikkalasi'] },
      { id: 't2', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 't3', aiMessage: 'Yuz shishishi bormi?', kind: 'chips', chips: ['Ha', 'Yoʻq'] },
      { id: 't4', aiMessage: 'Isitma?', kind: 'chips', chips: ['Ha', 'Yoʻq'] },
    ],
    result: result(['Tish yoki milk pulpa inflamatsiyasi ehtimoli'], 'medium', 'Stomatolog', [
      'Ogʻiz gigiyenasi',
      'Issiq kompress qilmang',
      'Tez orada stomatolog qabuliga boring',
    ]),
  },
  {
    id: 'chest',
    keywords: ['koʻkrak', 'kokrak', 'nafas', 'yurak'],
    chipLabel: 'Koʻkrak ogʻrigʻi',
    steps: [
      { id: 'ch1', aiMessage: 'Koʻkrak ogʻrigʻi va nafas qisilishi bormi?', kind: 'chips', chips: ['Ha, ikkalasi', 'Faqat ogʻriq', 'Faqat nafas qisilishi'] },
      { id: 'ch2', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 'ch3', aiMessage: 'Ogʻriq qayerga tarqaladi?', kind: 'chips', chips: ['Chap qo'l', 'Orqa', 'Tarqalmaydi'] },
    ],
    result: result(
      ['Yurak-qon tomir yoki nafas yoʻllari muammosi ehtimoli — shoshilinch baholash kerak'],
      'high',
      'Kardiolog',
      ['Darhol tinch joy', '103 ga qoʻngʻiroq qiling'],
      true,
      'Koʻkrak ogʻrigʻi va nafas qisilishi shoshilinch holat. 103 ga qoʻngʻiroq qiling.',
    ),
  },
  {
    id: 'general',
    keywords: [],
    chipLabel: 'Boshqa',
    steps: [
      { id: 'g1', aiMessage: 'Asosiy shikoyatingizni qisqacha yozing.', kind: 'text' },
      { id: 'g2', aiMessage: 'Qancha vaqt davom etmoqda?', kind: 'chips', chips: ['Bugun', 'Bir necha kun', 'Uzoq'] },
      { id: 'g3', aiMessage: 'Ogʻirlik (1–10)?', kind: 'slider', sliderLabel: 'Ogʻirlik' },
      { id: 'g4', aiMessage: 'Isitma yoki nafas qisilishi bormi?', kind: 'chips', chips: ['Ha', 'Yoʻq', 'Bilmayman'] },
    ],
    result: result(['Umumiy holat baholash kerak'], 'low', 'Terapevt', ['Dam oling', 'Suv iching', 'Shifokor qabuliga yoziling']),
  },
]

export const AI_DISCLAIMER = disclaimer

export function matchScenario(text: string, chip?: string): AIScenario {
  const lower = text.toLowerCase()
  if (chip) {
    const byChip = AI_SCENARIOS.find((s) => s.chipLabel === chip)
    if (byChip) return byChip
  }
  for (const s of AI_SCENARIOS) {
    if (s.keywords.some((k) => lower.includes(k))) return s
  }
  if (lower.includes('koʻkrak') || lower.includes('nafas qis')) {
    return AI_SCENARIOS.find((s) => s.id === 'chest')!
  }
  return AI_SCENARIOS.find((s) => s.id === 'general')!
}

export const INITIAL_AI_CHIPS = AI_SCENARIOS.filter((s) => s.id !== 'general' && s.id !== 'chest').map(
  (s) => s.chipLabel,
)
