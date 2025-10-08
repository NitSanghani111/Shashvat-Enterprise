// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ProductPage from "./pages/ProductPage";
import Catalog from "./pages/Catalog";

import Productdetail from "./pages/Productdetail";
import NavBar from "./Componets/NavBar";
import Fotter from "./Componets/Fotter";
import Loading from "./Componets/Loading";
import { loadingAtom } from "./Atoms/loadingAtom";
import { initContentProtection } from "./utils/contentProtection";

function App() {
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

  useEffect(() => {
    // Initialize content protection
    initContentProtection({
      disableRightClick: true,
      disableKeyboardShortcuts: true,
      disableImageDrag: true,
      addImageWatermark: true,
      addCopyrightToClipboard: true,
    });
  }, []);

  useEffect(() => {}, [isLoading]);

  return (
    <HelmetProvider>
      <RecoilRoot>
        <div className="App">
          <Router>
            <NavBar />
            {isLoading ? <Loading /> : <></>}
            <Routes>
             <Route path="/" element={<Home />} />
                          
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/products" element={<ProductPage />} />
                            <Route path="/productdetail/:id" element={<Productdetail />} />
                    <Route path="/products/:category" element={<ProductPage />} />
                    <Route path="/products/:category/:subcategory" element={<ProductPage />} />
              
            
            </Routes>
          <Fotter />
          </Router>
        </div>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
