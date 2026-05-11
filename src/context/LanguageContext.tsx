'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface Translations {
  [key: string]: {
    en: string;
    ml: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.shop': { en: 'Shop', ml: 'ഷോപ്പ്' },
  'nav.bundles': { en: 'Bundles', ml: 'ബണ്ടിലുകൾ' },
  'nav.recipes': { en: 'Recipes', ml: 'പാചകക്കുറിപ്പുകൾ' },
  'nav.about': { en: 'About', ml: 'ഞങ്ങളെക്കുറിച്ച്' },
  'nav.home': { en: 'Home', ml: 'ഹോം' },
  'nav.login': { en: 'Login', ml: 'ലോഗിൻ' },
  'nav.register': { en: 'Register', ml: 'രജിസ്റ്റർ' },
  'nav.search': { en: 'Search spices...', ml: 'മസാലകൾ തിരയുക...' },
  'nav.free_shipping': { en: 'Free Shipping on Orders Above', ml: 'ഇതിൽ കൂടുതൽ ഓർഡറുകൾക്ക് സൗജന്യ ഷിപ്പിംഗ്' },

  // Hero
  'hero.title': { en: "Leela's", ml: 'ലീലാസ്' },
  'hero.subtitle': { en: 'Join the World of Flavor', ml: 'രുചിയുടെ ലോകത്തേക്ക് സ്വാഗതം' },
  'hero.description': { en: 'Discover handpicked spices, timeless recipes, and exclusive blends crafted with care.', ml: 'ശ്രദ്ധയോടെ തയ്യാറാക്കിയ സുഗന്ധവ്യഞ്ജനങ്ങളും എക്സ്ക്ലൂസീവ് ബ്ലെൻഡുകളും കണ്ടെത്തൂ.' },
  'hero.whole': { en: 'WHOLE', ml: 'മുഴുവൻ' },
  'hero.ground': { en: 'GROUND', ml: 'പൊടി' },
  'hero.blends': { en: 'BLENDS', ml: 'മിശ്രിതം' },
  'hero.buy_now': { en: 'BUY NOW ★ SHOP LEELAS', ml: 'വാങ്ങൂ ★ ലീലാസ് ഷോപ്പ്' },

  // Home Sections
  'home.featured_title': { en: 'Featured Products', ml: 'പ്രത്യേക മസാലകൾ' },
  'home.featured_desc': { en: 'Authentic recipes. Bold flavors. Crafted in small batches.', ml: 'യഥാർത്ഥ പാചകക്കുറിപ്പുകൾ. മികച്ച രുചി. ചെറിയ ബാച്ചുകളായി തയ്യാറാക്കിയത്.' },
  'home.philosophy_label': { en: 'Our Philosophy', ml: 'ഞങ്ങളുടെ തത്വം' },
  'home.philosophy_title': { en: 'The Journey of Flavor', ml: 'രുചിയുടെ യാത്ര' },
  'home.explore_title': { en: 'Explore Our Spices', ml: 'മസാലകൾ പരിചയപ്പെടൂ' },
  'home.explore_desc': { en: 'From whole spices to finely ground blends, find the perfect flavor for every dish.', ml: 'മുഴുവൻ മസാലകൾ മുതൽ പൊടിച്ച മിശ്രിതങ്ങൾ വരെ, എല്ലാ വിഭവങ്ങൾക്കും അനുയോജ്യമായ രുചി കണ്ടെത്തൂ.' },
  'home.promise_label': { en: 'Our Promise', ml: 'ഞങ്ങളുടെ ഉറപ്പ്' },
  'home.promise_title': { en: 'Why Our Spices Stand Apart', ml: 'എന്തുകൊണ്ട് ലീലാസ് മസാലകൾ?' },

  // Auth
  'auth.sign_in': { en: 'Sign In', ml: 'ലോഗിൻ ചെയ്യുക' },
  'auth.sign_up': { en: 'Sign Up', ml: 'സൈൻ അപ്പ്' },
  'auth.welcome_back': { en: 'Welcome Back', ml: 'വീണ്ടും സ്വാഗതം' },
  'auth.create_account': { en: 'Create Account', ml: 'അക്കൗണ്ട് തുടങ്ങുക' },

  // Products
  'products.title': { en: 'Our Spice Collection', ml: 'ഞങ്ങളുടെ സ്പൈസ് ശേഖരം' },
  'products.all': { en: 'All Spices', ml: 'എല്ലാ മസാലകളും' },
  'products.whole': { en: 'Whole Spices', ml: 'മുഴുവൻ മസാലകൾ' },
  'products.ground': { en: 'Ground & Powders', ml: 'പൊടികൾ' },
  'products.blends': { en: 'Authentic Blends', ml: 'യഥാർത്ഥ ബ്ലെൻഡുകൾ' },
  'products.premium': { en: 'Premium', ml: 'പ്രീമിയം' },
  'products.essentials': { en: 'Essentials', ml: 'അത്യാവശ്യവസ്തുക്കൾ' },
  'products.quick_add': { en: 'Quick Add', ml: 'വേഗത്തിൽ ചേർക്കുക' },
  'products.details': { en: 'Details', ml: 'വിവരങ്ങൾ' },
  'products.showing': { en: 'Showing', ml: 'കാണിക്കുന്നത്' },
  'products.items': { en: 'items', ml: 'എണ്ണം' },
  'products.item': { en: 'item', ml: 'എണ്ണം' },
  'products.find_spice': { en: 'Find a spice...', ml: 'മസാലകൾ തിരയുക...' },
  'products.sort_by': { en: 'Sort by', ml: 'ക്രമീകരിക്കുക' },
  'products.reviews': { en: 'Reviews', ml: 'അഭിപ്രായങ്ങൾ' },
  'products.add_to_cart': { en: 'Add to Cart', ml: 'കാർട്ടിൽ ചേർക്കുക' },
  'products.buy_now': { en: 'Buy Now', ml: 'ഇപ്പോൾ വാങ്ങൂ' },
  'products.ships_in': { en: 'Ships in 2–3 business days', ml: '2-3 ദിവസത്തിനുള്ളിൽ അയയ്ക്കും' },
  'products.the_craft': { en: 'The Craft', ml: 'നിർമ്മാണം' },
  'products.heritage': { en: 'Heritage & Artisanal Process', ml: 'പാരമ്പര്യവും നിർമ്മാണ രീതിയും' },
  'products.how_to_use': { en: 'How to Use', ml: 'ഉപയോഗിക്കേണ്ട വിധം' },
  'products.what_customers_say': { en: 'What Our Customers Say', ml: 'ഉപഭോക്താക്കൾ പറയുന്നത്' },
  'products.write_review': { en: 'Write a Review', ml: 'അഭിപ്രായം രേഖപ്പെടുത്തുക' },
  'products.average': { en: 'Average', ml: 'ശരാശരി' },
  'products.read_all': { en: 'Read All', ml: 'എല്ലാം വായിക്കുക' },

  // About Page
  'about.title': { en: 'Our Story', ml: 'ഞങ്ങളുടെ കഥ' },
  'about.subtitle': { en: 'A Heritage of Flavor and Tradition', ml: 'രുചിയുടെയും പാരമ്പര്യത്തിന്റെയും പൈതൃകം' },
  'about.story_title': { en: 'Since 1982', ml: '1982 മുതൽ' },
  'about.story_text': { en: "Leela's Spices began in a small kitchen in the heart of Kerala, with a simple mission: to share the pure, unadulterated flavors of our land with the world. Founded by Leela Amma, our brand has grown from a local secret to a global name, yet our commitment to traditional hand-pounding and artisanal sourcing remains unchanged.", ml: 'കേരളത്തിന്റെ ഹൃദയഭാഗത്തുള്ള ഒരു ചെറിയ അടുക്കളയിൽ നിന്നാണ് ലീലയുടെ സ്പൈസസ് ആരംഭിച്ചത്. ഞങ്ങളുടെ നാടിന്റെ പരിശുദ്ധവും കലർപ്പില്ലാത്തതുമായ രുചികൾ ലോകവുമായി പങ്കുവെക്കുക എന്ന ലളിതമായ ദൗത്യമായിരുന്നു അതിന് പിന്നിൽ. ലീല അമ്മ സ്ഥാപിച്ച ഞങ്ങളുടെ ബ്രാൻഡ് ഒരു പ്രാദേശിക രഹസ്യത്തിൽ നിന്ന് ആഗോള നാമമായി വളർന്നു.' },
  'about.philosophy_title': { en: 'Our Philosophy', ml: 'ഞങ്ങളുടെ തത്വശാസ്ത്രം' },
  'about.value1_title': { en: 'Artisanal Sourcing', ml: 'കരകൗശല ഉറവിടം' },
  'about.value1_desc': { en: 'We work directly with small-scale farmers to ensure the highest quality harvests.', ml: 'ഏറ്റവും ഗുണനിലവാരമുള്ള വിളവെടുപ്പ് ഉറപ്പാക്കാൻ ഞങ്ങൾ ചെറുകിട കർഷകരുമായി നേരിട്ട് പ്രവർത്തിക്കുന്നു.' },
  'about.value2_title': { en: 'Traditional Methods', ml: 'പരമ്പരാഗത രീതികൾ' },
  'about.value2_desc': { en: 'Many of our spices are still ground using traditional methods to preserve essential oils.', ml: 'അത്യാവശ്യ എണ്ണകൾ സംരക്ഷിക്കുന്നതിനായി ഞങ്ങളുടെ പല മസാലകളും ഇപ്പോഴും പരമ്പരാഗത രീതികൾ ഉപയോഗിച്ചാണ് പൊടിക്കുന്നത്.' },
  'about.value3_title': { en: 'No Additives', ml: 'മാലിന്യങ്ങളില്ല' },
  'about.value3_desc': { en: 'Pure spices, zero preservatives, and no artificial colors ever.', ml: 'ശുദ്ധമായ മസാലകൾ, പ്രിസർവേറ്റീവുകൾ ഇല്ല, കൃത്രിമ നിറങ്ങൾ ഒരിക്കലും ഉപയോഗിക്കില്ല.' },
  'about.shop_now': { en: 'Shop the Collection', ml: 'ശേഖരം കാണുക' },

  // Sort
  'sort.featured': { en: 'Featured', ml: 'പ്രത്യേകമായവ' },
  'sort.price_low': { en: 'Price: Low to High', ml: 'വില: കുറഞ്ഞത് മുതൽ' },
  'sort.price_high': { en: 'Price: High to Low', ml: 'വില: കൂടിയത് മുതൽ' },
  'sort.rating': { en: 'Top Rated', ml: 'മികച്ചവ' },
  'sort.newest': { en: 'Newest', ml: 'പുതിയവ' },

  // Cart
  'cart.title': { en: 'Your Cart', ml: 'നിങ്ങളുടെ കാർട്ട്' },
  'cart.empty': { en: 'Your cart is empty', ml: 'കാർട്ട് ശൂന്യമാണ്' },
  'cart.checkout': { en: 'Checkout', ml: 'ചെക്ക് ഔട്ട്' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('leelas_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ml')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('leelas_lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      <div className={language === 'ml' ? 'font-malayalam' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
