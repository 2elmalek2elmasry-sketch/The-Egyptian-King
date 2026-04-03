import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { Product } from "./data/products";
import Splash from "./components/Splash";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Hero from "./components/Hero";
import Themes from "./components/Themes";
import Products from "./components/Products";
import Social from "./components/Social";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import CurrencyModal from "./components/CurrencyModal";
import SignInModal from "./components/SignInModal";
import QuickViewModal from "./components/QuickViewModal";
import ToastContainer from "./components/ToastContainer";
import BackToTop from "./components/BackToTop";

function AppInner() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <Splash />
      <div className="bg-gradients" />
      <Header
        onCurrencyOpen={() => setCurrencyOpen(true)}
        onSignInOpen={() => setSignInOpen(true)}
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
      />
      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main>
        <Hero />
        <Themes />
        <Products onQuickView={(p) => setQuickViewProduct(p)} />
        <Social />
      </main>
      <Footer />
      <CartSidebar />
      <CurrencyModal open={currencyOpen} onClose={() => setCurrencyOpen(false)} />
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <ToastContainer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
