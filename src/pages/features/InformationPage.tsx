import React, { useState, useEffect } from 'react';
import { Info, Building, Music, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import DynamicBackground from '@/components/DynamicBackground';

const InformationPage = () => {
  const { language, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState<'about' | 'entertainment' | 'attractions'>('about');
  const [showContent, setShowContent] = useState(false);
  
  const information = {
    about: {
      en: `Luxury Hotel is a 5-star establishment situated in the heart of the city, offering unparalleled comfort and service. Built in 2010 and fully renovated in 2020, our hotel features 200 elegantly appointed rooms and suites, 3 restaurants, a spa, fitness center, and a rooftop pool with panoramic views. Our commitment to excellence has earned us numerous awards in the hospitality industry.`,
      fa: `هتل لوکس یک مجموعه 5 ستاره در قلب شهر است که آسایش و خدمات بی‌نظیری را ارائه می‌دهد. ساخته شده در سال 2010 و بازسازی کامل در سال 2020، هتل ما دارای 200 اتاق و سوئیت مجلل، 3 رستوران، اسپا، مرکز تناسب اندام و استخر روی پشت بام با چشم‌انداز پانوراما است. تعهد ما به تعالی باعث شده جوایز متعددی در صنعت مهمان‌نوازی کسب کنیم.`,
      ar: `الفندق الفاخر هو مؤسسة 5 نجوم تقع في قلب المدينة، وتقدم راحة وخدمة لا مثيل لها. تم بناؤه في عام 2010 وتم تجديده بالكامل في عام 2020، يضم فندقنا 200 غرفة وجناح أنيق، 3 مطاعم، ومنتجع صحي، ومركز للياقة البدنية، وحمام سباحة على السطح مع إطلالات بانورامية. لقد كسب التزامنا بالتميز العديد من الجوائز في صناعة الضيافة.`
    },
    entertainment: {
      en: `Enjoy our daily entertainment program featuring live music, cultural performances, and themed nights. Our lobby lounge hosts piano performances every evening from 7-10 PM. The rooftop bar features DJ sessions on Friday and Saturday nights. Weekly activities include wine tasting, cooking classes, and yoga sessions by the pool.`,
      fa: `از برنامه سرگرمی روزانه ما شامل موسیقی زنده، اجراهای فرهنگی و شب‌های موضوعی لذت ببرید. لابی لانژ ما هر شب از ساعت 7 تا 10 شب میزبان اجرای پیانو است. بار روی پشت بام در شب های جمعه و شنبه میزبان جلسات DJ است. فعالیت‌های هفتگی شامل چشیدن شراب، کلاس‌های آشپزی و جلسات یوگا در کنار استخر است.`,
      ar: `استمتع ببرنامجنا الترفيهي اليومي الذي يتضمن موسيقى حية وعروض ثقافية وليالي مواضيعية. يستضيف ردهة الاستقبال لدينا عروض البيانو كل مساء من الساعة 7-10 مساءً. يستضيف البار الموجود على السطح جلسات دي جي في ليالي الجمعة والسبت. تشمل الأنشطة الأسبوعية تذوق النبيذ ودروس الطبخ وجلسات اليوغا بجانب المسبح.`
    },
    attractions: {
      en: `Discover the city's most captivating attractions, all within easy reach of our hotel. The Historic City Center is just a 10-minute walk away, featuring architectural wonders and charming cafes. The Museum District, with its 5 world-class museums, is a 15-minute taxi ride. For shopping enthusiasts, the Luxury Shopping Mall is directly connected to our hotel via an underground passage.`,
      fa: `جذاب‌ترین جا��به‌های شهر را کشف کنید که همگی به راحتی از هتل ما قابل دسترسی هستند. مرکز تاریخی شهر تنها 10 دقیقه پیاده‌روی فاصله دارد و دارای شگفتی‌های معماری و کافه‌های دلنشین است. منطقه موزه با 5 موزه در سطح جهانی، 15 دقیقه با تاکسی فاصله دارد. برای علاقه‌مندان به خرید، مرکز خرید لوکس از طریق یک گذرگاه زیرزمینی مستقیماً به هتل ما متصل است.`,
      ar: `اكتشف أكثر مناطق الجذب الساحرة في المدينة، وكلها في متناول الفندق. يبعد وسط المدينة التاريخي مسافة 10 دقائق سيرًا على الأقدام فقط، ويضم عجائب معمارية ومقاهي ساحرة. تبعد منطقة المتحف، بمتاحفها الخمسة ذات المستوى العالمي، 15 دقيقة بسيارة أجرة. بالنسبة لعشاق التسوق، يتصل مول التسوق الفاخر مباشرة بفندقنا عبر ممر تحت الأرض.`
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DynamicBackground>
      <div className={`min-h-screen ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
        <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <BackButton />
          </div>
          <div className="pointer-events-auto">
            <LanguageToggle />
          </div>
        </div>
        
        {!showContent ? (
          <div className="flex-1 flex items-center justify-center min-h-screen">
            <div className="text-center animate-pulse p-6 glass-effect rounded-2xl max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-hotel-gold mx-auto flex items-center justify-center mb-4">
                <Info className="text-white w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {getTranslation('information', language)}
              </h1>
              <p className="text-white/80">
                {getTranslation('loadingInformation', language) || 'Loading hotel information...'}
              </p>
            </div>
          </div>
        ) : (
          <div className="pt-24 px-6 pb-6 animate-slide-up max-w-lg mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
                <Info className="text-white w-8 h-8" />
              </div>
              <h1 className="text-2xl font-medium text-white">
                {getTranslation('information', language)}
              </h1>
            </div>
            
            <div className="glass-effect rounded-full p-1 mb-6 flex">
              <button 
                className={cn(
                  "flex-1 py-2 rounded-full text-sm transition-all duration-300 flex items-center justify-center gap-2",
                  activeTab === 'about' 
                    ? "bg-hotel-gold text-white" 
                    : "hover:bg-hotel-cream"
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
                    ? "bg-hotel-gold text-white" 
                    : "hover:bg-hotel-cream"
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
                    ? "bg-hotel-gold text-white" 
                    : "hover:bg-hotel-cream"
                )}
                onClick={() => setActiveTab('attractions')}
              >
                <MapPin className="w-4 h-4" />
                <span>{getTranslation('attractions', language)}</span>
              </button>
            </div>
            
            <div className="glass-effect rounded-xl p-6 text-start">
              {activeTab === 'about' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-medium mb-4">
                    {getTranslation('aboutHotel', language)}
                  </h2>
                  <p className="text-hotel-charcoal">
                    {information.about[language]}
                  </p>
                </div>
              )}
              
              {activeTab === 'entertainment' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-medium mb-4">
                    {getTranslation('entertainment', language)}
                  </h2>
                  <p className="text-hotel-charcoal">
                    {information.entertainment[language]}
                  </p>
                </div>
              )}
              
              {activeTab === 'attractions' && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-medium mb-4">
                    {getTranslation('attractions', language)}
                  </h2>
                  <p className="text-hotel-charcoal">
                    {information.attractions[language]}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DynamicBackground>
  );
};

export default InformationPage;
