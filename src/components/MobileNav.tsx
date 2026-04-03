import { FaTimes } from "react-icons/fa";
interface MobileNavProps { open: boolean; onClose: () => void; }
export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div className={`mobile-nav${open ? " open" : ""}`}>
      <div className="mobile-nav-inner">
        <button className="mobile-nav-close brutal-border" onClick={onClose}><FaTimes /></button>
        <div className="mobile-nav-links">
          <a href="#collection" onClick={onClose}><span className="nav-num">01</span> COLLECTION</a>
          <a href="#themes" onClick={onClose}><span className="nav-num">02</span> THEMES</a>
          <a href="#social" onClick={onClose}><span className="nav-num">03</span> SOCIAL</a>
          <a href="#contact" onClick={onClose}><span className="nav-num">04</span> CONTACT</a>
        </div>
      </div>
    </div>
  );
}
