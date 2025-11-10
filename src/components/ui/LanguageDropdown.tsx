import React, { useState, useEffect, useRef } from "react";
import vietnamese from "../../languages/vietnamese.json";
import english from "../../languages/english.json";
// import french from "../../languages/french.json";
// import german from "../../languages/german.json";

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageDropdownProps {
  currentLang?: string;
  onChange?: (lang: string) => void;
}

const languages: Language[] = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

function loadLanguage(lang: string): void {
  let data;

  switch (lang) {
    case "vi":
      data = vietnamese;
      break;
    case "en":
      data = english;
      break;
    case "fr":
      // data = french;
      data = english; // fallback tạm thời
      break;
    case "de":
      // data = german;
      data = english; // fallback tạm thời
      break;
    default:
      data = english;
      break;
  }

  (window as any).language = data;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLang: propLang,
  onChange: propOnChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [internalLang, setInternalLang] = useState(() => {
    if (propLang) return propLang;
    return localStorage.getItem("language") || "vi";
  });

  useEffect(() => {
    loadLanguage(internalLang);
  }, []);

  const currentLang = propLang || internalLang;
  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    loadLanguage(langCode);
    localStorage.setItem("language", langCode);
    setInternalLang(langCode);
    if (propOnChange) propOnChange(langCode);
    setOpen(false);
    setSearch("");
    window.dispatchEvent(new CustomEvent("languageChange", { detail: langCode }));
  };

  // Lọc ngôn ngữ theo text nhập
  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header__dropdown" ref={dropdownRef}>
      <button
        className="header__dropdown-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentLanguage.flag} {currentLanguage.name}
      </button>

      {open && (
        <div
          className="header__dropdown-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            position: "absolute",
            zIndex: 1000,
            minWidth: "160px",
          }}
        >
          <input
            type="text"
            placeholder="Tìm ngôn ngữ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "6px",
              outline: "none",
            }}
          />

          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`header__dropdown-item ${
                    currentLang === lang.code
                      ? "header__dropdown-item--active"
                      : ""
                  }`}
                  style={{
                    textAlign: "left",
                    padding: "6px 8px",
                    background:
                      currentLang === lang.code ? "#e6f0ff" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    borderRadius: "6px",
                  }}
                >
                  {lang.flag} {lang.name}
                </button>
              ))
            ) : (
              <div style={{ padding: "6px", color: "#888" }}>
                Không tìm thấy
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
