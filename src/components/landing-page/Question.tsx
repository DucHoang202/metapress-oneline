import React, { useState, useRef, useEffect } from "react";

interface FAQ {
  open: boolean;
  title: string;
  subtitle: string;
}

interface QuestionData {
  section: string;
  faq: Array<{
    title: string;
    subtitle: string;
  }>;
}

const Question: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    // Lấy dữ liệu từ (window as any).language
    const languageData = (window as any).language;
    if (languageData?.data) {
      // Tìm section có section === "question"
      const questionData = languageData.data.find(
        (item: any) => item.section === "question"
      ) as QuestionData;
      
      if (questionData?.faq) {
        // Chuyển đổi dữ liệu FAQ thành format phù hợp với state
        const formattedFaqs: FAQ[] = questionData.faq.map((item) => ({
          open: false,
          title: item.title,
          subtitle: item.subtitle,
        }));
        setFaqs(formattedFaqs);
      }
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) => ({
        ...faq,
        open: i === index ? !faq.open : false, // chỉ mở 1 câu tại 1 thời điểm
      }))
    );
  };

  return (
    <section className="question">
      <div className="container">
        <div className="content">
          <div className="title">Các câu hỏi thường gặp</div>
        </div>
        <div className="content">
          <ul className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} onToggle={toggleFAQ} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  faq: FAQ;
  index: number;
  onToggle: (index: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(faq.open ? contentRef.current.scrollHeight : 0);
    }
  }, [faq.open]);

  // Xử lý xuống dòng từ \n trong subtitle
  const formatSubtitle = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
  return (
    <li
      className="faq-item"
      onClick={() => onToggle(index)}
      style={{ 
        cursor: "pointer", 
        background: faq.open ? "linear-gradient(150deg, #0E0A0F 17.18%, #443149 227.36%)" : "", 
      }}
    >
      <div className="faq-container">
        <div className="faq-question">{faq.title}</div>

        <div className="icon">
          {faq.open ? (
            // icon khi mở
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 18H13.5M31.5 18C31.5 19.7728 31.1508 21.5283 30.4724 23.1662C29.7939 24.8041 28.7995 26.2923 27.5459 27.5459C26.2923 28.7995 24.8041 29.7939 23.1662 30.4724C21.5283 31.1508 19.7728 31.5 18 31.5C16.2272 31.5 14.4717 31.1508 12.8338 30.4724C11.1959 29.7939 9.70765 28.7995 8.45406 27.5459C7.20047 26.2923 6.20606 24.8041 5.52763 23.1662C4.84919 21.5283 4.5 19.7728 4.5 18C4.5 14.4196 5.92232 10.9858 8.45406 8.45406C10.9858 5.92232 14.4196 4.5 18 4.5C21.5804 4.5 25.0142 5.92232 27.5459 8.45406C30.0777 10.9858 31.5 14.4196 31.5 18Z"
                stroke="#FCF5FE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // icon khi đóng
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 13.5V22.5M22.5 18H13.5M31.5 18C31.5 19.7728 31.1508 21.5283 30.4724 23.1662C29.7939 24.8041 28.7995 26.2923 27.5459 27.5459C26.2923 28.7995 24.8041 29.7939 23.1662 30.4724C21.5283 31.1508 19.7728 31.5 18 31.5C16.2272 31.5 14.4717 31.1508 12.8338 30.4724C11.1959 29.7939 9.70765 28.7995 8.45406 27.5459C7.20047 26.2923 6.20606 24.8041 5.52763 23.1662C4.84919 21.5283 4.5 19.7728 4.5 18C4.5 14.4196 5.92232 10.9858 8.45406 8.45406C10.9858 5.92232 14.4196 4.5 18 4.5C21.5804 4.5 25.0142 5.92232 27.5459 8.45406C30.0777 10.9858 31.5 14.4196 31.5 18Z"
                stroke="#FCF5FE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      <div
        className={`faq-answer ${faq.open ? "margin-16" : ""}`}
        style={{
          height: `${height}px`,
          opacity: faq.open ? 1 : 0,
          overflow: "hidden",
          transition: "height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="faq-answer-text" ref={contentRef}>
          {formatSubtitle(faq.subtitle)}
        </div>
      </div>
    </li>
  );
};

export default Question;