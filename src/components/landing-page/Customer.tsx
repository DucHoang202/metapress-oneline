import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

interface Testimonial {
  heading?: string;
  quote: string;
  name: string;
  position: string;
}

interface CustomerData {
  section: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[][] | Testimonial[];
}

const Customer: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  useEffect(() => {
    // Lấy dữ liệu từ (window as any).language
    const languageData = (window as any).language;
    if (languageData?.data) {
      // Tìm section có section === "customer"
      const customer = languageData.data.find((item: any) => item.section === "customer");
      if (customer) {
        setCustomerData(customer);
      }
    }
  }, []);

  // Map avatar cho mỗi testimonial dựa trên tên
  const getAvatar = (name: string) => {
    const avatarMap: { [key: string]: { src: string; style?: React.CSSProperties } } = {
      'Dương Quỳnh': { src: '../../assets/Mr.webp' },
      'Priya Kumar': { src: '../../assets/image 7.webp' },
      'Ms. Minh Thư': { 
        src: '../../assets/Ms. Minh Thu.webp',
        style: { transform: 'scale(1.8) translateX(10px)' }
      },
      'Carlos Ramirez': { src: '../../assets/image.webp' },
    };
    return avatarMap[name] || { src: '../../assets/default.webp' };
  };

  if (!customerData) {
    return null;
  }

  // Flatten testimonials thành mảng 1 chiều để Masonry xử lý
  const allTestimonials = Array.isArray(customerData.testimonials[0]) 
    ? (customerData.testimonials as Testimonial[][]).flat()
    : (customerData.testimonials as Testimonial[]);

  // Breakpoint configuration cho Masonry
  const breakpointColumns = {
    default: 2,  // 2 cột mặc định
    1100: 2,     // 2 cột cho màn hình >= 1100px
    700: 1,      // 1 cột cho màn hình < 700px
  };

  return (
    <section className="testimonials" id="customer">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <h2 
            className="testimonials__title"
            dangerouslySetInnerHTML={{ __html: customerData.title }}
          />
          <p className="testimonials__subtitle">
            {customerData.subtitle}
          </p>
        </div>
        
        <Masonry
          breakpointCols={breakpointColumns}
          className="testimonials__grid"
          columnClassName="testimonials__column"
        >
          {allTestimonials.map((testimonial, index) => (
            <article key={index} className="testimonials__card">
              <div className="testimonials__content">
                {testimonial.heading && (
                  <h3 className="testimonials__heading">{testimonial.heading}</h3>
                )}
                <p className={testimonial.heading ? "testimonials__quote--small" : "testimonials__quote"}>
                  {testimonial.quote}
                </p>
              </div>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  <img 
                    src={getAvatar(testimonial.name).src} 
                    alt={testimonial.name}
                    style={getAvatar(testimonial.name).style}
                  />
                </div>
                <div className="testimonials__author-info">
                  <div className="testimonials__name">{testimonial.name}</div>
                  <div className="testimonials__position">{testimonial.position}</div>
                </div>
              </div>
            </article>
          ))}
        </Masonry>
      </div>

    </section>
  );
};

export default Customer;