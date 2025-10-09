// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import ComingSoon from "./pages/ComingSoon";

import Productdetail from "./pages/Productdetail";
import NavBar from "./Componets/NavBar";
import Fotter from "./Componets/Fotter";
import Loading from "./Componets/Loading";
import { loadingAtom } from "./Atoms/loadingAtom";
import { initContentProtection } from "./utils/contentProtection";
import { isMaintenanceMode, isRouteAllowed } from "./utils/maintenanceMode";
import { trackVisitor } from "./backend/analytics";

// Protected Route Component - Redirects to Coming Soon if in maintenance mode
function ProtectedRoute({ children }) {
  const location = useLocation();
  
  if (isMaintenanceMode() && !isRouteAllowed(location.pathname)) {
    return <Navigate to="/coming-soon" replace />;
  }
  
  return children;
}

function AppContent() {
  const location = useLocation();
  const [isLoading] = useRecoilState(loadingAtom);
  const inMaintenanceMode = isMaintenanceMode();

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

  // Track visitor on route change
  useEffect(() => {
    trackVisitor();
  }, [location.pathname]);

  // Hide navbar/footer on coming-soon page
  const showNavAndFooter = location.pathname !== '/coming-soon';

  return (
    <div className="App">
      {showNavAndFooter && <NavBar />}
      {isLoading ? <Loading /> : <></>}
      <Routes>
        {/* Coming Soon - Always accessible */}
        <Route path="/coming-soon" element={<ComingSoon />} />
        
        {/* In maintenance mode, redirect all routes to coming-soon */}
        {inMaintenanceMode ? (
          <Route path="*" element={<Navigate to="/coming-soon" replace />} />
        ) : (
          <>
            {/* Protected Routes - Only accessible when NOT in maintenance mode */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
            <Route path="/productdetail/:id" element={<ProtectedRoute><Productdetail /></ProtectedRoute>} />
            <Route path="/products/:category" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
            <Route path="/products/:category/:subcategory" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
            
            {/* Catch all - redirect to home when not in maintenance */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      {showNavAndFooter && <Fotter />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <Router>
          <AppContent />
        </Router>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
