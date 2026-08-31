export const ROLES = ["USER", "ADMIN"] as const;
export const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"] as const;
export const SLEEP_QUALITIES = ["poor", "fair", "good"] as const;
export const LOCALES = ["en", "ne"] as const;
export const DEFAULT_LOCALE = "en" as const;

export const MEDITATION_TECHNIQUES = [
  { en: "Mindful Breathing", ne: "माइन्डफुल सास" },
  { en: "Body Scan", ne: "बडी स्क्यान" },
  { en: "Loving Kindness", ne: "मायालु करुणा" },
  { en: "Walking Meditation", ne: "हिँड्ने ध्यान" },
  { en: "Visualization", ne: "भिजुअलाइजेसन" },
];

export const TIPS = {
  sleep: {
    en: [
      "Keep a consistent sleep schedule even on weekends.",
      "Avoid screens 30–60 minutes before bed.",
      "Keep your bedroom cool, dark and quiet.",
      "Avoid caffeine after mid-afternoon.",
    ],
    ne: [
      "साताको दिन र बिदाको दिनमा पनि सुत्ने समय मिलाइराख्नुहोस्।",
      "सुत्नुभन्दा ३०–६० मिनेट पहिले स्क्रिनबाट टाढा रहनुहोस्।",
      "सुत्ने कोठा चिसो, अँध्यारो र शान्त राख्नुहोस्।",
      "दिउँसो पछि क्याफिन नलिनुहोस्।",
    ],
  },
  diet: {
    en: [
      "Add a serving of vegetables to every meal.",
      "Drink a glass of water before each meal.",
      "Prefer whole grains over refined ones.",
      "Watch portion sizes rather than banning foods.",
    ],
    ne: [
      "हरेक खानामा तरकारी थप्नुहोस्।",
      "खानाअघि एक गिलास पानी पिउनुहोस्।",
      "रिफाइन गरिएको अन्नको सट्टा सम्पूर्ण अन्न रोज्नुहोस्।",
      "खाना नछाड्नुहोस्, बरु मात्रामा ध्यान दिनुहोस्।",
    ],
  },
  exercise: {
    en: [
      "Aim for 150 minutes of moderate activity weekly.",
      "Break exercise into 10-minute chunks — it still counts.",
      "Add resistance training twice a week.",
      "Walking after meals helps regulate blood sugar.",
    ],
    ne: [
      "हप्तामा १५० मिनेट मध्यम व्यायाम गर्ने लक्ष्य राख्नुहोस्।",
      "व्यायामलाई १०–१० मिनेटमा बाँड्नुहोस् — तैपनि गणना हुन्छ।",
      "हप्तामा दुई पटक शक्ति प्रशिक्षण थप्नुहोस्।",
      "खानपछि हिँड्नाले रगतमा चिनी नियन्त्रणमा रहन्छ।",
    ],
  },
};

export const EMERGENCY_RESOURCES = {
  en: "If you are in crisis or thinking about harming yourself, please reach out to emergency services right away. In Nepal call 100 (police) or 16600102050 (TUTH mental health helpline). This is not a substitute for professional care.",
  ne: "यदि तपाईं संकटमा हुनुहुन्छ वा आत्महत्याको बारेमा सोच्दै हुनुहुन्छ भने तुरुन्तै आपतकालीन सेवामा सम्पर्क गर्नुहोस्। नेपालमा १०० (प्रहरी) वा १६६००१०२०५० (टिच मानसिक स्वास्थ्य हटलाइन) मा फोन गर्नुहोस्। यो व्यावसायिक उपचारको विकल्प होइन।",
};