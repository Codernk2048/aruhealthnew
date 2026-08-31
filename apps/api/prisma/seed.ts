import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "calm-breathing-techniques",
    titleEn: "10 Calming Breathing Techniques for Everyday Stress",
    titleNe: "दैनिक तनावका लागि १० शान्त सास तकनीक",
    excerptEn:
      "Simple, science-backed breathing exercises you can do anywhere to calm your nervous system.",
    excerptNe:
      "तपाईंको नर्भसलाई शान्त पार्ने, जहाँसुकै गर्न सकिने सरल र वैज्ञानिक रूपमा प्रमाणित सास व्यायामहरू।",
    contentEn: `
      <p>Breathing is one of the few autonomic functions we can consciously control, and it is the fastest gateway to calming the nervous system.</p>
      <h3>The 4-7-8 technique</h3>
      <p>Breathe in through your nose for 4 seconds, hold for 7 seconds, and exhale slowly through the mouth for 8 seconds. Repeat for four rounds.</p>
      <h3>Box breathing</h3>
      <p>Inhale 4 seconds, hold 4, exhale 4, hold 4. Visualize drawing a box with your breath. This is used by divers and aircrew to stay calm under pressure.</p>
      <h3>Diaphragmatic breathing</h3>
      <p>Place one hand on your belly. As you inhale, let your belly expand like a balloon. This activates the parasympathetic "rest and digest" response.</p>
      <p>Practice any of these for 2–5 minutes daily and notice your resting heart rate and mood settle over a few weeks.</p>
    `,
    contentNe: `
      <p>सास फेर्नु भनेको हाम्रा अटोनोमिक क्रियाहरूमध्ये एक हो जसलाई हामी सचेत रूपमा नियन्त्रण गर्न सक्छौँ, र यो नर्भसलाई शान्त पार्ने सबैभन्दा छिटो बाटो हो।</p>
      <h3>४–७–८ तकनीक</h3>
      <p>नाकबाट ४ सेकेन्ड सास लिनुहोस्, ७ सेकेन्ड रोक्नुहोस्, र मुखबाट ८ सेकेन्डमा बिस्तारै फाल्नुहोस्। चार पटक दोहोर्‍याउनुहोस्।</p>
      <h3>बक्स ब्रेथिङ</h3>
      <p>४ सेकेन्ड सास लिनुहोस्, ४ रोक्नुहोस्, ४ फाल्नुहोस्, ४ रोक्नुहोस्। साससँगै एउटा बक्स बनिरहेको कल्पना गर्नुहोस्। यो पाइलट र गोताखोरले दबाबमा शान्त रहन प्रयोग गर्छन्।</p>
      <h3>डायाफ्रामिक सास</h3>
      <p>पेटमा हात राख्नुहोस्। सास लिँदा पेट बेलुनजस्तो फुलोस्। यसले "आराम र पाचन" प्रणालीलाई सक्रिय बनाउँछ।</p>
      <p>यीमध्ये कुनै पनि अभ्यास दिनमा २–५ मिनेट गर्नुहोस्; केही हप्तामा तपाईंको मुटुको गति र मनस्थिति शान्त हुँदै गएको महसुस हुनेछ।</p>
    `,
    tags: "meditation,stress,breathing",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop",
  },
  {
    slug: "healthy-nepali-diet",
    titleEn: "The Healthy Nepali Diet: Dal-Bhat and Beyond",
    titleNe: "स्वस्थ नेपाली खानपान: दालभात र अरू",
    excerptEn:
      "How traditional Nepali meals can be a balanced, affordable foundation for good nutrition.",
    excerptNe:
      "परम्परागत नेपाली खाना कसरी सन्तुलित, किफायती र राम्रो पोषणको आधार हुन सक्छ।",
    contentEn: `
      <p>Dal-bhat-tarkari — lentils, rice and seasonal vegetables — is nutritionally brilliant when you eat the whole meal.</p>
      <h3>Protein from dal</h3>
      <p>Lentils are rich in fiber and plant protein. Pair dal with rice or roti to complete the amino acid profile, so your body can actually use it.</p>
      <h3>Add color</h3>
      <p>Aim for at least three colors of vegetables per plate. Seasonal greens like mustard greens (sag) are packed with iron and vitamins.</p>
      <h3>Mind the extras</h3>
      <p>Fried snacks, extra oil, and sugary milk tea add hidden calories. Steamed momos, roasted chiura, and unsweetened chiya are lighter swaps.</p>
    `,
    contentNe: `
      <p>दाल–भात–तरकारी — दाल, भात र मौसमी तरकारी — सबै परिकार मिलाएर खाँदा पोषणको दृष्टिले उत्कृष्ट हुन्छ।</p>
      <h3>दालबाट प्रोटिन</h3>
      <p>दालमा फाइबर र वनस्पति प्रोटिन प्रशस्त हुन्छ। दाललाई भात वा रोटीसँग खाँदा एमिनो एसिड पूर्ण हुन्छ र शरीरले राम्रोसँग प्रयोग गर्न सक्छ।</p>
      <h3>रंग थप्नुहोस्</h3>
      <p>प्लेटमा कम्तीमा तीन रंगका तरकारी हुनु उत्तम हो। रायो साग जस्ता मौसमी सागमा फलाम र भिटामिन प्रशस्त हुन्छ।</p>
      <h3>अन्य कुरामा ध्यान</h3>
      <p>फ्राइड खाजा, बढी तेल र चिनीयुक्त दूध चियाले लुकेको क्यालोरी थप्छ। भापमा पकाएको मम, भुटेको चिउरा र चिनीरहित चिया बढी उपयुक्त हुन्छ।</p>
    `,
    tags: "nutrition,diet,nepal",
    coverImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop",
  },
  {
    slug: "sleep-hygiene-guide",
    titleEn: "The Complete Sleep Hygiene Guide",
    titleNe: "राम्रो निद्राको सम्पूर्ण मार्गदर्शिका",
    excerptEn: "Seven habits that help you fall asleep faster and wake up refreshed.",
    excerptNe: "छिटो निद्रा लाग्न र ताजा उठ्न मद्दत गर्ने सात बानीहरू।",
    contentEn: `
      <p>Sleep is the foundation of physical and mental health. These habits, applied consistently, improve sleep quality within weeks.</p>
      <h3>1. Fixed wake time</h3>
      <p>Wake up at the same time daily — your body clock thrives on a stable anchor point.</p>
      <h3>2. Morning light</h3>
      <p>Get natural sunlight within 30 minutes of waking. It sets your circadian rhythm.</p>
      <h3>3. Wind-down ritual</h3>
      <p>Dim lights and screens 60 minutes before bed. Read, stretch gently, or do a body scan.</p>
      <h3>4. Cool and dark room</h3>
      <p>Keep the bedroom cool (18–20°C), dark, and quiet.</p>
      <h3>5. Consistent timing</h3>
      <p>Go to bed at similar times, including weekends.</p>
      <h3>6. Limit caffeine</h3>
      <p>Avoid caffeine after 2 PM; its half-life lingers for hours.</p>
      <h3>7. Move daily</h3>
      <p>Daytime activity and exercise deepen sleep — but avoid intense workouts right before bed.</p>
    `,
    contentNe: `
      <p>निद्रा शारीरिक र मानसिक स्वास्थ्यको जग हो। यी बानीहरू निरन्तर अपनाए केही हप्तामा निद्राको गुणस्तर सुध्रिन्छ।</p>
      <h3>१. निश्चित उठ्ने समय</h3>
      <p>दिनहुँ एउटै समयमा उठ्नुहोस् — शरीरको घडीले स्थिर समय मन पराउँछ।</p>
      <h3>२. बिहानको घाम</h3>
      <p>उठेको ३० मिनेटभित्र प्राकृतिक घाम हेर्नुहोस्। यसले तपाईंको जैविक घडी मिलाउँछ।</p>
      <h3>३. विश्रामको दिनचर्या</h3>
      <p>सुत्नुभन्दा ६० मिनेट पहिले बत्ती र स्क्रिन झिमझिमाउनुहोस्। पढ्नुहोस्, हल्का स्ट्रेच गर्नुहोस् वा बडी स्क्यान गर्नुहोस्।</p>
      <h3>४. चिसो र अँध्यारो कोठा</h3>
      <p>सुत्ने कोठा चिसो (१८–२०°से), अँध्यारो र शान्त राख्नुहोस्।</p>
      <h3>५. नियमित समय</h3>
      <p>बिदाका दिन पनि सुत्ने समय मिलाउनुहोस्।</p>
      <h3>६. क्याफिन घटाउनुहोस्</h3>
      <p>दिउँसो २ बजेपछि क्याफिन नलिनुहोस्; यसको अर्धायु घण्टौं रहन्छ।</p>
      <h3>७. दैनिक सक्रियता</h3>
      <p>दिनको व्यायामले निद्रा गहिरो बनाउँछ — तर सुत्नुअघि कडा व्यायाम नगर्नुहोस्।</p>
    `,
    tags: "sleep,wellness",
    coverImage:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&auto=format&fit=crop",
  },
];

const foods = [
  { name: "Cooked rice (bhat)", nameNe: "भात", kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: "100g" },
  { name: "Dal (lentil soup)", nameNe: "दाल", kcal: 105, protein: 9, carbs: 18, fat: 0.4, unit: "1 cup" },
  { name: "Roti (wheat flatbread)", nameNe: "रोटी", kcal: 297, protein: 11, carbs: 51, fat: 3, unit: "100g" },
  { name: "Chicken curry", nameNe: "कुखुराको करी", kcal: 190, protein: 25, carbs: 6, fat: 8, unit: "1 serving" },
  { name: "Vegetable tarkari", nameNe: "तरकारी", kcal: 120, protein: 3, carbs: 15, fat: 6, unit: "1 bowl" },
  { name: "Momos (steamed, 6 pc)", nameNe: "मम (६ वटा)", kcal: 300, protein: 14, carbs: 42, fat: 9, unit: "6 pcs" },
  { name: "Milk tea / chiya", nameNe: "दूध चिया", kcal: 57, protein: 2, carbs: 8, fat: 2, unit: "1 cup" },
  { name: "Black tea", nameNe: "कालो चिया", kcal: 2, protein: 0, carbs: 0.5, fat: 0, unit: "1 cup" },
  { name: "Apple", nameNe: "स्याउ", kcal: 95, protein: 0.5, carbs: 25, fat: 0.3, unit: "1 medium" },
  { name: "Banana", nameNe: "करा", kcal: 105, protein: 1.3, carbs: 27, fat: 0.4, unit: "1 medium" },
  { name: "Oats porridge", nameNe: "ओट्स", kcal: 150, protein: 5, carbs: 27, fat: 3, unit: "1 bowl" },
  { name: "Curd / dahi", nameNe: "दही", kcal: 110, protein: 6, carbs: 9, fat: 6, unit: "1 bowl" },
  { name: "Peanut butter", nameNe: "बदामको बटर", kcal: 190, protein: 8, carbs: 7, fat: 16, unit: "2 tbsp" },
  { name: "Chura (beaten rice)", nameNe: "चिउरा", kcal: 260, protein: 6, carbs: 58, fat: 0.5, unit: "1 cup" },
];

const exercises = [
  { name: "Brisk walking", nameNe: "छिटो हिँडाइ", met: 4.3 },
  { name: "Running (8 km/h)", nameNe: "दौड (८ किमि/घन्टा)", met: 8.3 },
  { name: "Cycling", nameNe: "साइकल चलाउने", met: 7.5 },
  { name: "Yoga", nameNe: "योग", met: 3.0 },
  { name: "Jump rope", nameNe: "डोरी उफ्रने", met: 12.3 },
  { name: "Stretching", nameNe: "स्ट्रेचिङ", met: 2.5 },
  { name: "Swimming", nameNe: "पौडी", met: 8.0 },
  { name: "Dancing", nameNe: "नृत्य", met: 5.5 },
  { name: "Housework (moderate)", nameNe: "घरायसी काम", met: 3.3 },
  { name: "Strength training", nameNe: "शक्ति प्रशिक्षण", met: 6.0 },
];

const videos = [
  {
    titleEn: "10 Minute Morning Meditation",
    titleNe: "१० मिनेट बिहानको ध्यान",
    url: "https://player.vimeo.com/video/76979871",
    provider: "VIMEO",
    category: "meditation",
    thumbnail:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&auto=format&fit=crop",
  },
  {
    titleEn: "Gentle Evening Yoga Flow",
    titleNe: "शान्त साँझको योग फ्लो",
    url: "https://player.vimeo.com/video/76979871",
    provider: "VIMEO",
    category: "yoga",
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    quoteEn:
      "ARUHEALTH's daily sleep and calorie tracking changed my routine completely. Gentle, calm and so easy to use.",
    quoteNe:
      "ARUHEALTH को दैनिक निद्रा र क्यालोरी ट्र्याकिङले मेरो दिनचर्या नै बदल्यो। सरल, शान्त र अत्यन्तै प्रयोग गर्न सजिलो।",
    author: "Sunita R.",
    role: "Kathmandu",
    rating: 5,
  },
  {
    quoteEn: "The Nepali language support made it feel like home. My whole family now tracks our health together.",
    quoteNe:
      "नेपाली भाषाको समर्थनले घरकै अनुभूति दियो। अहिले मेरो परिवार सबै मिलेर स्वास्थ्य ट्र्याक गर्छौं।",
    author: "Bikash T.",
    role: "Pokhara",
    rating: 5,
  },
  {
    quoteEn: "Loved the breathing exercises and the chatbot — it answered my sleep questions instantly.",
    quoteNe:
      "सास व्यायाम र च्याटबट साह्रै राम्रो लाग्यो — यसले मेरो निद्राका प्रश्नहरूको तुरुन्तै जवाफ दियो।",
    author: "Anita M.",
    role: "Lalitpur",
    rating: 4,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);
  const demoHash = await bcrypt.hash("demo123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@aruhealth.com" },
    update: {},
    create: {
      email: "admin@aruhealth.com",
      passwordHash,
      name: "ARU Admin",
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "demo@aruhealth.com" },
    update: {},
    create: {
      email: "demo@aruhealth.com",
      passwordHash: demoHash,
      name: "Demo User",
      role: "USER",
    },
  });

  if ((await prisma.food.count()) === 0) {
    await prisma.food.createMany({ data: foods });
  }

  if ((await prisma.exercise.count()) === 0) {
    await prisma.exercise.createMany({ data: exercises });
  }

  for (const p of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.post.create({
        data: { ...p, authorId: admin.id, published: true, publishedAt: new Date() },
      });
    }
  }

  for (const v of videos) {
    await prisma.video.create({ data: v });
  }
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Seed complete ✓");
  console.log("  admin@aruhealth.com / admin123 (ADMIN)");
  console.log("  demo@aruhealth.com  / demo123  (USER)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());