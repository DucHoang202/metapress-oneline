import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface BlogPost {
  image: string;
  title: string;
  subtitle: string;
}

interface BlogData {
  section: string;
  title: string;
  subtitle: string;
  description: string;
  button: {
    text: string;
  };
  posts?: BlogPost[];
}

const Blog: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const cardTitleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [blogData, setBlogData] = useState<BlogData | null>(null);

  // Dữ liệu mặc định nếu không có posts trong JSON
  const defaultPosts: BlogPost[] = [
    {
      image: "../../../assets/Knowledge Hub.webp",
      title: "Việt Nam và nước cờ địa chính trị trên mặt biển: Khi các bến cảng trở thành tiền đồn chiến lược",
      subtitle: "Nhiều người đã quên đi câu nói ấy, phát ra tại một hội trường nhỏ bên bờ cảng Đình Vũ cách đây hơn hai thập kỉ qua và đã"
    },
    {
      image: "../../../assets/Knowledge Hub (1).webp",
      title: "Từ tăng trưởng nóng đến tái cấu trúc thị trường ",
      subtitle: "Sau hơn một thập kỷ mở rộng ồ ạt, thị trường thực phẩm – đồ uống (F&B) Việt Nam bước vào giai đoạn 2024"
    },
    {
      image: "../../../assets/Knowledge Hub (2).webp",
      title: "Nghệ thuật đặt câu hỏi phỏng vấn cùng AI",
      subtitle: "Hub kiến thức chuyên môn đầu tiên tại Việt Nam dành cho Solo Expert về Kinh Doanh Tri Thức."
    },
    {
      image: "../../../assets/Knowledge Hub.webp",
      title: "Việt Nam và nước cờ địa chính trị trên mặt biển: Khi các bến cảng trở thành tiền đồn chiến lược",
      subtitle: "Nhiều người đã quên đi câu nói ấy, phát ra tại một hội trường nhỏ bên bờ cảng Đình Vũ cách đây hơn hai thập kỉ qua và đã"
    },
    {
      image: "../../../assets/Knowledge Hub (1).webp",
      title: "Từ tăng trưởng nóng đến tái cấu trúc thị trường ",
      subtitle: "Sau hơn một thập kỷ mở rộng ồ ạt, thị trường thực phẩm – đồ uống (F&B) Việt Nam bước vào giai đoạn 2024"
    },
    {
      image: "../../../assets/Knowledge Hub (2).webp",
      title: "Nghệ thuật đặt câu hỏi phỏng vấn cùng AI",
      subtitle: "Hub kiến thức chuyên môn đầu tiên tại Việt Nam dành cho Solo Expert về Kinh Doanh Tri Thức."
    }
  ];

  useEffect(() => {
    // Lấy dữ liệu từ (window as any).language
    const languageData = (window as any).language;
    if (languageData?.data) {
      // Tìm section có section === "blog"
      const blog = languageData.data.find((item: any) => item.section === "blog");
      if (blog) {
        setBlogData(blog);
      }
    }
  }, []);

  const items = blogData?.posts || defaultPosts;

  useEffect(() => {
    const adjustHeights = () => {
      // Reset heights
      cardTitleRefs.current.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
        }
      });

      // Get heights
      const heights = cardTitleRefs.current.map(ref => ref?.offsetHeight || 0);
      const maxHeight = Math.max(...heights);

      // Set uniform height
      cardTitleRefs.current.forEach(ref => {
        if (ref) {
          ref.style.height = `${maxHeight}px`;
        }
      });
    };

    // Đợi font load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Delay một chút để layout ổn định
        setTimeout(adjustHeights, 50);
      });
    } else {
      // Fallback nếu browser không support Font Loading API
      setTimeout(adjustHeights, 100);
    }
  }, [items]);

  if (!blogData) {
    return null;
  }

  return (
    <section className="blog">
      <div className="blog__container">
        <div className="blog__header">
          <div className="blog__left">
            <div className="blog__title">{blogData.title}</div>
            <div className="blog__subtitle">{blogData.subtitle}</div>
          </div>
          <div className="blog__right">
            {blogData.description}
          </div>
        </div>
        <div className="blog__carousel">
          <Swiper
            ref={swiperRef}
            className="blog__swiper"
            slidesPerView={3}
            spaceBetween={24}
            grabCursor={true}
            speed={300}
            freeMode={false}
            pagination={{
              clickable: true,
              el: ".blog__pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            modules={[Navigation, Pagination, FreeMode]}
            breakpoints={{
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
                freeMode: false
              },
              768: {
                slidesPerView: 'auto',
                spaceBetween: 14,
              },
              0: {
                slidesPerView: 'auto',
                spaceBetween: 14,
              },
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index} className="blog__card-container">
                <div className={`blog__card ${index === 0 ? "first" : index === items.length - 1 ? "last" : ""}`}>
                  <div className="blog__image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="blog__text">
                    <div className="title" ref={(el) => {cardTitleRefs.current[index] = el;}}>
                      {item.title}
                    </div>
                    <div className="subtitle">{item.subtitle}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dots pagination hiển thị ở đây */}
          <div className="blog__pagination"></div>
          <div className="blog__button" onClick={() => window.location.href = "/form"}>
            <div className="text">{blogData.button.text}</div>
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
}

export default Blog;