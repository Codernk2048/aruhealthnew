export type HealthArticle = {
  id: string;
  category: string;
  title: string;
  summary: string;
  takeaways: string[];
  source: string;
  sourceUrl: string;
};

export const healthArticles: HealthArticle[] = [
  {
    id: 'healthy-balanced-diet', category: 'nutrition', title: 'A Balanced Diet: A Practical UK Guide',
    summary: 'A varied diet built around vegetables, fruit, higher-fibre carbohydrates, protein foods and unsaturated fats supports everyday health. Balance matters across a day or week rather than in every single meal.',
    takeaways: ['Aim for at least five portions of varied fruit and vegetables daily.', 'Choose higher-fibre starchy foods and include protein from varied sources.', 'Keep foods high in fat, salt and sugar occasional and in smaller portions.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/eating-a-balanced-diet/'
  },
  {
    id: 'fibre-digestion', category: 'nutrition', title: 'Fibre, Digestion and Heart Health',
    summary: 'Dietary fibre supports bowel health and can help reduce constipation. Fibre-rich foods such as wholegrains, pulses, vegetables and fruit also form part of a heart-healthy eating pattern.',
    takeaways: ['Increase fibre gradually to reduce bloating.', 'Drink enough fluid as fibre intake rises.', 'Use beans, lentils, oats and wholegrain bread as practical sources.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/digestive-health/how-to-get-more-fibre-into-your-diet/'
  },
  {
    id: 'five-a-day', category: 'nutrition', title: 'Making Your 5 A Day Achievable',
    summary: 'Fresh, frozen, canned and dried produce can all contribute to fruit and vegetable intake. Variety is useful because different foods provide different nutrients and types of fibre.',
    takeaways: ['Add fruit to breakfast and vegetables to main meals.', 'Choose canned produce in water or natural juice where possible.', 'Juice and smoothies should be limited because sugars are released during processing.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/5-a-day/'
  },
  {
    id: 'hydration', category: 'nutrition', title: 'Hydration Without the Hype',
    summary: 'Fluid needs vary with activity, weather, illness and pregnancy. Water is a reliable everyday choice, while other drinks and water-rich foods also contribute to total intake.',
    takeaways: ['Drink regularly rather than waiting until you feel very thirsty.', 'You may need more fluid during exercise, heat or illness.', 'Pale-yellow urine is often a practical sign of adequate hydration.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/'
  },
  {
    id: 'food-labels', category: 'nutrition', title: 'Reading Food Labels in One Minute',
    summary: 'Front-of-pack labels can help compare energy, fat, saturated fat, sugars and salt between similar products. The ingredient list is ordered by weight, with the largest ingredients first.',
    takeaways: ['Compare products per 100g for a fairer comparison.', 'Use traffic-light colours as a quick guide, not a complete judgement.', 'Check serving size because it may differ from the portion you eat.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/how-to-read-food-labels/'
  },
  {
    id: 'vitamin-d', category: 'nutrition', title: 'Vitamin D: Food, Sunlight and Supplements',
    summary: 'Vitamin D supports bone and muscle health. In the UK, sunlight is not strong enough for reliable skin production during autumn and winter, so national guidance recommends considering supplementation.',
    takeaways: ['Follow current NHS advice on seasonal supplementation.', 'Some people at higher risk may need a daily supplement throughout the year.', 'Do not exceed recommended doses unless a clinician advises it.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/'
  },
  {
    id: 'iron-deficiency', category: 'nutrition', title: 'Iron Deficiency: Signs and Food Sources',
    summary: 'Low iron can lead to iron-deficiency anaemia, with symptoms such as tiredness, breathlessness and palpitations. Diagnosis requires assessment and usually a blood test rather than guesswork.',
    takeaways: ['Seek medical advice for persistent fatigue or breathlessness.', 'Iron sources include meat, pulses, fortified cereals and leafy greens.', 'Treatment should address both the deficiency and its underlying cause.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/iron-deficiency-anaemia/'
  },
  {
    id: 'healthy-weight', category: 'nutrition', title: 'A Sustainable Approach to Healthy Weight',
    summary: 'Long-term weight management works best through realistic food, activity, sleep and behavioural changes. Rapid or highly restrictive plans can be difficult to maintain and may not meet nutritional needs.',
    takeaways: ['Set small, measurable goals and track patterns rather than perfection.', 'Build meals around filling, minimally processed foods.', 'Ask a clinician for support if weight affects your health or medicines.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/better-health/lose-weight/'
  },
  {
    id: 'plant-protein', category: 'nutrition', title: 'Plant Protein Made Simple',
    summary: 'Beans, lentils, chickpeas, tofu, nuts and seeds can provide useful protein alongside fibre and micronutrients. Eating a varied diet helps cover different amino acids and nutritional needs.',
    takeaways: ['Add pulses to soups, curries, salads and sauces.', 'Choose unsalted nuts and seeds in sensible portions.', 'People following vegan diets should plan reliable vitamin B12 sources.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/the-vegan-diet/'
  },
  {
    id: 'salt-intake', category: 'nutrition', title: 'Salt and Sodium: Where Intake Hides',
    summary: 'Much of the salt people eat is already present in packaged foods, sauces and takeaway meals. Reducing intake can help lower blood pressure, especially for people who already have hypertension.',
    takeaways: ['Compare labels and choose lower-salt versions.', 'Flavour food with herbs, spices, citrus and garlic.', 'Reduce salt gradually so taste preferences can adapt.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/tips-for-a-lower-salt-diet/'
  },
  {
    id: 'high-blood-pressure', category: 'heart', title: 'High Blood Pressure: The Quiet Risk',
    summary: 'High blood pressure often causes no symptoms but raises the risk of heart disease, stroke and other complications. A validated reading and appropriate follow-up are essential for diagnosis.',
    takeaways: ['Get your blood pressure checked, particularly if you have risk factors.', 'Lifestyle changes and medicines may both be needed.', 'Do not stop prescribed blood-pressure medicine without clinical advice.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/high-blood-pressure-hypertension/'
  },
  {
    id: 'cholesterol', category: 'heart', title: 'Understanding Cholesterol Results',
    summary: 'Cholesterol is carried in different lipoproteins, and cardiovascular risk depends on more than one number. Clinicians interpret results alongside age, blood pressure, smoking, diabetes and family history.',
    takeaways: ['Ask what your full lipid profile means for your overall risk.', 'Replace some saturated fats with unsaturated fats.', 'Take prescribed statins consistently and discuss side effects rather than stopping alone.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/high-cholesterol/'
  },
  {
    id: 'heart-attack-signs', category: 'heart', title: 'Heart Attack Warning Signs',
    summary: 'Chest pressure or tightness, pain spreading to the arm, jaw or back, sweating, nausea and breathlessness can signal a heart attack. Symptoms can vary and may be less typical in some people.',
    takeaways: ['Call 999 immediately if you suspect a heart attack.', 'Do not drive yourself to hospital.', 'Fast treatment can limit heart damage and save life.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/heart-attack/symptoms/'
  },
  {
    id: 'stroke-fast', category: 'heart', title: 'Stroke: Think FAST and Act Immediately',
    summary: 'Sudden facial weakness, arm weakness or speech difficulty may indicate a stroke. Other sudden neurological symptoms can occur, but the essential response is immediate emergency help.',
    takeaways: ['Face, Arms, Speech, Time to call 999.', 'Even symptoms that resolve quickly need urgent assessment.', 'Note when symptoms began if you can do so safely.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/stroke/symptoms/'
  },
  {
    id: 'atrial-fibrillation', category: 'heart', title: 'Atrial Fibrillation and Irregular Pulse',
    summary: 'Atrial fibrillation is an irregular heart rhythm that can cause palpitations, tiredness, dizziness or breathlessness, though some people have no symptoms. It can increase stroke risk.',
    takeaways: ['Seek assessment for a persistent irregular pulse or palpitations.', 'Treatment may control rhythm or rate and reduce clot risk.', 'Call emergency services for chest pain, severe breathlessness or collapse.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/atrial-fibrillation/'
  },
  {
    id: 'coronary-heart-disease', category: 'heart', title: 'Reducing Coronary Heart Disease Risk',
    summary: 'Coronary heart disease develops when blood flow to heart muscle is limited, commonly by fatty deposits in the coronary arteries. Smoking, high blood pressure, cholesterol and diabetes are important modifiable risks.',
    takeaways: ['Stop smoking and seek structured support if needed.', 'Manage blood pressure, cholesterol and diabetes.', 'Regular activity and a heart-healthy diet support prevention.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/coronary-heart-disease/prevention/'
  },
  {
    id: 'palpitations', category: 'heart', title: 'Palpitations: Common Causes and Red Flags',
    summary: 'Palpitations can feel like pounding, fluttering or skipped beats. Many are harmless, but recurrent episodes or symptoms with chest pain, fainting or severe breathlessness need medical assessment.',
    takeaways: ['Track duration, triggers and associated symptoms.', 'Reduce excess caffeine if it appears to trigger episodes.', 'Call 999 for palpitations with chest pain, fainting or severe breathing difficulty.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/heart-palpitations/'
  },
  {
    id: 'blood-clots', category: 'heart', title: 'Blood Clots: DVT and Pulmonary Embolism',
    summary: 'A deep-vein thrombosis can cause pain and swelling, usually in one leg. If a clot travels to the lungs it may cause sudden breathlessness, chest pain or coughing blood and requires emergency care.',
    takeaways: ['Seek urgent advice for unexplained one-sided leg swelling and pain.', 'Call 999 for severe breathlessness, chest pain or collapse.', 'Movement and prescribed prevention matter during higher-risk periods.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/blood-clots/'
  },
  {
    id: 'type-2-diabetes', category: 'conditions', title: 'Type 2 Diabetes: Symptoms and Prevention',
    summary: 'Type 2 diabetes causes blood glucose to become too high. Symptoms may include thirst, frequent urination, tiredness and unexplained weight loss, but many people have few early symptoms.',
    takeaways: ['Request testing if symptoms or risk factors apply.', 'Healthy eating, activity and weight management can reduce risk.', 'Regular reviews help protect eyes, kidneys, feet and cardiovascular health.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/type-2-diabetes/'
  },
  {
    id: 'prediabetes', category: 'conditions', title: 'Prediabetes: What an HbA1c Result Means',
    summary: 'Non-diabetic hyperglycaemia means blood glucose is above the usual range but not in the diabetes range. It signals higher future risk and creates an opportunity for prevention.',
    takeaways: ['Discuss the result and personal risk factors with your clinician.', 'Increase activity and improve food quality through realistic steps.', 'Attend repeat testing when invited.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/type-2-diabetes/food-and-keeping-active/'
  },
  {
    id: 'asthma', category: 'conditions', title: 'Asthma Control and Inhaler Safety',
    summary: 'Asthma can cause wheeze, cough, chest tightness and breathlessness. Good control depends on the right inhalers, correct technique, trigger management and a clear action plan.',
    takeaways: ['Use preventer treatment as prescribed.', 'Ask a pharmacist or clinician to check inhaler technique.', 'Call 999 if a severe attack does not improve with the reliever plan.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/asthma/'
  },
  {
    id: 'copd', category: 'conditions', title: 'COPD: Recognising Persistent Breathlessness',
    summary: 'Chronic obstructive pulmonary disease causes long-term breathing difficulty, cough and frequent chest infections. Smoking is the leading cause, and early assessment can improve symptom management.',
    takeaways: ['Persistent breathlessness or cough deserves assessment.', 'Stopping smoking is the most important protective step for smokers.', 'Vaccination, inhalers and pulmonary rehabilitation may help.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/'
  },
  {
    id: 'thyroid-underactive', category: 'conditions', title: 'Underactive Thyroid: More Than Tiredness',
    summary: 'An underactive thyroid can cause fatigue, feeling cold, weight gain, constipation and low mood. Because these symptoms overlap with other conditions, diagnosis depends on blood testing.',
    takeaways: ['Ask for medical assessment if symptoms persist.', 'Treatment usually requires regular thyroid hormone tablets.', 'Follow-up blood tests help ensure the dose is appropriate.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/underactive-thyroid-hypothyroidism/'
  },
  {
    id: 'pcos', category: 'womens', title: 'PCOS: Symptoms, Fertility and Long-Term Health',
    summary: 'Polycystic ovary syndrome can affect periods, ovulation, hair growth, skin and metabolism. Symptoms vary, and treatment is tailored to priorities such as cycle control, fertility or metabolic health.',
    takeaways: ['Seek assessment for irregular periods or signs of excess androgens.', 'Lifestyle support can improve health even without major weight change.', 'Fertility treatments are available when ovulation is affected.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/'
  },
  {
    id: 'endometriosis', category: 'womens', title: 'Endometriosis: When Period Pain Is Not Normal',
    summary: 'Endometriosis can cause severe period pain, pelvic pain, pain during sex and difficulty becoming pregnant. Symptoms can significantly affect daily life even when scans are normal.',
    takeaways: ['Keep a symptom and cycle diary for appointments.', 'Seek help when pain disrupts work, study, sleep or relationships.', 'Treatment options include pain relief, hormones and surgery.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/endometriosis/'
  },
  {
    id: 'menopause', category: 'womens', title: 'Menopause: Symptoms and Treatment Choices',
    summary: 'Menopause can affect temperature regulation, sleep, mood, concentration, joints and vaginal or urinary health. Treatment should reflect symptoms, medical history and personal preference.',
    takeaways: ['Discuss troublesome symptoms with a GP or qualified clinician.', 'HRT is effective for many symptoms but needs individual assessment.', 'Lifestyle measures can support bone, heart and mental health.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/menopause/'
  },
  {
    id: 'cervical-screening', category: 'womens', title: 'Cervical Screening: What the Test Checks',
    summary: 'Cervical screening checks for high-risk human papillomavirus that can cause cervical cell changes. It is preventive screening rather than a test for symptoms or a cancer diagnosis.',
    takeaways: ['Attend when invited unless a clinician advises otherwise.', 'Contact a GP about unusual bleeding or discharge instead of waiting for screening.', 'Ask the service about adjustments if the test feels difficult.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/cervical-screening/'
  },
  {
    id: 'breast-awareness', category: 'womens', title: 'Breast Awareness and When to Seek Help',
    summary: 'Knowing what is normal for your breasts makes it easier to notice a new lump, skin change, nipple change or persistent pain. Most changes are not cancer, but they should still be assessed.',
    takeaways: ['Look and feel regularly in a way that works for you.', 'Report new or persistent changes promptly.', 'Attend NHS breast screening when invited.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/common-health-questions/womens-health/how-should-i-check-my-breasts/'
  },
  {
    id: 'folic-acid', category: 'pregnancy', title: 'Folic Acid Before and During Pregnancy',
    summary: 'Folic acid taken before conception and in early pregnancy reduces the risk of neural tube defects. Some people need a higher prescribed dose because of medicines or medical history.',
    takeaways: ['Start the recommended supplement before trying to conceive when possible.', 'Continue through the first 12 weeks unless advised differently.', 'Ask a clinician whether you need a higher prescription dose.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/pregnancy/keeping-well/vitamins-supplements-and-nutrition/'
  },
  {
    id: 'foods-pregnancy', category: 'pregnancy', title: 'Food Safety During Pregnancy',
    summary: 'Pregnancy changes susceptibility to certain infections and contaminants. Current guidance covers unpasteurised products, some cheeses, raw or undercooked foods, liver products and fish choices.',
    takeaways: ['Follow current NHS guidance because recommendations can change.', 'Wash produce and avoid cross-contamination in the kitchen.', 'Check medicines and supplements with a pharmacist or clinician.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/pregnancy/keeping-well/foods-to-avoid/'
  },
  {
    id: 'reduced-fetal-movement', category: 'pregnancy', title: 'Reduced Fetal Movement: Do Not Wait',
    summary: 'A change or reduction in a baby’s usual movement pattern needs prompt maternity assessment. There is no single normal number that applies to every pregnancy; the baby’s own pattern matters.',
    takeaways: ['Contact maternity services immediately if movements reduce or change.', 'Do not wait until the next day.', 'Do not rely on a home doppler for reassurance.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/'
  },
  {
    id: 'pregnancy-vaccines', category: 'pregnancy', title: 'Vaccination During Pregnancy',
    summary: 'Recommended vaccines during pregnancy protect the pregnant person and can pass protection to the baby. The programme and timing can change, so current NHS advice matters.',
    takeaways: ['Ask your midwife or GP which vaccines are currently offered.', 'Book within the recommended pregnancy window.', 'Use official guidance for the latest eligibility and timing.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/pregnancy/keeping-well/vaccinations/'
  },
  {
    id: 'postnatal-depression', category: 'pregnancy', title: 'Postnatal Depression: Signs and Support',
    summary: 'Postnatal depression can affect any parent and is more persistent than short-lived baby blues. Symptoms may include low mood, loss of enjoyment, guilt, anxiety or difficulty bonding.',
    takeaways: ['Tell a GP, midwife or health visitor how you feel.', 'Effective psychological and medical treatments are available.', 'Seek urgent help for thoughts of harming yourself or the baby.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/'
  },
  {
    id: 'safe-sleep-baby', category: 'family', title: 'Safer Sleep for Babies',
    summary: 'Safer sleep practices reduce the risk of sudden infant death syndrome. Guidance includes sleep position, a clear sleep space, room sharing and avoiding overheating and smoke exposure.',
    takeaways: ['Place babies on their back for every sleep.', 'Use a firm, flat, clear sleep space.', 'Follow current NHS advice about room sharing and bed sharing.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/'
  },
  {
    id: 'child-fever', category: 'family', title: 'Fever in Children: Home Care and Red Flags',
    summary: 'Fever is common in childhood and often reflects infection. Age, behaviour, hydration, breathing and accompanying symptoms matter more than the temperature number alone.',
    takeaways: ['Offer regular fluids and check the child frequently.', 'Seek urgent advice for concerning symptoms or very young babies.', 'Do not alternate fever medicines unless advised by a professional.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/fever-in-children/'
  },
  {
    id: 'child-vaccinations', category: 'family', title: 'Childhood Vaccination: Staying on Schedule',
    summary: 'The NHS vaccination schedule protects children against serious infections at specific ages. If a dose is missed, a GP practice can usually arrange catch-up without restarting the course.',
    takeaways: ['Keep the child health record and appointment details together.', 'Contact the GP practice about missed doses.', 'Check the current NHS schedule rather than relying on old charts.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them/'
  },
  {
    id: 'child-dehydration', category: 'family', title: 'Dehydration in Babies and Children',
    summary: 'Vomiting, diarrhoea, fever and poor intake can cause dehydration. Fewer wet nappies, dry mouth, unusual sleepiness or sunken eyes are warning signs that need attention.',
    takeaways: ['Offer frequent small amounts of fluid.', 'Ask a pharmacist or clinician about oral rehydration solution.', 'Get urgent help if the child is very drowsy, breathing quickly or passing little urine.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/dehydration/'
  },
  {
    id: 'stress', category: 'mental', title: 'Stress: Recognising Overload Early',
    summary: 'Stress can affect mood, concentration, sleep, appetite and the body. Identifying triggers and reducing avoidable pressure can help, while persistent or overwhelming symptoms deserve professional support.',
    takeaways: ['Break large demands into small, manageable steps.', 'Protect sleep, movement and supportive contact.', 'Self-refer to NHS Talking Therapies where available.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/'
  },
  {
    id: 'anxiety', category: 'mental', title: 'Anxiety, Fear and Panic: When to Get Help',
    summary: 'Anxiety is a normal response to threat, but frequent, intense or difficult-to-control worry can disrupt everyday life. Physical symptoms can include palpitations, dizziness, tension and stomach upset.',
    takeaways: ['Reduce avoidance gradually with suitable support.', 'Use breathing and grounding as short-term tools, not a substitute for care.', 'Seek help when anxiety affects work, relationships or daily functioning.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-panic/'
  },
  {
    id: 'depression', category: 'mental', title: 'Depression Is Treatable',
    summary: 'Depression involves persistent low mood or loss of interest and may affect sleep, appetite, energy, concentration and self-worth. It is a health condition, not a personal failure.',
    takeaways: ['Seek help if low mood lasts more than two weeks or impairs daily life.', 'Talking therapies and medicines are established treatments.', 'Use urgent crisis support for suicidal thoughts or immediate danger.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/mental-health/conditions/depression-in-adults/overview/'
  },
  {
    id: 'five-ways-wellbeing', category: 'mental', title: 'Five Evidence-Informed Steps to Wellbeing',
    summary: 'Connection, physical activity, learning, giving and mindful attention are practical domains that can support wellbeing. They work best as flexible habits rather than another demanding checklist.',
    takeaways: ['Choose one small action that fits your circumstances.', 'Build social connection into existing routines.', 'Seek clinical support when self-help is not enough.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/'
  },
  {
    id: 'sleep-problems', category: 'sleep', title: 'Better Sleep: Start With the Basics',
    summary: 'Regular timing, a wind-down routine, a suitable sleep environment and managing stimulants can improve sleep. Ongoing insomnia can have multiple causes and may need assessment or structured treatment.',
    takeaways: ['Keep wake time consistent, including after a poor night.', 'Reduce late caffeine, alcohol and bright-screen exposure.', 'See a GP if sleep problems persist or significantly affect daytime life.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/insomnia/'
  },
  {
    id: 'sleep-apnoea', category: 'sleep', title: 'Sleep Apnoea: Snoring Plus Daytime Sleepiness',
    summary: 'Obstructive sleep apnoea causes repeated breathing interruptions during sleep. Loud snoring, witnessed pauses, gasping, morning headaches and marked daytime sleepiness are common clues.',
    takeaways: ['Ask a partner whether they notice pauses or gasping.', 'Seek assessment, especially with severe daytime sleepiness.', 'Avoid driving when sleepy and follow DVLA guidance if applicable.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/sleep-apnoea/'
  },
  {
    id: 'walking-health', category: 'fitness', title: 'Walking for Health: A Strong Starting Point',
    summary: 'Brisk walking can improve cardiovascular fitness, mood and stamina without specialised equipment. Starting below your maximum and building gradually makes the habit safer and easier to sustain.',
    takeaways: ['Begin with a duration you can repeat comfortably.', 'Increase time or pace gradually.', 'Stop and seek advice for chest pain, fainting or unusual severe breathlessness.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/exercise/walking-for-health/'
  },
  {
    id: 'physical-activity-guidelines', category: 'fitness', title: 'How Much Physical Activity Do Adults Need?',
    summary: 'UK guidance combines weekly moderate or vigorous aerobic activity with strengthening work and reduced sedentary time. Any activity is better than none, and smaller sessions count.',
    takeaways: ['Spread activity across the week.', 'Include strength work for major muscle groups.', 'Break up long periods of sitting.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/'
  },
  {
    id: 'strength-training', category: 'fitness', title: 'Strength Training for Everyday Function',
    summary: 'Strength work supports muscles, bones, balance and the ability to perform daily tasks. Bodyweight exercises, resistance bands and weights can all be effective when progressed safely.',
    takeaways: ['Train major muscle groups with controlled technique.', 'Allow recovery and progress gradually.', 'Seek tailored advice after injury or with significant medical conditions.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/exercise/strength-and-flex-exercise-plan/'
  },
  {
    id: 'back-pain', category: 'fitness', title: 'Back Pain: Movement, Recovery and Red Flags',
    summary: 'Most back pain improves with time and remaining gently active. Prolonged bed rest can slow recovery, while certain neurological or systemic symptoms need urgent assessment.',
    takeaways: ['Continue normal activity as tolerated.', 'Use simple pain relief only when safe for you.', 'Seek urgent help for new bladder or bowel problems, saddle numbness or major weakness.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/back-pain/'
  },
  {
    id: 'skin-sun-safety', category: 'skin', title: 'Sun Safety Beyond Sunscreen',
    summary: 'Shade, clothing and timing reduce ultraviolet exposure, with sunscreen providing additional protection. No sunscreen blocks all UV, and correct application and reapplication matter.',
    takeaways: ['Use shade and protective clothing during strong sun.', 'Apply suitable broad-spectrum sunscreen generously.', 'Check skin changes and seek advice about a changing mole.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/seasonal-health/sunscreen-and-sun-safety/'
  },
  {
    id: 'eczema', category: 'skin', title: 'Eczema: Protecting the Skin Barrier',
    summary: 'Atopic eczema causes dry, itchy and inflamed skin. Regular emollients, avoiding personal triggers and using prescribed anti-inflammatory treatment correctly can reduce flares.',
    takeaways: ['Use fragrance-free emollients frequently.', 'Avoid scratching where possible and keep nails short.', 'Seek prompt advice for weeping, crusting, pain or rapidly worsening skin.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/atopic-eczema/'
  },
  {
    id: 'acne', category: 'skin', title: 'Acne: Effective Treatment Takes Time',
    summary: 'Acne is influenced by blocked follicles, oil production, bacteria and inflammation—not poor hygiene. Evidence-based topical or oral treatments often need several weeks before clear improvement.',
    takeaways: ['Avoid squeezing spots because it raises scarring risk.', 'Use gentle, non-comedogenic skin products.', 'Seek medical care for painful, scarring or persistent acne.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/acne/'
  },
  {
    id: 'antibiotics', category: 'prevention', title: 'Antibiotics: When They Help and When They Do Not',
    summary: 'Antibiotics treat certain bacterial infections but do not work for viral illnesses such as colds and flu. Unnecessary use increases side effects and antimicrobial resistance.',
    takeaways: ['Take antibiotics exactly as prescribed.', 'Do not share them or save leftovers.', 'Seek urgent help for signs of a severe allergic reaction.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/antibiotics/'
  },
  {
    id: 'flu', category: 'prevention', title: 'Flu: Prevention, Self-Care and Warning Signs',
    summary: 'Influenza often begins quickly with fever, aches, exhaustion and cough. Most people recover at home, while higher-risk groups may need early advice or antiviral treatment.',
    takeaways: ['Check eligibility for seasonal flu vaccination.', 'Rest, drink fluids and avoid spreading infection.', 'Seek urgent care for severe breathing difficulty, chest pain or confusion.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/conditions/flu/'
  },
  {
    id: 'handwashing', category: 'prevention', title: 'Handwashing That Actually Reduces Infection',
    summary: 'Thorough handwashing with soap and water removes germs and helps interrupt infection spread. Technique and timing matter more than expensive products.',
    takeaways: ['Wash after the toilet and before preparing or eating food.', 'Clean palms, backs, between fingers, fingertips and thumbs.', 'Use alcohol hand gel when appropriate if soap and water are unavailable.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/best-way-to-wash-your-hands/'
  },
  {
    id: 'smoking-stop', category: 'prevention', title: 'Stopping Smoking: Support Improves Success',
    summary: 'Stopping smoking reduces health risks at any age. Combining behavioural support with suitable stop-smoking treatment generally gives a better chance of success than relying on willpower alone.',
    takeaways: ['Set a quit plan and identify triggers.', 'Use NHS stop-smoking support and discuss medication options.', 'A lapse is information, not failure—restart promptly.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/better-health/quit-smoking/'
  },
  {
    id: 'alcohol', category: 'prevention', title: 'Alcohol: Lower-Risk Choices and Hidden Units',
    summary: 'Alcohol risk rises with the amount and frequency consumed. Tracking units, planning drink-free days and avoiding binges can make intake more visible and easier to reduce.',
    takeaways: ['Use current UK low-risk drinking guidance.', 'Alternate alcoholic drinks with water or alcohol-free options.', 'Seek help if cutting down causes withdrawal symptoms.'],
    source: 'NHS', sourceUrl: 'https://www.nhs.uk/live-well/alcohol-advice/'
  }
];
