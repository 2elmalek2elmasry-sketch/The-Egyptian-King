import { useEffect, useState } from "react";

export default function Splash() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHidden(true), 3500); return () => clearTimeout(t); }, []);
  return (
    <div className={`splash${hidden ? " hidden" : ""}`}>
      <div className="splash-frame">
        <div className="splash-graphic">
          <div className="diamond-shape"></div>
          <img src="https://i.postimg.cc/9X4pgHFH/edited-image-1775066213934.png" alt="The Egyptian King" />
        </div>
        <h1 className="splash-title">THE EGYPTIAN KING</h1>
        <div className="splash-line"></div>
        <p className="splash-subtitle">DARE TO WEAR DIFFERENT<span className="loading-dots"><span>.</span><span>.</span><span>.</span></span></p>
      </div>
    </div>
  );
}
