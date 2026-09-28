# Medic AI — Prototype TZ

- **Hujjat:** frontend-only interaktiv prototip uchun texnik topshiriq
- **Loyiha:** Medic AI (tibbiy hamroh)
- **Maqsad:** taqdimotdan keyin ham har kim mahsulotni "qoʻl bilan ushlab" koʻra oladigan demo
- **Joylashtirish:** Vercel (statik hosting)
- **Til:** Oʻzbek (lotin), texnik atamalar ingliz tilida

---

## 1. Qisqacha

Biz backend, real AI va toʻlov tizimisiz, faqat brauzerda ishlaydigan **klikbop prototip** qilamiz. Prototip Medic AI qanday koʻrinishi va qanday ishlashini koʻrsatadi: foydalanuvchi ilovasi (mobil koʻrinishda) va dorixona, klinika, shifokorlar uchun veb panellar (kompyuter koʻrinishida).

**Asosiy prinsiplar**

1. **Faqat frontend.** Server, baza, API, autentifikatsiya yoʻq. Hamma maʼlumot kodning ichidagi mock (soxta) maʼlumot.
2. **"Haqiqiydek his qilinsin".** AI chat, buyurtma holatlari, onlayn konsultatsiya, dashboardlar jonli koʻrinadi, lekin ostida oddiy ssenariylar ishlaydi.
3. **Minimalistik dizayn.** Taqdimot decki bilan bir xil uslub: oq/qora, Inter shrifti, bitta toʻq sariq aksent.
4. **Tez va yengil.** Ochilishi 2 soniyadan kam, telefonda ham silliq.
5. **Xavfsiz demo.** Barcha ismlar, klinikalar, dorixonalar, narxlar **toʻqib chiqarilgan**. Real brend, real shifokor yoki real bemor maʼlumoti ishlatilmaydi.

**Prototipga kirmaydi:** real AI/LLM, real video-qoʻngʻiroq, real toʻlov, real xarita API, ombor integratsiyasi, haqiqiy login, server.

---

## 2. Uchta sirt (kim nimani koʻradi)

| Sirt | Kim uchun | Koʻrinish | Yoʻl |
|---|---|---|---|
| **Hub** | Demo koʻruvchi (hakam, investor) | Kompyuter va telefon | `/` va `/demo` |
| **Foydalanuvchi ilovasi** | Bemor / oddiy foydalanuvchi | **Mobil layout** (390×844). Kompyuterda markazda telefon ramkasi ichida | `/app/*` |
| **Pro panel** | Dorixona, klinika/shifoxona, shifokor | **Veb layout** (kompyuter, 1024 px va undan keng) | `/pro/*` |

---

## 3. Sahifalar xaritasi

**Jami: 34 ta sahifa.** Ustuvorlik: **P0** — demo uchun majburiy (20 ta), **P1** — kuchaytiruvchi (12 ta), **P2** — vaqt qolsa (2 ta).

### 3.1. Hub (2 ta)

| ID | Yoʻl | Nima uchun | Asosiy elementlar va funksiyalar | Ust. |
|---|---|---|---|---|
| H1 | `/` | Demo kirish nuqtasi | Sarlavha "Medic AI — interaktiv prototip". 4 ta karta: **Foydalanuvchi ilovasi**, **Dorixona paneli**, **Klinika paneli**, **Shifokor paneli**. Telefonda ochish uchun **QR-kod**. Kichik yozuv: "Demo maʼlumotlar, tibbiy maslahat emas". Yorugʻ/qorongʻi rejim tugmasi | P0 |
| H2 | `/demo` | **Split-view**: bir ekranda telefon (chapda) va dashboard (oʻngda) | Foydalanuvchi ilovasida qilingan harakat (buyurtma, qabul) oʻsha zahoti panelda koʻrinadi. Rolni almashtirish (dorixona/klinika/shifokor). Taqdimotdan keyingi asosiy "wow" sahifa | P1 |

### 3.2. Foydalanuvchi ilovasi — mobil (17 ta)

Pastda tab-bar: **Bosh · AI · Shifokor · Dorixona · Profil**.

| ID | Yoʻl | Nima uchun | Asosiy elementlar va funksiyalar | Ust. |
|---|---|---|---|---|
| U1 | `/app/welcome` | Tanishuv | 3 ta qisqa slayd (AI tekshiruv, shifokor, dorixona), "Boshlash" tugmasi. Faqat birinchi ochilishda | P0 |
| U2 | `/app` | Bosh sahifa | Salomlashuv. Katta **"AI bilan tekshirish"** kartasi (asosiy CTA). Tezkor tugmalar: Shifokor, Dorixona, Klinika, Xarita. Yaqin qabul (agar bor). Yaqin atrofdagi 3 ta provayder | P0 |
| U3 | `/app/ai` | **AI Diagnostika chat** (beachhead) | Chat koʻrinishi. AI savol beradi, foydalanuvchi matn yozadi yoki chip tanlaydi. Yozayotganini koʻrsatuvchi animatsiya. Ogʻirlik slayderi (1–10). Belgilarni koʻp tanlash. Progress. "Qaytadan boshlash". Ogohlantirish: "Bu tashxis emas" | P0 |
| U4 | `/app/ai/result` | AI natija | **Dastlabki baho**: ehtimoliy yoʻnalishlar (ikkitadan uchtagacha), **shoshilinchlik darajasi** (past/oʻrta/yuqori), tavsiya etilgan **mutaxassis turi**, oʻzini parvarish maslahatlari. Tavsiya etilgan shifokorlar roʻyxati. Tugmalar: "Qabulga yozilish", "Onlayn konsultatsiya", "Dorixona". Ogohlantirish matni | P0 |
| U5 | `/app/doctors` | Shifokorlar | Qidiruv, mutaxassislik filtri (chip), saralash (reyting / narx / yaqinlik), "Faqat onlayn" toggle. Shifokor kartalari | P0 |
| U6 | `/app/doctors/:id` | Shifokor profili | Bosh harflar avatari, mutaxassislik, tajriba, klinika, reyting, sharhlar, narxlar, bugungi boʻsh vaqtlar. Tugmalar: "Qabulga yozilish", "Onlayn konsultatsiya" | P0 |
| U7 | `/app/book/:id` | Qabulga yozilish | Qadamlar: **turi** (oflayn/onlayn) › **sana** (7 kunlik lenta) › **vaqt** (slotlar, band boʻlganlari oʻchirilgan) › **tasdiqlash**. Muvaffaqiyat holati: qabul kodi va "Qabullarim"ga oʻtish | P0 |
| U8 | `/app/appointments` | Qabullarim | Ikki tab: **Kelgusi** / **Oʻtgan**. Bekor qilish va koʻchirish (mock). Onlayn qabul uchun "Ulanish" tugmasi | P0 |
| U9 | `/app/pharmacy` | Dorixona: dori qidirish | Qidiruv (avtoyakunlash). Natija: dorixonalar roʻyxati, har birida **narx, masofa, mavjudligi**. "Savatga" tugmasi. Reklama belgili (yuqori oʻrin sotib olgan) dorixona birinchi chiqadi | P0 |
| U10 | `/app/orders/:id` | Buyurtma kuzatuvi + dorixona bilan chat | Holatlar chizigʻi: **Qabul qilindi › Tayyorlanmoqda › Tayyor › Yetkazildi**. Holat Pro paneldagi harakatga qarab oʻzgaradi. Dorixona bilan qisqa chat | P0 |
| U15 | `/app/cart` | Savat va rasmiylashtirish | Mahsulotlar, miqdorni oʻzgartirish, **olib ketish / yetkazib berish**, toʻlov usuli (mock: karta/naqd), "Buyurtma berish" | P0 |
| U11 | `/app/consult/:id` | Onlayn konsultatsiya | **Video-qoʻngʻiroq maketi** (real video yoʻq): shifokor avatari, oʻz kichik oynasi, taymer, mikrofon/kamera tugmalari. Yon tomonda chat (ssenariy boʻyicha javob beradi). Tugagach: xulosa va retsept kartasi › "Dorixonadan buyurtma qilish" | P1 |
| U12 | `/app/clinics` | Klinika va shifoxonalar | Qidiruv, filtr (klinika/shifoxona), roʻyxat, reyting, masofa | P1 |
| U13 | `/app/clinics/:id` | Klinika profili | Tavsif, xizmatlar, shifokorlar, ish vaqti, "Qabulga yozilish" | P1 |
| U14 | `/app/pharmacy/:id` | Dorixona profili | Manzil, ish vaqti, mashhur dorilar, "Chat" | P1 |
| U16 | `/app/map` | Xarita | **Stilizatsiya qilingan SVG xarita** (Google Maps yoʻq). Filtr: klinika / dorixona / shifoxona. Pinni bosganda pastdan varaq (bottom sheet) | P1 |
| U17 | `/app/profile` | Profil va sozlamalar | Demo foydalanuvchi, AI tekshiruvlar tarixi, saqlangan shifokorlar, **qorongʻi rejim**, "Demoni tiklash" | P1 |

### 3.3. Pro panel — veb (15 ta)

Chap sidebar (rolga qarab menyu), tepada topbar (rol almashtirgich, qidiruv, profil).

| ID | Yoʻl | Rol | Nima uchun | Asosiy elementlar va funksiyalar | Ust. |
|---|---|---|---|---|---|
| B1 | `/pro/login` | Hammasi | Kirish maketi | Rol tanlash (Dorixona / Klinika / Shifokor). Real parol yoʻq: **"Demo bilan kirish"** tugmasi | P0 |
| B2 | `/pro/pharmacy` | Dorixona | Dashboard | KPI kartalar (bugungi buyurtmalar, tushum, kutilayotgan, tugayotgan tovar). Haftalik buyurtmalar grafigi. Oxirgi buyurtmalar | P0 |
| B3 | `/pro/pharmacy/orders` | Dorixona | Buyurtmalar | **Kanban**: Yangi › Tayyorlanmoqda › Tayyor › Yetkazildi. Kartani keyingi holatga oʻtkazish. Buyurtma tafsiloti (yon panel). Foydalanuvchi ilovasidan kelgan buyurtmalar shu yerda paydo boʻladi | P0 |
| B4 | `/pro/pharmacy/inventory` | Dorixona | Ombor va **maʼlumotlarni ulash** | Dorilar jadvali (qidiruv, qoldiq, narx). Kam qolganlari belgilanadi. Narx va qoldiqni jadvalning oʻzida tahrirlash. **"Maʼlumotlarni ulash" wizardi**: manba tanlash (Excel/CSV/ombor tizimi) › fayl yuklash (mock) › ustunlarni moslash › "Ulandi" | P0 |
| B5 | `/pro/clinic` | Klinika | Dashboard | KPI (bugungi qabullar, yangi bemorlar, onlayn konsultatsiyalar, reyting). Bugungi jadval. Yangi murojaatlar | P0 |
| B6 | `/pro/clinic/appointments` | Klinika | Qabullar | Kun/hafta koʻrinishi, roʻyxat. Foydalanuvchi yozilgan qabullar shu yerda chiqadi. **Tasdiqlash / rad etish / koʻchirish** | P0 |
| B7 | `/pro/clinic/doctors` | Klinika | Shifokorlar boshqaruvi | Shifokorlar jadvali, "Shifokor qoʻshish" formasi, ish jadvali | P1 |
| B8 | `/pro/clinic/network` | Klinika | **Mijoz va dorixona topish** | Ikki tab. **Talab** (mijozlar): hududlar boʻyicha anonim AI-tekshiruv statistikasi (masalan, "Yunusobod: 34 ta murojaat › nevrolog"). **Dorixonalar**: hamkor izlash, "Hamkorlik soʻrovi" yuborish | P1 |
| B9 | `/pro/doctor` | Shifokor | Dashboard | Bugungi konsultatsiyalar, navbat, qisqa statistika | P0 |
| B10 | `/pro/doctor/consultations` | Shifokor | Konsultatsiyalar | Roʻyxat. **"Boshlash"** › video maketi + bemor chati + yozuv maydoni + **retsept** (mock). Yakunlagach bemor ilovasida xulosa chiqadi | P0 |
| B11 | `/pro/doctor/schedule` | Shifokor | Ish jadvali | Haftalik jadval, slot davomiyligi, tanaffus. Oʻzgartirish foydalanuvchi ilovasidagi boʻsh vaqtlarga taʼsir qiladi | P1 |
| B12 | `/pro/doctor/patients` | Shifokor | Bemorlar | Bemorlar roʻyxati, qabullar tarixi (qisqa) | P2 |
| B13 | `/pro/messages` | Hammasi | Xabarlar | Suhbatlar roʻyxati + suhbat oynasi. Dorixona: mijoz bilan; klinika: bemor va dorixona bilan; shifokor: bemor bilan | P1 |
| B14 | `/pro/license` | Hammasi | **Litsenziya va reklama** | Yillik litsenziya holati va **tarif kartalari** (narxlar — namuna, "demo"). **Qidiruvda yuqori oʻrin** sotib olish (toggle) › foydalanuvchi ilovasida shu provayder "Reklama" belgisi bilan yuqorida chiqadi. **Komissiya** jadvali (xizmat turi boʻyicha) | P1 |
| B15 | `/pro/settings` | Hammasi | Profil va sozlamalar | Provayder maʼlumoti, qorongʻi rejim, "Demoni tiklash" | P2 |

---

## 4. Asosiy funksiyalar qanday ishlaydi

### 4.1. AI Diagnostika (soxta AI, ssenariy asosida)

Real AI **yoʻq**. Chat oldindan yozilgan **holatlar mashinasi (state machine)** boʻyicha ishlaydi:

1. **Salomlashuv** va asosiy shikoyat: erkin matn yoki chiplar (bosh ogʻrigʻi, yoʻtal/shamollash, qorin ogʻrigʻi, isitma, teri toshmasi, tish ogʻrigʻi, boshqa).
2. **Kalit soʻz moslash:** yozilgan matnda kalit soʻz topilsa (masalan, "bosh", "yoʻtal", "qorin") — mos ssenariy tanlanadi. Topilmasa — umumiy ssenariy.
3. **4–6 ta aniqlashtiruvchi savol** (ssenariyga bogʻliq): davomiyligi, ogʻirligi (1–10 slayder), qoʻshimcha belgilar (koʻp tanlash), yosh guruhi.
4. **Xavf belgilari (red flag):** masalan, koʻkrak ogʻrigʻi + nafas qisilishi › darhol **"Shoshilinch"** natija va **103** ga qoʻngʻiroq qilish tavsiyasi. Bu holatda shifokor tavsiyasi ikkinchi oʻrinda.
5. **Natija (U4):** ssenariy fayldagi tayyor natija: yoʻnalishlar, shoshilinchlik, mutaxassis turi, oʻzini parvarish maslahati.
6. **Animatsiya:** har javobdan oldin 600–1200 ms "yozmoqda…" holati, javob asta paydo boʻladi.

Talablar:
- Kamida **6 ta ssenariy** tayyor boʻlsin (yuqoridagi shikoyatlar) + 1 ta umumiy.
- Ssenariylar alohida faylda (`src/data/ai-scenarios.ts`), koddan ajratilgan, oson tahrirlanadi.
- Har joyda ogohlantirish: **"Bu tashxis emas, yoʻnalish. Demo."**
- Natija matnlarini yakunlashdan oldin **tibbiy maslahatchi koʻrib chiqadi** (prototipda oddiy, ehtiyotkor formulalar).

### 4.2. Holat (state) va sinxronizatsiya

- Yagona global store (**Zustand**), `localStorage` ga saqlanadi (sahifani yangilasa ham yoʻqolmaydi).
- **Bir brauzer ichida** oynalar/tablar oʻrtasida jonli sinxronizatsiya (`storage` hodisasi yoki `BroadcastChannel`).
- Shu sababli: foydalanuvchi ilovasida buyurtma bersa › Pro panelda (boshqa tab yoki `/demo` split-view) darhol chiqadi; dorixona holatni oʻzgartirsa › foydalanuvchi ilovasida kuzatuv chizigʻi yangilanadi.
- **Cheklov:** turli qurilmalar (telefon va noutbuk) oʻrtasida sinxronizatsiya **yoʻq**. Shuning uchun jonli koʻrsatish uchun `/demo` split-view ishlatiladi. QR bilan telefonda ochilgan nusxa mustaqil ishlaydi.

### 4.3. Buyurtma hayot sikli

`Qabul qilindi › Tayyorlanmoqda › Tayyor › Yetkazildi`
- Pro panelda tugma bilan oʻtkaziladi.
- **Demo tezlashtirgich:** yoqilsa, holat har 8 soniyada oʻzi oʻtadi (panel ochilmagan boʻlsa ham foydalanuvchi natijani koʻradi).
- Har oʻtishda bildirishnoma (toast).

### 4.4. Qabulga yozilish

- Slotlar shifokorning ish jadvalidan **deterministik** yaratiladi (tasodifiy emas: bir xil kun — bir xil slotlar). Bir qismi "band".
- Tasdiqlangan qabul store ga yoziladi, klinika panelida (B6) va shifokor panelida chiqadi.
- Klinika "Tasdiqlash / rad etish" bosganda foydalanuvchi ilovasida holat yangilanadi.

### 4.5. Onlayn konsultatsiya (maket)

- Real video yoʻq. Video oʻrnida avatar va soxta "tirik" holat (taymer, mikrofon indikatori).
- Chat: shifokor tomondan 3–4 ta tayyor javob ketma-ket keladi.
- Tugash: xulosa kartasi (tavsiyalar + retsept dorilari). "Dorixonadan buyurtma qilish" tugmasi retsept dorilarini savatga soladi (ekotizim: konsultatsiya › dorixona).

### 4.6. Dorixona: qidiruv, reyting va reklama

- Dori qidirilganda har dorixona uchun **mavjudlik, narx, masofa** koʻrsatiladi (mock maʼlumot).
- Saralash: reklama sotib olganlar (B14) › keyin masofa/narx boʻyicha. Reklama joylari **"Reklama"** belgisi bilan aniq ajratiladi.

### 4.7. Maʼlumotlarni ulash (dorixona)

- Wizard 3 qadam. Foydalanuvchi istalgan fayl tanlasa ham, **soxta yuklash jarayoni** (progress) va **tayyor koʻrinish** (oldindan belgilangan 20 qator) chiqadi. Real parsing shart emas.
- Yakunda "Ulandi" belgisi va oxirgi sinxronizatsiya vaqti chiqadi; ombor jadvali toʻladi.

### 4.8. Demo boshqaruv paneli

Ekran burchagida yashirin/yigʻiladigan **Demo panel**:
- **Demoni tiklash** (barcha maʼlumot boshlangʻich holatga).
- **Tezlashtirgich** (buyurtma holati avtomatik oʻtishi).
- **Rolni tez almashtirish**.
- **Ssenariyga oʻtish** (masalan, "AI: bosh ogʻrigʻi").
- Prototip belgisi: "Prototype · demo maʼlumotlar".

---

## 5. Mock maʼlumotlar (hammasi toʻqilgan)

| Toʻplam | Soni | Izoh |
|---|---|---|
| Shifokorlar | 12 | 6–7 mutaxassislik (terapevt, nevrolog, kardiolog, pediatr, dermatolog, gastroenterolog, stomatolog). Fiktiv ismlar, bosh harflar avatari |
| Klinika va shifoxonalar | 6 | Fiktiv nomlar, reyting, masofa |
| Dorixonalar | 8 | Fiktiv nomlar. 2 tasida "Reklama" bayrogʻi |
| Dorilar | 30 | Oddiy tanish dorilar (ogʻriq qoldiruvchi, shamollash, vitamin va h.k.), narxlar namuna |
| Buyurtmalar (boshlangʻich) | 6 | Turli holatlarda |
| Qabullar (boshlangʻich) | 8 | Turli holatlarda |
| Sharhlar | 20 | Qisqa, neytral |
| Hududlar (talab statistikasi) | 6 | Klinika paneli B8 uchun |

Qoidalar:
- **Real shaxs, real klinika, real dorixona, real brend logotipi yoʻq.**
- Rasm oʻrniga bosh harflar avatari va oddiy ikonlar (stok rasm yoʻq, yengil).
- Shahar sukut boʻyicha **Toshkent**, bitta `config` faylida oʻzgartiriladi.
- Maʼlumotlar `src/data/*.ts` fayllarida, turlar (TypeScript) bilan.

---

## 6. Dizayn tizimi

### 6.1. Asos va manba

Dizayn **taqdimot decki bilan bir xil** boʻlishi kerak: oq/qora, aniq, minimal, bitta toʻq sariq aksent. Yoʻnalish sifatida **awesome-design-md** toʻplamidagi mos keladigan tizimlar olinadi:

- **Vercel (Geist)** — "qora va oq aniqlik", asosiy yoʻnalish (dashboardlar uchun).
- **Linear** — ultra-minimal, aniq tartib (jadval va roʻyxatlar uchun).

Ish tartibi: getdesign.md / awesome-design-md dan **Vercel** `DESIGN.md` faylini loyiha ildiziga qoʻying (Cursor uni oʻqiydi), keyin **quyidagi bizning tokenlarni ustiga yozing** (override). Buyruq (uchinchi tomon README dan, ishlatishdan oldin tekshiring): `npx getdesign@latest add vercel`.

### 6.2. Tokenlar

```yaml
colors:
  light:
    bg: "#FFFFFF"
    surface: "#FAFAFA"
    fg: "#0A0A0A"
    muted: "#6B6B6B"
    border: "#E6E6E6"
  dark:
    bg: "#0B0B0B"
    surface: "#111111"
    fg: "#F5F5F5"
    muted: "#9A9A9A"
    border: "#262626"
  accent: "#F26522"        # faqat kichik urgʻular uchun
  status:                  # faqat holat chiplari va shoshilinchlik darajasi
    ok: "#16A34A"
    warn: "#D97706"
    danger: "#DC2626"
typography:
  family: "Inter (@fontsource/inter, self-hosted)"
  weights: [400, 600, 700]
  scale_mobile: [12, 14, 16, 20, 28, 40]
  scale_web: [12, 13, 14, 16, 20, 24, 32, 48]
  heading_tracking: "-0.02em"
  body_line_height: 1.5
radius: { input: 8, card: 12, chip: 999 }
spacing: "4px grid (4, 8, 12, 16, 24, 32, 48, 64)"
border: "1px solid var(--border)"
shadow: "faqat sheet, modal va dropdown uchun: 0 8px 30px rgba(0,0,0,.08)"
motion: "150–200ms ease-out, faqat opacity/transform; prefers-reduced-motion hurmat qilinadi"
icons: "lucide-react, stroke 1.5"
```

### 6.3. Qoidalar

**Aksent (toʻq sariq) faqat:** AI indikatori, faol tab nuqtasi, kichik urgʻu, havola. **Asosiy tugma qora (yorugʻ rejimda) / oq (qorongʻi rejimda)** — Vercel uslubi. Bir ekranda aksent 1–2 joyda.

**Kartalar:** soyasiz, 1px chegara, 12px radius. KPI va statistik kartalarda decklardagi kabi **yuqori chiziq (2px)** motivi.

**Shoshilinchlik darajasi:** faqat chip koʻrinishida (yashil/sariq/qizil) va matn bilan; faqat rangga tayanilmaydi.

**Qilish:** koʻp boʻsh joy; aniq tipografik iyerarxiya; qisqa matn; skeleton va boʻsh holat (empty state) dizayni; qorongʻi rejim (tizim sozlamasiga mos + qoʻlda almashtirish).

**Qilmaslik:** gradient, stok rasm, emoji, ogʻir soyalar, koʻp rangli ikonlar, bir ekranda 2 dan ortiq aksent, ortiqcha animatsiya.

### 6.4. Layout

**Mobil (foydalanuvchi ilovasi)**
- Kengligi 360–430 px. Kompyuterda: markazda 390×844 telefon ramkasi (ingichka chegara, tashqarisi sokin fon).
- Pastda tab-bar (5 ta), `safe-area-inset` hurmat qilinadi, bosiladigan joylar kamida 44 px.
- Yuqorida sarlavha, kontent scroll, pastdan varaqlar (bottom sheet) va tugmalar.

**Veb (Pro panel)**
- Chap sidebar 240 px (yigʻiladi), topbar 56 px, kontent maksimal kengligi 1280 px.
- Jadval qator balandligi 44 px, zich, oʻqilishi oson. Yon panel (drawer) tafsilot uchun.
- 1024 px va undan keng ekran uchun optimal. 768–1023 px: sidebar yigʻilgan. < 768 px: "Panelni kompyuterda oching" yumshoq xabari, lekin qulflanmaydi.

### 6.5. Kontent uslubi (matn)

- Oʻzbek tili, lotin yozuvi. **Bir xil apostrof:** `ʻ` (oʻ, gʻ) va `’` (maʼlumot). Toʻgʻri apostrof `'` ishlatilmaydi.
- Qisqa jumlalar, sodda til, tibbiy atamalar minimal.
- Barcha matnlar bitta faylda (`src/content/uz.ts`) — keyinchalik ingliz tiliga oʻgirish oson boʻlishi uchun.

---

## 7. Texnik stack va arxitektura

| Qism | Tanlov | Sabab |
|---|---|---|
| Build | **Vite** + **React 18** + **TypeScript** | Oddiy, tez, Vercel bilan yaxshi ishlaydi |
| Stil | **Tailwind CSS** + CSS oʻzgaruvchilar (tokenlar) | Cursor bilan qulay, tokenlarni bevosita qoʻllaydi |
| Komponentlar | **shadcn/ui** (Radix asosida): Sheet, Dialog, Tabs, Select, Toast | Tayyor, ochiq, minimalistik uslubga moslanadi |
| Routing | **react-router-dom** | `/app/*` va `/pro/*` yoʻllari |
| Holat | **Zustand** + `persist` (localStorage) | Yengil, sinxronizatsiya oson |
| Ikonlar | **lucide-react** | Bir xil ingichka uslub |
| Shrift | **@fontsource/inter** | Oʻzbek belgilari (ʻ, ’) toʻgʻri chiqadi, tashqi soʻrovsiz |
| Grafik | Oddiy **SVG** yoki yengil kutubxona | Bundle kichik qolsin |
| QR | **qrcode.react** | Hub sahifasida telefon uchun |
| Analitika (P2) | **@vercel/analytics** | Taqdimotdan keyin nechta odam ochganini koʻrish |

**Papkalar (taklif)**

```
medic-ai-prototype/
├─ DESIGN.md              # dizayn tizimi (Cursor oʻqiydi)
├─ TZ.md                  # shu hujjat
├─ vercel.json
├─ src/
│  ├─ routes/{hub,app,pro}/        # sahifalar
│  ├─ components/{ui,app,pro}/     # komponentlar
│  ├─ data/                        # mock maʼlumot + ai-scenarios
│  ├─ store/                       # Zustand store, sinxronizatsiya
│  ├─ content/uz.ts               # barcha matnlar
│  ├─ styles/tokens.css           # dizayn tokenlari
│  └─ lib/                         # yordamchi funksiyalar
```

**Vercel joylashtirish**
- Framework preset: **Vite**. Build: `npm run build`, chiqish papkasi: `dist`.
- SPA yoʻllari uchun `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
- Environment variables **kerak emas**. Server funksiyalar **yoʻq**.
- GitHub repo › Vercel ga ulanadi; har `push` da avtomatik deploy. Har branch uchun preview havolasi.
- Domen: sukut boʻyicha `*.vercel.app` (xohlasak keyin oʻz domenimiz).

---

## 8. Nofunksional talablar

- **Tezlik:** dastlabki yuklanish < 2 soniya (4G), Lighthouse Performance kamida 90 (mobil). Marshrut boʻyicha kod boʻlish (`React.lazy`). Dastlabki JS taxminan 300 KB gzip dan kam.
- **Ishonchlilik:** tarmoqsiz ham ishlaydi (hech qanday tashqi API yoʻq). Hech qanday xato konsol chiqarmasin.
- **Brauzerlar:** Chrome, Safari (iOS 16+), Firefox, Edge — oxirgi 2 versiya.
- **Qulaylik (a11y):** kontrast WCAG AA, klaviatura bilan boshqarish, `aria` yorliqlar, `prefers-reduced-motion`.
- **Xavfsizlik va maxfiylik:** real shaxsiy maʼlumot yoʻq, trekerlar yoʻq (P2 dagi Vercel Analytics bundan mustasno), tashqi CDN yoʻq.
- **Yuridik:** har sahifada tibbiy ogohlantirish (AI qismida koʻproq); "Demo" belgisi.
- **PWA (P2):** manifest va ikonlar — foydalanuvchi ilovasini telefonning bosh ekraniga qoʻshishi mumkin.

---

## 9. Demo ssenariy (taqdimotdan keyin ham shu yoʻl bilan koʻriladi)

1. **Hub** (`/`) › "Foydalanuvchi ilovasi".
2. **AI chat:** "Bosh ogʻrigʻi" › savollar › natija (nevrolog tavsiyasi).
3. **Qabul:** shifokorni tanlash › sana/vaqt › tasdiqlash › "Qabullarim".
4. **Dorixona:** "paratsetamol" qidirish › reklamali dorixona yuqorida › savat › buyurtma.
5. **`/demo` split-view:** dorixona panelida yangi buyurtma paydo boʻladi › "Tayyorlanmoqda" ga oʻtkazamiz › telefonda kuzatuv chizigʻi yangilanadi.
6. **Klinika paneli:** yangi qabul › "Tasdiqlash".
7. **Shifokor paneli:** onlayn konsultatsiya › retsept › foydalanuvchi ilovasida xulosa.
8. **Litsenziya:** "Qidiruvda yuqori oʻrin" ni yoqamiz › foydalanuvchi ilovasida tartib oʻzgaradi.

Bu ssenariy Medic AI gʻoyasini bitta yoʻlda koʻrsatadi: **AI › shifokor › dorixona › provayder paneli**.

---

## 10. Qabul mezonlari (tayyor deyish uchun)

1. Barcha **P0** sahifalar (20 ta) ishlaydi; yuqoridagi demo ssenariyning 1–7 qadamlari uzilishsiz oʻtadi.
2. Faqat frontend: tarmoq soʻrovlari yoʻq (Network tab boʻsh, faqat statik fayllar).
3. Foydalanuvchi ilovasi 360, 390, 430 px da toʻgʻri koʻrinadi; Pro panel 1024–1920 px da toʻgʻri.
4. Yorugʻ va qorongʻi rejim hamma sahifada ishlaydi va deckdagi uslubga mos.
5. Oʻzbek belgilari (`ʻ`, `’`) hamma joyda toʻgʻri chiqadi; boshqa shriftga tushib ketish yoʻq.
6. Sahifani yangilasa holat saqlanadi; "Demoni tiklash" hammasini boshlangʻich holatga qaytaradi.
7. Buyurtma va qabul foydalanuvchi ilovasi va Pro panel oʻrtasida sinxron (bir brauzerda).
8. Vercel da ochiladi, `/app/ai` kabi toʻgʻridan-toʻgʻri havolalar 404 bermaydi.
9. Mobil Lighthouse Performance kamida 90.
10. Hech qayerda real shaxs/brend/klinika nomi yoʻq; AI ogohlantirishlari koʻrinib turadi.

---

## 11. Bosqichlar va taxminiy muddat (Cursor bilan)

| Bosqich | Nimalar | Taxminiy vaqt |
|---|---|---|
| **0. Tayyorgarlik** | Loyiha yaratish, DESIGN.md, tokenlar, ui komponentlar, routing, store, Vercel ulash | 0,5 kun |
| **1. P0 foydalanuvchi ilovasi** | U1–U10, U15 + mock data + AI ssenariylar | 1,5–2 kun |
| **2. P0 Pro panel + Hub** | B1–B6, B9, B10 + H1 + sinxronizatsiya | 1,5–2 kun |
| **3. P1** | U11–U14, U16, U17, B7, B8, B11, B13, B14, H2 (split-view), demo panel | 2 kun |
| **4. P2 va sayqal** | B12, B15, PWA, analitika, qorongʻi rejim tekshiruvi, tezlik | 1 kun |

Jami taxminan **5–6.5 kun** (Cursor yordamida, bitta odam). Taqdimot uchun **1–2 bosqich** yetarli (taxminan 3,5–4 kun) — u holda demo ssenariyning 1–7 qadamlari tayyor boʻladi.

---

## 12. Cursor bilan ishlash tartibi (tavsiya)

1. Yangi Vite + React + TS loyiha yarating, **TZ.md** va **DESIGN.md** ni ildizga qoʻying.
2. Har bosqichni **alohida prompt** bilan bering, natijani tekshirib keyingisiga oʻting.
3. Namuna prompt ketma-ketligi:
   - "TZ.md va DESIGN.md ni oʻqi. Loyiha skeletini tayyorla: Tailwind, tokenlar (yorugʻ/qorongʻi), Inter, routing (`/`, `/app/*`, `/pro/*`), Zustand store, vercel.json."
   - "Mock maʼlumotlarni (`src/data`) va `uz.ts` matnlarini yarat (TZ 5-boʻlim)."
   - "Foydalanuvchi ilovasi karkasi: telefon ramkasi, tab-bar, U1 va U2."
   - "U3–U4: AI chat state machine va natija (TZ 4.1)."
   - "U5–U8: shifokorlar, profil, qabulga yozilish, qabullarim."
   - "U9, U15, U10: dorixona qidiruv, savat, buyurtma kuzatuvi."
   - "Pro panel karkasi va B1–B6, B9, B10."
   - "Sinxronizatsiya va Hub (H1); keyin P1 sahifalar."
4. Har bosqichdan keyin: `npm run build`, mobil va kompyuterda qoʻlda tekshirish, Vercel preview havolasi.

---

## 13. Xatarlar va cheklovlar

- **Tibbiy kontent:** AI natijalari demo, lekin ular notoʻgʻri maslahat boʻlib qolmasligi kerak. Tibbiy maslahatchi koʻrib chiqadi; har joyda "tashxis emas" ogohlantirishi; xavf belgilari uchun 103 tavsiyasi.
- **Sinxronizatsiya cheklovi:** faqat bir brauzer ichida. Turli qurilmalar uchun sinxron kerak boʻlsa, keyingi bosqichda yengil backend kerak (prototipdan tashqarida).
- **Narxlar (litsenziya, komissiya):** faqat namuna. Real narxlar tasdiqlangandan keyin almashtiriladi.
- **Xarita:** stilizatsiya qilingan maket, real geolokatsiya emas.
- **Sahifalar koʻp (34):** vaqt cheklangan boʻlsa, P0 (20 ta) bilan chiqamiz; qolganini keyin qoʻshamiz.
- **Dizayn manbasi:** awesome-design-md fayllari tashqi loyihalardan olingan; ularni **ilhom va boshlangʻich tokenlar** sifatida ishlatamiz, bizning uslub (yuqoridagi tokenlar) ustun turadi.
