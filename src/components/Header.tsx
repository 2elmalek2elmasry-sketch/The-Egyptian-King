import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaCrown, FaBars, FaCoins } from "react-icons/fa";

interface HeaderProps { onCurrencyOpen: () => void; onSignInOpen: () => void; onMobileMenuOpen: () => void; }

export default function Header({ onCurrencyOpen, onSignInOpen, onMobileMenuOpen }: HeaderProps) {
  const { cartCount, setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function h() { setScrolled(window.scrollY > 40); }
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`top-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <div className="left-head">
          <a className="logo" href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img src="https://i.postimg.cc/9X4pgHFH/edited-image-1775066213934.png" alt="Logo" />
          </a>
          <span className="logo-text">THE EGYPTIAN KING</span>
        </div>
        <nav className="nav-menu">
          <a href="#collection">COLLECTION</a>
          <a href="#themes">THEMES</a>
          <a href="#social">SOCIAL</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className="header-actions">
          <button className="btn-icon brutal-border" onClick={onCurrencyOpen}><FaCoins /></button>
          <div className="cart-icon-wrapper brutal-border" onClick={() => setCartOpen(true)}>
            <FaShoppingCart style={{ fontSize: 18 }} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <button className="btn brutal-btn" onClick={onSignInOpen}><FaCrown style={{ marginRight: 8 }} /> SIGN IN</button>
          <button className="btn-icon mobile-menu-btn brutal-border" onClick={onMobileMenuOpen}><FaBars /></button>
        </div>
      </div>
    </header>
  );
}
