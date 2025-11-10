import NotFound from './pages/NotFound.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import FooterMobile from './components/FooterMobile.tsx';
// import VietNam from './components/landing-page/vietnamese.json'
import { Benefit, Customer, Feature, GetStarted, Hero, Question, Sponsor, Unlock, HeroMobile, Diagram3, Blog, Customer3} from './components/landing-page/landing-page.ts'
import RegisterFormLink from './components/RegisterFormLink.tsx';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import LanguageDropdown from './components/ui/LanguageDropdown.tsx';

function getWidthExcludesScrollbar(): number {
  return document.documentElement.clientWidth;
}

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ maxWidth: 1023});
  const displayUnlock = useMediaQuery({ maxWidth: 1262});
  
  useEffect(() => {
    const setAppWidth = () => {
      const width = getWidthExcludesScrollbar();
      document.documentElement.style.setProperty('--app-width', `${width}px`);
    };

    // Set initial width
    setAppWidth();

    // Update on resize
    window.addEventListener('resize', setAppWidth);

    return () => {
      window.removeEventListener('resize', setAppWidth);
    };
  }, []);
  return (
    <div className='App'>

 {/* <Header DropdownComponent={LanguageDropdown} />     */}
 <LanguageDropdown/>
 <Header/>
      <main>
        {isMobile ? <HeroMobile/> : <Hero/>}   
        <Sponsor/>
        <Feature/>
        <Benefit />
        <Diagram3/>
        <GetStarted />
        <Customer/>
        <Customer3/>
        <Question/>
        <Blog/>
        {displayUnlock ? "" : <Unlock/>}
      </main>
      {isTablet ? <FooterMobile/> : <Footer/>}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<RegisterFormLink />} />
        <Route path="/404" element={<NotFound/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;