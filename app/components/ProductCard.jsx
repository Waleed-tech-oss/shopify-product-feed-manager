import "../styles/product-card.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        className="product-image"
        src={product.image}
        alt={product.title}
      />

      <div className="product-content">

        <h2>{product.title}</h2>
 <div className="product-info">
        <p>
          <strong>Vendor:</strong> {product.vendor}
        </p>

        <p>
          <strong>Price:</strong> ${product.variant?.price || "0.00"}
        </p>

        <p>
          <strong>SKU:</strong> {product.variant?.sku || "N/A"}
        </p>
</div>
        <span
          className={
            product.status === "ACTIVE"
              ? "status active"
              : "status draft"
          }
        >
          {product.status}
        </span>

        <button className="view-btn">
          Product Details
        </button>

      </div>

    </div>
  );
}