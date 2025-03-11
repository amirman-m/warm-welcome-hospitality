
import React, { useState } from 'react';
import { Info, Building, Music, MapPin, Hotel, Book } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation, TranslationKey } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import AttractionItem from '@/components/AttractionItem';
import { attractionsData } from '@/data/attractions';

const InformationPage = () => {
  const { language, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState<'about' | 'entertainment' | 'attractions'>('about');
  
  const information = {
    about: {
      en: `Luxury Hotel is a 5-star establishment situated in the heart of the city, offering unparalleled comfort and service. Built in 2010 and fully renovated in 2020, our hotel features 200 elegantly appointed rooms and suites, 3 restaurants, a spa, fitness center, and a rooftop pool with panoramic views. Our commitment to excellence has earned us numerous awards in the hospitality industry.`,
      fa: `هتل لوکس یک مجموعه 5 ستاره در قلب شهر است که آسایش و خدمات بی‌نظیری را ارائه می‌دهد. ساخته شده در سال 2010 و بازسازی کامل در سال 2020، هتل ما دارای 200 اتاق و سوئیت مجلل، 3 رستوران، اسپا، مرکز تناسب اندام و استخر روی پشت بام با چشم‌انداز پانوراما است. تعهد ما به تعالی باعث شده جوایز متعددی در صنعت مهمان‌نوازی کسب کنیم.`,
      ar: `الفندق الفاخر هو مؤسسة 5 نجوم تقع في قلب المدينة، وتقدم راحة وخدمة لا مثيل لها. تم بناؤه في عام 2010 وتم تجديده بالكامل في عام 2020، يضم فندقنا 200 غرفة وجناح أنيق، و 3 مطاعم، ومنتجع صحي، ومركز للياقة البدنية، وحمام سباحة على السطح مع إطلالات بانورامية. لقد كسب التزامنا بالتميز العديد من الجوائز في صناعة الضيافة.`
    },
    entertainment: {
      en: `Enjoy our daily entertainment program featuring live music, cultural performances, and themed nights. Our lobby lounge hosts piano performances every evening from 7-10 PM. The rooftop bar features DJ sessions on Friday and Saturday nights. Weekly activities include wine tasting, cooking classes, and yoga sessions by the pool.`,
      fa: `از برنامه سرگرمی روزانه ما شامل موسیقی زنده، اجراهای فرهنگی و شب‌های موضوعی لذت ببرید. لابی لانژ ما هر شب از ساعت 7 تا 10 شب میزبان اجرای پیانو است. بار روی پشت بام در شب های جمعه و شنبه میزبان جلسات DJ است. فعالیت‌های هفتگی شامل چشیدن شراب، کلاس‌های آشپزی و جلسات یوگا در کنار استخر است.`,
      ar: `استمتع ببرنامجنا الترفيهي اليومي الذي يتضمن موسيقى حية وعروض ثقافية وليالي مواضيعية. يستضيف ردهة الاستقبال لدينا عروض البيانو كل مساء من الساعة 7-10 مساءً. يستضيف البار الموجود على السطح جلسات دي جي في ليالي الجمعة والسبت. تشمل الأنشطة الأسبوعية تذوق النبيذ ودروس الطبخ وجلسات اليوغا بجانب المسبح.`
    }
  };
  
  // Hotel amenities list with properly typed keys as TranslationKey
  const hotelAmenities = [
    { key: 'swimmingPool' as TranslationKey, icon: '🏊‍♂️' },
    { key: 'fitnessCenter' as TranslationKey, icon: '💪' },
    { key: 'spaWellness' as TranslationKey, icon: '💆‍♀️' },
    { key: 'businessCenter' as TranslationKey, icon: '💼' },
    { key: 'restaurantBar' as TranslationKey, icon: '🍽️' }
  ];
  
  // Hotel rules list with properly typed keys as TranslationKey
  const hotelRules = [
    { key: 'checkInOut' as TranslationKey, icon: '🔑' },
    { key: 'breakfastHours' as TranslationKey, icon: '☕' },
    { key: 'petsPolicy' as TranslationKey, icon: '🐾' },
    { key: 'smokingPolicy' as TranslationKey, icon: '🚭' }
  ];
  
  return (
    <div className={`min-h-screen relative ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1483058712412-4245e9b90334')",
          filter: "brightness(0.7) blur(2px)",
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px]" />
      
      {/* Content Container - Using relative positioning to appear above the background */}
      <div className="relative z-10 min-h-screen p-6 pt-20">
        <LanguageToggle />
        <BackButton />
        
        <div className="max-w-2xl mx-auto animate-slide-up">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3 shadow-lg">
              <Info className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-medium text-white drop-shadow-md">
              {getTranslation('information', language)}
            </h1>
          </div>
          
          {/* Tabs - Enhanced with shadow for depth */}
          <div className="glass-effect rounded-full p-1 mb-6 flex shadow-xl">
            <button 
              className={cn(
                "flex-1 py-2 rounded-full text-sm transition-all duration-300 flex items-center justify-center gap-2",
                activeTab === 'about' 
                  ? "bg-hotel-gold text-white shadow-md" 
                  : "hover:bg-hotel-cream/70 text-white"
              )}
              onClick={() => setActiveTab('about')}
            >
              <Building className="w-4 h-4" />
              <span>{getTranslation('aboutHotel', language)}</span>
            </button>
            <button 
              className={cn(
                "flex-1 py-2 rounded-full text-sm transition-all duration-300 flex items-center justify-center gap-2",
                activeTab === 'entertainment' 
                  ? "bg-hotel-gold text-white shadow-md" 
                  : "hover:bg-hotel-cream/70 text-white"
              )}
              onClick={() => setActiveTab('entertainment')}
            >
              <Music className="w-4 h-4" />
              <span>{getTranslation('entertainment', language)}</span>
            </button>
            <button 
              className={cn(
                "flex-1 py-2 rounded-full text-sm transition-all duration-300 flex items-center justify-center gap-2",
                activeTab === 'attractions' 
                  ? "bg-hotel-gold text-white shadow-md" 
                  : "hover:bg-hotel-cream/70 text-white"
              )}
              onClick={() => setActiveTab('attractions')}
            >
              <MapPin className="w-4 h-4" />
              <span>{getTranslation('attractions', language)}</span>
            </button>
          </div>
          
          {/* Content - Enhanced glass effect with deeper shadow */}
          <div className="bg-white/85 backdrop-blur-md rounded-xl p-6 text-start shadow-2xl border border-white/40">
            {activeTab === 'about' && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-4 text-hotel-charcoal">
                    {getTranslation('aboutHotel', language)}
                  </h2>
                  <p className="text-hotel-charcoal">
                    {information.about[language]}
                  </p>
                </div>
                
                {/* Hotel Amenities Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-hotel-charcoal border-b border-hotel-gold/50 pb-2">
                    {getTranslation('hotelAmenities', language)}
                  </h3>
                  <ul className="space-y-2 list-inside">
                    {hotelAmenities.map((amenity) => (
                      <li key={amenity.key.toString()} className="flex items-start gap-3">
                        <span className="text-xl">{amenity.icon}</span>
                        <span className="text-hotel-charcoal">
                          {getTranslation(amenity.key, language)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Hotel Rules Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-hotel-charcoal border-b border-hotel-gold/50 pb-2">
                    {getTranslation('hotelRules', language)}
                  </h3>
                  <ul className="space-y-2 list-inside">
                    {hotelRules.map((rule) => (
                      <li key={rule.key.toString()} className="flex items-start gap-3">
                        <span className="text-xl">{rule.icon}</span>
                        <span className="text-hotel-charcoal">
                          {getTranslation(rule.key, language)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'entertainment' && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-medium mb-4 text-hotel-charcoal">
                  {getTranslation('entertainment', language)}
                </h2>
                <p className="text-hotel-charcoal">
                  {information.entertainment[language]}
                </p>
              </div>
            )}
            
            {activeTab === 'attractions' && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-medium mb-4 text-hotel-charcoal">
                  {getTranslation('attractions', language)}
                </h2>
                <div className="mt-4 space-y-2">
                  {attractionsData.map((attraction) => (
                    <AttractionItem 
                      key={attraction.id}
                      {...attraction}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
