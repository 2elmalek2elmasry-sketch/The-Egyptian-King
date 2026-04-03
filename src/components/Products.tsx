import { useState } from "react";
import { FaVault } from "react-icons/fa6";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

interface ProductsProps {
  onQuickView: (product: Product) => void;
}

type Filter = "all" | "hoodies" | "tees" | "deals";

export default function Products({ onQuickView }: ProductsProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const { addToCart, currency, rate } = useCart();
  const { showToast } = useToast();

  const filtered =
    filter === "all"
      ? products
      : filter === "deals"
      ? products.filter((p) => p.badge === "hot")
      : products.filter((p) => p.category === filter);

  function handleAddToCart(e: React.MouseEvent, product: Product) {
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} ADDED TO VAULT`, "success");
  }

  return (
    <section className="section products-section" id="collection">
      <div className="section-header brutal-border-bottom">
        <h2 className="section-title">PHARAOH GEAR</h2>
        <div className="filter-tabs">
          {(["all", "hoodies", "tees", "deals"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`filter-pill${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="product-brutal-grid">
        {filtered.map((p) => (
          <div key={p.id} className="product-card brutal-box" onClick={() => onQuickView(p)}>
            <div className="product-img-wrap">
              {p.badge && (
                <span className={`badge-new${p.badge === "hot" ? " hot" : ""}`}>
                  {p.badge === "hot" ? "DEAL" : "NEW"}
                </span>
              )}
              <img src={p.image} alt={p.name} loading="lazy" />
              <div className="product-overlay">
                <span className="overlay-text">QUICK VIEW</span>
              </div>
            </div>
            <div className="product-info">
              <div className="product-meta">
                <span className="product-category">{p.category === "tees" ? "T-SHIRT" : "HOODIE"}</span>
                <span className="product-price">{currency} {Math.round(p.price * rate)}</span>
              </div>
              <h3 className="product-title">{p.name}</h3>
              <button
                className="btn brutal-btn product-add-btn"
                onClick={(e) => handleAddToCart(e, p)}
              >
                ADD TO VAULT <FaVault />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
