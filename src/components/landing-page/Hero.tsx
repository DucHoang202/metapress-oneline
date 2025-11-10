import React, { useEffect, useState } from "react";

interface HeroData {
  section: string;
  status: string;
  name: string;
  title: string;
  subtitle: string;
  button: string;
}

const Hero: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    // Lấy dữ liệu từ (window as any).language
    const languageData = (window as any).language;
    if (languageData?.data) {
      // Tìm section có section === "hero"
      const hero = languageData.data.find((item: any) => item.section === "hero");
      if (hero) {
        setHeroData(hero);
      }
    }
  }, []);

  // Hiển thị loading hoặc fallback nếu chưa có dữ liệu
  if (!heroData) {
    return null;
  }

  return (
    <section className="hero-section">
      <div className="hero-section__container">
        <div className="hero-section__content">
          <div className="newsroom">
            <div className="status">
              <div className="text">{heroData.status}</div>
            </div>
            <div className="name">{heroData.name}</div>
            <div className="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M8.375 2.625L12.75 7M12.75 7L8.375 11.375M12.75 7H2.25" stroke="#FCF5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="title" dangerouslySetInnerHTML={{ __html: heroData.title }} />
          <div className="subtitle">{heroData.subtitle}</div>
          <div className="button" onClick={() => window.location.href = "/form"}>
            <div className="text">{heroData.button}</div>
            <div className="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5.5M13 3V10.5" stroke="#0E0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;