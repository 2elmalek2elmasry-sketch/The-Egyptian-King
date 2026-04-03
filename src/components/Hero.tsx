import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";

function getNextFridayNoon(): Date {
  const EGYPT_OFFSET_MS = 2 * 60 * 60 * 1000;
  const nowInEgypt = new Date(Date.now() + EGYPT_OFFSET_MS);
  const day = nowInEgypt.getUTCDay();
  const hour = nowInEgypt.getUTCHours();
  let daysUntil = (5 - day + 7) % 7;
  if (daysUntil === 0 && hour >= 12) daysUntil = 7;
  const target = new Date(nowInEgypt);
  target.setUTCDate(target.getUTCDate() + daysUntil);
  target.setUTCHours(12, 0, 0, 0);
  return new Date(target.getTime() - EGYPT_OFFSET_MS);
}

type Seg = { val: string; label: string };
function useCountdown(target: Date): Seg[] {
  function calc(): Seg[] {
    const diff = target.getTime() - Date.now();
    const pad = (n: number) => String(n).padStart(2, "0");
    if (diff <= 0) return [{ val:"00",label:"DAYS" },{ val:"00",label:"HRS" },{ val:"00",label:"MIN" },{ val:"00",label:"SEC" }];
    return [
      { val: pad(Math.floor(diff / 86400000)), label: "DAYS" },
      { val: pad(Math.floor((diff % 86400000) / 3600000)), label: "HRS" },
      { val: pad(Math.floor((diff % 3600000) / 60000)), label: "MIN" },
      { val: pad(Math.floor((diff % 60000) / 1000)), label: "SEC" },
    ];
  }
  const [segs, setSegs] = useState<Seg[]>(calc);
  useEffect(() => { const iv = setInterval(() => setSegs(calc()), 1000); return () => clearInterval(iv); }, [target]);
  return segs;
}

export default function Hero() {
  const [dropDate] = useState(getNextFridayNoon);
  const segs = useCountdown(dropDate);
  return (
    <section className="hero" id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge">ROYAL ARCHIVES — MMXXIV</div>
          <h1 className="title">THE <br/><span className="gold-accent">EGYPTIAN</span> <br/>KING</h1>
          <div className="hero-divider"></div>
          <p className="slogan">Dare to Wear Different. Rule Your Style. Premium Egyptian-Inspired Streetwear for the Modern Pharaoh.</p>
          <div className="countdown-wrapper brutal-box">
            <div className="countdown-label">NEXT ROYAL DROP — EVERY FRIDAY</div>
            <div className="countdown-blocks">
              {segs.map(({ val, label }) => (
                <div key={label} className="countdown-block">
                  <span className="countdown-num">{val}</span>
                  <span className="countdown-unit">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <br />
          <a href="#collection" className="btn brutal-btn hero-btn">ENTER THE KINGDOM</a>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame brutal-box">
            <img src="https://i.postimg.cc/Y0QxV6g3/516715712-17866882896411646-829132566278910828-n.jpg" alt="Pharaoh Collection" />
            <div className="hero-corner top-left"></div>
            <div className="hero-corner bottom-right"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
