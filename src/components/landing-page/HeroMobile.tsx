import React, { useEffect, useState } from "react";

interface HeroData {
  section: string;
  status: string;
  name: string;
  title: string;
  subtitle: string;
  button: string;
}

const HeroMobile: React.FC = () => {
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

  const handleButtonClick = () => {
    // Xử lý khi click button
    window.location.href = "/form";
  };

  // Hiển thị loading hoặc fallback nếu chưa có dữ liệu
  if (!heroData) {
    return null;
  }

  return (
    <section className="hero_mobile">
      <div className="hero_mobile__container">
        <div className="content">
          <div className="hero-mobile__content">
            <div className="category">
              <div className="new">{heroData.status}</div>
              <div className="text">{heroData.name}</div>
              <div className="arrow">
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.875 0.75L11.25 5.125M11.25 5.125L6.875 9.5M11.25 5.125H0.75" stroke="#FCF5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="title">{heroData.title}</div>
            <div className="subtitle">{heroData.subtitle}</div>
          </div>
        </div>
        <button className="hero_mobile__button" onClick={handleButtonClick}>
          <div className="text">{heroData.button}</div>
          <div className="arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="#0E0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

export default HeroMobile;