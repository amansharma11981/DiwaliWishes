/**
 * Fallback wish service — returns curated hardcoded wishes when no AI key is
 * configured or when all AI providers fail.
 *
 * Collection covers every required [recipient × tone] combination for English,
 * plus general Hindi and Hinglish sets.
 */

// ── Wish collections ──────────────────────────────────────────────────────────

const WISHES = {
  // ── Family × Emotional ──────────────────────────────────────────────────────
  family_emotional_english: [
    'This Diwali, I want you to know that the warmth I feel in this home is brighter than a thousand diyas. 🪔 Thank you for being my shelter, my laughter, and my light in every storm.',
    'Every lamp we light together is a prayer I carry in my heart — may this Diwali fill our family with health, joy, and the kind of love that never dims. 🪷✨',
    'The festival of lights means little without the people who light up my world. Having you by my side makes every Diwali the most beautiful one yet. 🎆',
    'In the glow of the diya, I see reflections of every memory we have shared, every meal, every celebration, every quiet evening. May this festival renew the bond that makes us family. 🪔🌟',
    'Some things shine brighter than any firework — your unconditional love is one of them. Wishing our family a Diwali overflowing with togetherness and joy. 🎇🪷',
  ],

  // ── Family × Traditional ────────────────────────────────────────────────────
  family_traditional_english: [
    'As Goddess Lakshmi steps across the threshold and Ram returns to Ayodhya in our hearts, may her blessings of prosperity and peace fill every corner of our home. 🪔🪷 Shubh Deepawali!',
    'On this sacred evening of Deepawali, may the light of a thousand diyas guide our family toward dharma, arogya, and ananda. May Maa Lakshmi bless our home abundantly. ✨',
    'The tradition of lighting diyas is not merely custom — it is the ancient prayer of our ancestors that darkness shall never prevail. May we carry this light forward for generations. 🪔🎆',
    'This Diwali, as we perform the Lakshmi Puja together, let us remember that true wealth is the love, health, and togetherness that adorns our family. Shubh Deepawali! 🪷',
    'May the sacred diyas we kindle tonight invoke the blessings of Maa Lakshmi and Ganesha upon every soul in our family — health, wisdom, abundance, and divine grace. 🪔✨',
  ],

  // ── Friends × Funny ─────────────────────────────────────────────────────────
  friends_funny_english: [
    "Happy Diwali to my favorite chaos-makers! May your sweets be plentiful, your crackers be loud, and your relatives' visits be mercifully short. 🎆😄",
    'Wishing you a Diwali so sparkly that even your WiFi router glows. May your mithai intake be legendary and your gym guilt be postponed to next year. 🪔💪😂',
    "This Diwali, may the only things that burst be the firecrackers and not your Diwali outfit after all those ladoos. 🎇🍬 Stay gorgeous, stay hungry, happy Deepawali!",
    "May your Diwali be bright, your relatives' gifts be cash, and your 'just one more ladoo' count reach double digits. 🪷🪔 You deserve all of it, bestie!",
    "Sending you Diwali love, light, and a gentle reminder: the calories in Diwali sweets don't count. It's science. I think. Happy Deepawali! 🎆✨",
  ],

  // ── Friends × Emotional ─────────────────────────────────────────────────────
  friends_emotional_english: [
    'Real friendship is like a diya — it burns steadily even in the wind, lighting the way when everything else goes dark. Thank you for being that light in my life. 🪔 Happy Diwali!',
    "Diwali feels warmer, brighter, and more meaningful because I get to celebrate it knowing you are in my world. Here's to a festival as beautiful as our friendship. 🪷✨",
    'Some friendships are once-in-a-lifetime gifts. You are mine. May this Diwali bring you as much happiness as you have brought into my life. 🎆🪔',
    'On a festival that celebrates the triumph of light, I celebrate the light you have been in my darkest moments. Happy Diwali, my dearest friend. 🎇🌟',
    "The best part of Diwali isn't the lights or the sweets — it's the people you share them with. So glad I get to share this one with you. 🪔🪷 Happy Deepawali!",
  ],

  // ── Colleagues × Professional ───────────────────────────────────────────────
  colleagues_professional_english: [
    'Wishing you and your family a joyful and prosperous Deepawali. May this festival illuminate new opportunities and success in the year ahead. 🪔✨ Shubh Deepawali!',
    "On this occasion of Diwali, I hope the festival's spirit of new beginnings brings fresh inspiration and growth to your professional and personal life alike. 🪷🎆",
    'Happy Deepawali! May the light of this festival guide your path toward continued success, good health, and wellbeing for you and everyone you hold dear. 🪔',
    "Diwali is a time for gratitude and new beginnings. It has been a pleasure working alongside you this year. Here's to an even brighter year ahead. 🎇✨ Shubh Deepawali!",
    'Warm Diwali wishes to you and your loved ones. May this festival of lights bring prosperity, peace, and boundless positivity into your world. 🪔🪷',
  ],

  // ── Partner × Romantic ──────────────────────────────────────────────────────
  partner_romantic_english: [
    'Every diya I light this Diwali is a small testament to the fire you have sparked in my heart. With you, every day feels like a festival. 🪔✨ Happy Diwali, my love.',
    "The most beautiful light this Diwali isn't in the sky — it's in your eyes. Thank you for making every celebration brighter simply by being in it. 🪷🎆",
    "They say Diwali is about light triumphing over darkness. Loving you has been my greatest triumph. Here's to this festival, and every one to come, together. 🎇🪔",
    "With you, I don't need a sky full of fireworks — your smile alone lights up my entire world. Happy Diwali to the person who is my home. 🪔💫",
    'May this Diwali be as radiant and enduring as what we have built together. I am so grateful to walk through every festival season beside you. 🪷✨ Happy Deepawali, my heart.',
  ],

  // ── Parents × Emotional ─────────────────────────────────────────────────────
  parents_emotional_english: [
    'You taught me that the greatest light is the one we carry within. This Diwali, I celebrate not just the festival, but everything you have poured into shaping who I am. 🪔 With all my love.',
    'Every time I light a diya, I think of the countless times you lit the way for me — with your patience, your sacrifices, and your unshakeable belief in me. Thank you, and happy Diwali. 🪷✨',
    'The best wish I could ever receive has already been granted — the gift of parents like you. May this Diwali bring you health, joy, and the rest you so truly deserve. 🎆🪔',
    'Your love has been the truest festival of lights in my life. This Diwali, I simply want to say: I see you, I am grateful for you, and I love you deeply. 🎇🌟',
    "If I could wrap up Diwali's warmth and glow and place it in your hands, it still wouldn't compare to what you have given me my whole life. Happy Deepawali to my everything. 🪔🪷",
  ],

  // ── Teacher × Professional ──────────────────────────────────────────────────
  teacher_professional_english: [
    'Happy Diwali! Your guidance has been a steady light in my journey of learning. I am deeply grateful for every lesson, every correction, and every word of encouragement. 🪔✨',
    'On this festival of knowledge and light, I want to express my heartfelt gratitude for the wisdom you so generously share. Wishing you a joyful and blessed Deepawali. 🪷🎆',
    'The diya symbolises the dispelling of ignorance with knowledge — a role you embody every single day. Thank you, and may this Diwali bless you abundantly. 🎇🪔',
    "Your classroom has been a lamp that illuminated paths I didn't know existed. This Diwali, I celebrate that light — and the teacher who tends it. Happy Deepawali! ✨🪷",
    'Wishing you a serene and prosperous Diwali. The lessons you have given me extend far beyond the subject — they are lessons in character, perseverance, and curiosity. Thank you. 🪔',
  ],

  // ── Hindi (general) ─────────────────────────────────────────────────────────
  general_hindi: [
    'आपके जीवन में खुशियों के दीप सदा जलते रहें, अंधकार कभी न आए। दीपावली की हार्दिक शुभकामनाएँ! 🪔✨',
    'दीवाली का यह पावन त्योहार आपके घर में सुख, समृद्धि और प्रेम लेकर आए। माँ लक्ष्मी की कृपा सदा आप पर बनी रहे। 🪷🎆',
    'जैसे दीपक अंधेरे को दूर करता है, वैसे ही आपका जीवन सदा प्रकाश से भरा रहे। आपको और आपके परिवार को शुभ दीपावली! 🎇🪔',
    'इस दीवाली, ईश्वर से प्रार्थना है कि आपके हर सपने पूरे हों, हर कदम पर सफलता मिले, और घर में सुख की रोशनी बनी रहे। 🪔🌟',
    'रंगोली की रंगत, दीयों की लौ और मिठाई की मिठास — यही है दीवाली का असली उत्सव। आपको ढेर सारी खुशियाँ और शुभकामनाएँ! 🪷✨',
  ],

  // ── Hinglish (general) ──────────────────────────────────────────────────────
  general_hinglish: [
    'Yaar, is Diwali khoob masti karo, diyas jalao, sweets khao aur life ke saare andheron ko light kar do! 🪔🎆 Happy Diwali!',
    'Diwali ki bahut saari shubhkamnaayein! May your ghar be full of roshnai, your dil full of khushi, aur aapka bank balance full of Lakshmi Ji ki kripa. 💫🪷',
    'Is Diwali, sirf crackers hi nahi, apni worries bhi blast kar do — aur ek nayi shuruaat karo full josh ke saath! 🎇✨ Shubh Deepawali!',
    "Diya jalaana easy hai, par us roshni ko apne andar rakhna — that's the real Diwali spirit. Keep shining, happy Deepawali! 🪔🌟",
    "Rang, roshni, mithai aur apne apno ke saath celebrate karo — that's the best Diwali formula ever. Wishing you all of it and more! 🎆🪷",
  ],
};

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Generate wishes from the hardcoded collection.
 *
 * @param {object} opts
 * @returns {Array<{id:string, text:string, provider:string}>}
 */
export function generateFallback({ recipient, tone, language, length, count = 3 }) {
  const wishes = selectWishes(recipient, tone, language);
  const shuffled = shuffle(wishes);
  const selected = shuffled.slice(0, count);

  return selected.map((text, i) => ({
    id: `fallback-${Date.now()}-${i}`,
    text,
    provider: 'fallback',
  }));
}

/**
 * Return the full curated collection grouped by category (for GET /api/wishes).
 */
export function getCuratedWishes() {
  return {
    family_emotional: WISHES.family_emotional_english,
    family_traditional: WISHES.family_traditional_english,
    friends_funny: WISHES.friends_funny_english,
    friends_emotional: WISHES.friends_emotional_english,
    colleagues_professional: WISHES.colleagues_professional_english,
    partner_romantic: WISHES.partner_romantic_english,
    parents_emotional: WISHES.parents_emotional_english,
    teacher_professional: WISHES.teacher_professional_english,
    hindi: WISHES.general_hindi,
    hinglish: WISHES.general_hinglish,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function selectWishes(recipient, tone, language) {
  // Hindi / Hinglish override
  if (language === 'hindi') return WISHES.general_hindi;
  if (language === 'hinglish') return WISHES.general_hinglish;

  // Try exact match for recipient_tone
  const key = `${recipient}_${tone}_english`;
  if (WISHES[key] && WISHES[key].length > 0) return WISHES[key];

  // Partial match: same recipient, any tone
  const recipientMatch = Object.keys(WISHES).find(
    (k) => k.startsWith(`${recipient}_`) && k.endsWith('_english') && WISHES[k].length > 0
  );
  if (recipientMatch) return WISHES[recipientMatch];

  // Fallback: family emotional
  return WISHES.family_emotional_english;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
