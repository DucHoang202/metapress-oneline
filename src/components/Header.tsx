import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoButton from "./ui/DemoButton";

interface HeaderData {
  section: string;
  links: string[];
  button: {
    text: string;
    dropdown: string;
  };
}

interface HeaderProps {
  DropdownComponent: React.FC;
}

const Header: React.FC<HeaderProps> = ({ DropdownComponent }) => {
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const languageData = (window as any).language;
    if (languageData?.data) {
      const header = languageData.data.find(
        (item: any) => item.section === "header"
      );
      if (header) {
        setHeaderData(header);
      }
    }
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", targetId);
    } else {
      navigate("/" + targetId);
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  const getLinkConfig = (linkText: string) => {
    const linkMap: { [key: string]: { href: string; target: string } } = {
      Solutions: { href: "#solution", target: "#solution" },
      "Giải pháp": { href: "#solution", target: "#solution" },
      Benefits: { href: "#benefit", target: "#benefit" },
      "Lợi ích": { href: "#benefit", target: "#benefit" },
      Customers: { href: "#customer", target: "#customer" },
      "Khách hàng": { href: "#customer", target: "#customer" },
      Contact: { href: "/form", target: "" },
      "Liên hệ": { href: "/form", target: "" },
    };
    return linkMap[linkText] || { href: "#", target: "" };
  };

  if (!headerData) return null;

  return (
    <section className="header-section">
      <div className="header-section__container">
        <div className="header-section__icon-container">
          <img
            src="/assets/clean-logo.webp"
            onClick={() => navigate("/")}
            alt="logo"
          />
        </div>

        <div className="header-section__link-container">
          {headerData.links.map((linkText, index) => {
            const { href, target } = getLinkConfig(linkText);
            return (
              <a
                key={index}
                className="link"
                href={href}
                onClick={target ? (e) => handleSmoothScroll(e, target) : undefined}
              >
                {linkText}
              </a>
            );
          })}
        </div>

        <DropdownComponent />
        <DemoButton href="/form" text={headerData.button.text} />
      </div>
    </section>
  );
};

export default Header;
