import { EMERGENCY_RESOURCES } from "@aruhealth/shared";

interface IntentDef {
  id: string;
  keywords: string[];
  en: { text: string; quickReplies: string[] };
  ne: { text: string; quickReplies: string[] };
}

const intents: IntentDef[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "namaste", "namaskar", "greetings", "नमस्ते", "नमस्कार", "हेलो", "हाइ"],
    en: {
      text: "Namaste! 👋 I'm Aaru, your calm health companion. Ask me about meditation, food & calories, exercise, sleep, or stress — I'll do my best to guide you. (I'm informational only, not a doctor.)",
      quickReplies: ["How do I meditate?", "Calorie tips", "Sleep better", "Exercise ideas"],
    },
    ne: {
      text: "नमस्ते! 👋 म एरू हुँ, तपाईंको शान्त स्वास्थ्य साथी। ध्यान, खानपान, व्यायाम, निद्रा वा तनावबारे सोध्नुहोस् — म सक्दो मद्दत गर्छु। (म जानकारीका लागि मात्र हुँ, डाक्टर होइन।)",
      quickReplies: ["ध्यान कसरी गर्ने?", "क्यालोरी सुझाव", "राम्रो निद्रा", "व्यायाम विचार"],
    },
  },
  {
    id: "meditation",
    keywords: ["meditat", "mindful", "ध्यान", "breath", "breathing", "सास", "relax", "शान्त", "calm", "inner peace", "pranayama"],
    en: {
      text: "A simple start: sit comfortably, close your eyes, and focus on your breath. Try box breathing — inhale 4s, hold 4s, exhale 4s, hold 4s — for five minutes. Use the Breathing Sphere on the Meditation page to follow along. Consistency beats duration: 5 calm minutes daily is powerful.",
      quickReplies: ["Show breathing exercise", "More meditation tips", "Sleep better"],
    },
    ne: {
      text: "सरल सुरुवात: आरामसँग बस्नुहोस्, आँखा चिम्लनुहोस् र सासमा ध्यान दिनुहोस्। बक्स ब्रेथिङ प्रयास गर्नुहोस् — ४ सेकेन्ड सास लिनुहोस्, ४ रोक्नुहोस्, ४ फाल्नुहोस्, ४ रोक्नुहोस् — पाँच मिनेटसम्म। ध्यान पेजको ब्रेथिङ स्फेयर हेरेर अभ्यास गर्नुहोस्। लामो समयभन्दा निरन्तरता महत्त्वपूर्ण छ: दिनको ५ शान्त मिनेट नै पर्याप्त हुन्छ।",
      quickReplies: ["सास व्यायाम देखाउनुहोस्", "थप ध्यान सुझाव", "राम्रो निद्रा"],
    },
  },
  {
    id: "calories",
    keywords: ["calorie", "calories", "क्यालोरी", "diet", "dieting", "weight", "weightloss", "lose weight", "gain weight", "fat", "मोटो", "तौल", "डाइट"],
    en: {
      text: "For general health, most adults do well around 1,800–2,200 kcal/day, but needs vary. Tips: log meals in the Calorie Meter, choose dal-bhat-tarkari over fried snacks, drink water before meals, and don't skip meals — just mind portions. Aim for a mild 300–500 kcal daily deficit if losing weight, with protein at every meal.",
      quickReplies: ["Healthy Nepali food?", "Track my calories", "Water tips"],
    },
    ne: {
      text: "सामान्य स्वास्थ्यका लागि धेरै वयस्कलाई दिनको १,८००–२,२०० क्यालोरी उपयुक्त हुन्छ, तर आवश्यकता व्यक्तिअनुसार फरक हुन्छ। सुझाव: क्यालोरी मिटरमा खाना लग गर्नुहोस्, फ्राइड खाजाको सट्टा दालभाततरकारी रोज्नुहोस्, खानाअघि पानी पिउनुहोस् र खाना नछोड्नुहोस् — बरु मात्रा मिलाउनुहोस्। तौल घटाउन दिनको ३००–५०० क्यालोरी कमी राख्नु उपयुक्त हुन्छ, हरेक खानामा प्रोटिन राख्नुहोस्।",
      quickReplies: ["स्वस्थ नेपाली खाना?", "क्यालोरी ट्र्याक गर्नुहोस्", "पानी सुझाव"],
    },
  },
  {
    id: "exercise",
    keywords: ["exercise", "workout", "fitness", "व्यायाम", "फिटनेस", "running", "run", "yoga", "योग", "walk", "walking", "हिँड", "gym", "strength", "swim", "dance"],
    en: {
      text: "Aim for 150 minutes of moderate activity per week — that's just ~20 minutes a day. Mix cardio (walking, cycling) with strength training twice a week. New to it? Start with brisk walking 10 minutes after meals and build up. Log sessions in the Fitness tracker to watch your weekly minutes grow!",
      quickReplies: ["Exercise plan for beginners", "Track my exercise", "Better sleep"],
    },
    ne: {
      text: "हप्तामा १५० मिनेट मध्यम व्यायाम गर्ने लक्ष्य राख्नुहोस् — दिनको ~२० मिनेट मात्र। कार्डियो (हिँडाइ, साइकल) र हप्तामा दुई पटक शक्ति प्रशिक्षण मिलाउनुहोस्। सुरु गर्न: खानपछि छिटो हिँडाइ १० मिनेट गरेर बिस्तारै बढाउनुहोस्। व्यायाम ट्र्याकरमा लग गर्नुहोस् र हप्ताको मिनेट बढ्दै गरेको हेर्नुहोस्!",
      quickReplies: ["सुरुवातका लागि व्यायाम", "व्यायाम ट्र्याक गर्नुहोस्", "राम्रो निद्रा"],
    },
  },
  {
    id: "sleep",
    keywords: ["sleep", "sleeping", "sleepless", "insomnia", "nap", "निद्रा", "निन्द्रा", "नीद", "रात"],
    en: {
      text: "Sleep tips that work: wake at the same time daily, get morning sunlight, dim screens an hour before bed, keep the room cool and dark, avoid caffeine after 2 PM, and move during the day. Feeling wired at night? Try a body scan or 4-7-8 breathing in bed. Track hours in the Sleep tracker to spot patterns.",
      quickReplies: ["4-7-8 breathing", "Track my sleep", "Stress help"],
    },
    ne: {
      text: "काम लाग्ने निद्रा सुझाव: दिनहुँ एउटै समयमा उठ्नुहोस्, बिहान घाम हेर्नुहोस्, सुत्नुभन्दा एक घण्टाअघि स्क्रिन कम गर्नुहोस्, कोठा चिसो र अँध्यारो राख्नुहोस्, दिउँसो २ बजेपछि क्याफिन लिनुहोस् र दिनभर सक्रिय रहनुहोस्। राति निद्रा नलागे ओछ्यानमा बडी स्क्यान वा ४–७–८ सास प्रयास गर्नुहोस्। ढाँचा देख्न निद्रा ट्र्याकरमा घण्टा लग गर्नुहोस्।",
      quickReplies: ["४–७–८ सास", "निद्रा ट्र्याक गर्नुहोस्", "तनावमा मद्दत"],
    },
  },
  {
    id: "water",
    keywords: ["water", "hydrate", "hydration", "thirst", "पानी", "प्यास", "hydration"],
    en: {
      text: "A simple rule: drink a glass of water first thing in the morning, one before each meal, and whenever you feel thirsty — roughly 8 glasses a day. Drink more on hot days or when exercising. Tip: keep a bottle visible at your desk as a reminder.",
      quickReplies: ["Calorie tips", "Exercise ideas", "How do I meditate?"],
    },
    ne: {
      text: "सरल नियम: बिहान उठ्नेबित्तिकै एक गिलास पानी, हरेक खानाअघि एक गिलास र प्यास लाग्दा पानी पिउनुहोस् — करिब ८ गिलास दिनको। गर्मी वा व्यायामका दिन बढी पिउनुहोस्। डेस्कमा पानीको बोतल देखिने ठाउँमा राख्नुहोस्।",
      quickReplies: ["क्यालोरी सुझाव", "व्यायाम विचार", "ध्यान कसरी गर्ने?"],
    },
  },
  {
    id: "stress",
    keywords: ["stress", "anxiety", "anxious", "overwhelm", "panic", "worried", "mental", "तनाव", "चिन्ता", "डिप्रेस", "नराम्रो मानसिक", "थकित"],
    en: {
      text: "You're not alone, and it's okay to feel this way. Try the 4-7-8 breathing a few rounds right now to settle your nervous system, then go for a short walk. Talk to someone you trust, and if the feeling persists, please reach out to a counsellor or health professional — that's a sign of strength, not weakness.",
      quickReplies: ["4-7-8 breathing", "Talk to me", "Crisis resources"],
    },
    ne: {
      text: "तपाईं एक्लो हुनुहुन्न र यस्तो महसुस हुनु स्वाभाविक हो। अहिले नै ४–७–८ सास केही चोटि गरेर नर्भस शान्त पार्नुहोस्, अनि छोटो पैदल हिँड्नुहोस्। भरपर्दो व्यक्तिसँग कुरा गर्नुहोस्, र यो भावना रहिरहे मनोवैज्ञानिक वा स्वास्थ्यकर्मीसँग सम्पर्क गर्नुहोस् — त्यो कमजोरी होइन, बल हो।",
      quickReplies: ["४–७–८ सास", "मसँग कुरा गर्नुहोस्", "संकट सहयोग"],
    },
  },
  {
    id: "emergency",
    keywords: ["suicide", "suicidal", "kill myself", "end my life", "self-harm", "self harm", "hurt myself", "crisis", "आत्महत्या", "मर्न चाहन्छु", "आफूलाई हानि", "जीवनको अन्त्य"],
    en: {
      text: EMERGENCY_RESOURCES.en,
      quickReplies: ["4-7-8 breathing", "Talk to someone you trust"],
    },
    ne: {
      text: EMERGENCY_RESOURCES.ne,
      quickReplies: ["४–७–८ सास", "भरपर्दो व्यक्तिसँग कुरा गर्नुहोस्"],
    },
  },
  {
    id: "language",
    keywords: ["nepali", "nepali language", "english", "language", "switch", "भाषा", "नेपाली", "अंग्रेजी", "अङ्ग्रेजी"],
    en: {
      text: "You can switch between English and Nepali anytime using the language button in the header. This chat also follows your chosen language. सहजै रूपमा इन्ग्लिश र नेपाली बीच स्विच गर्न सकिन्छ। 😊",
      quickReplies: ["How do I meditate?", "Calorie tips"],
    },
    ne: {
      text: "माथिको हेडरको भाषा बटनबाट जहिले पनि अंग्रेजी र नेपाली स्विच गर्न सक्नुहुन्छ। यो च्याट पनि तपाईंको रोजेको भाषामा जवाफ दिन्छ। You can switch anytime via the header! 😊",
      quickReplies: ["ध्यान कसरी गर्ने?", "क्यालोरी सुझाव"],
    },
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "धन्यवाद", "dhanyabad", "welcome", "great", "nice"],
    en: {
      text: "You're most welcome! Take it one calm step at a time — small daily habits create big change. 💙 आजै शान्त र स्वस्थ दिन बिताऊ!",
      quickReplies: ["How do I meditate?", "Sleep better", "Exercise ideas"],
    },
    ne: {
      text: "स्वागत छ! एक–एक शान्त कदम चाल्दै जानुहोस् — सानो दैनिक बानीले ठूलो परिवर्तन ल्याउँछ। 💙 आज शान्त र स्वस्थ रहनुहोस्!",
      quickReplies: ["ध्यान कसरी गर्ने?", "राम्रो निद्रा", "व्यायाम विचार"],
    },
  },
  {
    id: "about",
    keywords: ["who are you", "what can you do", "what do you do", "help me", "i need help", "help", "features", "के गर्न", "सक्छौ", "को हौ", "मद्दत"],
    en: {
      text: "I'm Aaru, ARUHEALTH's wellness guide. I can help with meditation basics, calorie & nutrition tips, exercise guidance, sleep hygiene, and stress management. I'm built on clear health guidance and I always remind you I'm informational only — for medical concerns please see a professional.",
      quickReplies: ["How do I meditate?", "Calorie tips", "Better sleep"],
    },
    ne: {
      text: "म एरू हुँ, ARUHEALTH को स्वास्थ्य मार्गदर्शक। म ध्यानका आधारभूत कुरा, क्यालोरी र पोषण, व्यायाम, निद्रा र तनाव व्यवस्थापनमा मद्दत गर्छु। म स्पष्ट स्वास्थ्य मार्गदर्शनमा बनेको छु र सँधै सम्झाउँछु — म जानकारीका लागि मात्र हुँ, चिकित्सकीय समस्या भए विशेषज्ञलाई भेट्नुहोस्।",
      quickReplies: ["ध्यान कसरी गर्ने?", "क्यालोरी सुझाव", "राम्रो निद्रा"],
    },
  },
];

const fallback = {
  en: {
    text: "I'm not sure about that one, but I can help with meditation, calories & food, exercise, sleep, or stress. Try one of these, or rephrase your question.",
    quickReplies: ["How do I meditate?", "Calorie tips", "Sleep better", "Crisis resources"],
  },
  ne: {
    text: "त्यो प्रश्नबारे निश्चित छैन, तर म ध्यान, क्यालोरी र खाना, व्यायाम, निद्रा वा तनावमा मद्दत गर्न सक्छु। यी प्रयास गर्नुहोस् वा प्रश्न फेरि लेख्नुहोस्।",
    quickReplies: ["ध्यान कसरी गर्ने?", "क्यालोरी सुझाव", "राम्रो निद्रा", "संकट सहयोग"],
  },
};

type Lang = "en" | "ne";

function normalize(raw: string): string {
  return raw.toLowerCase().replace(/[.,!?;:]+/g, " ").replace(/\s+/g, " ").trim();
}

export interface ChatResult {
  intent: string;
  text: string;
  quickReplies: string[];
}

export function runChatbot(rawMessage: string, lang: Lang): ChatResult {
  const message = normalize(rawMessage);
  let best: IntentDef | null = null;
  let bestScore = 0;

  // long keywords first for precision
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const k = kw.toLowerCase();
      if (message.includes(k)) {
        score += k.split(" ").length >= 2 ? 3 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (!best) {
    const fb = lang === "ne" ? fallback.ne : fallback.en;
    return { intent: "fallback", text: fb.text, quickReplies: fb.quickReplies };
  }

  const reply = lang === "ne" ? best.ne : best.en;
  return { intent: best.id, text: reply.text, quickReplies: reply.quickReplies };
}