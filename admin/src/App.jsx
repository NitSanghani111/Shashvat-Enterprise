// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CheckIsAdmin from "./middlewares/CheckIsAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import CustomerReviews from "./pages/admin/CustomerReviews";
import ClientRequirements from "./pages/admin/ClientRequirements";
import AdminLayout from "./Componets/admin/AdminLayout";
import Loading from "./Componets/Loading";
import { loadingAtom } from "./Atoms/loadingAtom";
import { authAtom } from "./Atoms/authAtom";

function App() {
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [auth, setAuth] = useRecoilState(authAtom);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth({ isAuthenticated: true, token });
    }
  }, [setAuth]);

  useEffect(() => {}, [isLoading]);

  return (
    <HelmetProvider>
      <RecoilRoot>
        <div className="App">
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Router>
            {isLoading ? <Loading /> : <></>}
           
            <Routes>
              {/* Redirect root to admin dashboard */}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              
              {/* Login page (no layout) */}
              <Route path="/login" element={<Login />} />
              
              {/* Admin routes with layout */}
              <Route element={<CheckIsAdmin />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/manage-products" element={<ManageProducts />} />
                  <Route path="/admin/customer-reviews" element={<CustomerReviews />} />
                  <Route path="/admin/client-requirements" element={<ClientRequirements />} />
                </Route>
              </Route>

              {/* Catch all - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </Router>
        </div>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
