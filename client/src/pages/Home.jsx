import React, { useEffect } from "react";
import Info from "../Componets/Info";

import HeroSlider from "../Componets/HeroSlider";
import ProductList from "../Componets/ProductList";
import InfoSection from "../Componets/InfoSection";
import PopularProduct from "../Componets/PopularProduct";
// import Testinomial from "../Componets/Testinomial";

import ContactInfo from "../Componets/ContactInfo";
import Fotter from "../Componets/Fotter";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { allProduct } from "../backend/manageProduct";
import { productAtom } from "../Atoms/productsAtom";
import Loading from "../Componets/Loading";
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import Testinomialcaresoul from "../Componets/Testinomialcaresoul";
import CounterContainer from "../Componets/CounterContainer";
import CertificationsSection from "../Componets/CertificationsSection";
import IndustriesServed from "../Componets/IndustriesServed";
import { allCategoriesAtom } from "../Atoms/categories";
import { fetchCategories } from "../backend/init";
import { backendUrl } from "../globle";
// import ManufacturingProcess from "../Componets/ManufacturingProcess";
const Home = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [categories, setCategories] = useRecoilState(allCategoriesAtom)

  const { title, description, keywords } = seoData.home;


  const user = useRecoilValue(userAtom);

  async function setUp() {
    const p = await allProduct();
    setProducts(p);
   
  }
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
  useEffect(() => {
    if (!categories || categories.length === 0) {
      const API_BASE = `${backendUrl}/categories`;
      fetchCategories(setCategories, API_BASE);
    }
    scrollToTop()
    setUp();
  }, []);

  return (
    <div>
      <SEO title={title} description={description} keywords={keywords}  />
      
      {/* Hero Section */}
      <main className="px-3  m-0">
        <HeroSlider />
      </main>
      
      {/* Product Sections */}
      <ProductList />
      
      {/* Company Info & Trust Builders */}
      <InfoSection />
      <CertificationsSection />
      <PopularProduct />
      <CounterContainer />
      
      {/* Industry & Services */}
      <IndustriesServed />
      
      {/* Social Proof & Contact */}
      <Testinomialcaresoul />
      <ContactInfo />
      
      <br />
    </div>
  );
};

export default Home;
