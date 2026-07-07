import { useLoaderData } from "react-router";
import { useState } from "react";
import { authenticate } from "../shopify.server";
import { getProducts } from "../services/shopify.service";
import StatusFilter from "../components/StatusFilter";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import VendorFilter from "../components/VendorFilter";
import SortDropdown from "../components/SortDropdown";
import "../styles/products.css";
import "../styles/search-bar.css";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const products = await getProducts(admin);

  return { products };
}

export default function Products() {
  const { products } = useLoaderData();
const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
const [vendor, setVendor] = useState("ALL");
const [sortBy, setSortBy] = useState("default");
const vendors = [
  ...new Set(
    products
      .map((product) => product.vendor)
      .filter(Boolean)
  ),
].sort();

const filteredProducts = products.filter((product) => {
  const searchText = search.toLowerCase();

  const matchesVendor =
  vendor === "ALL" ||
  product.vendor === vendor;

  const matchesSearch =
    product.title.toLowerCase().includes(searchText) ||
    product.vendor.toLowerCase().includes(searchText) ||
    (product.variant?.sku || "").toLowerCase().includes(searchText);

  const matchesStatus =
    status === "ALL" || product.status === status;

  return matchesSearch && matchesStatus &&
  matchesVendor;
});


const sortedProducts = [...filteredProducts];

switch (sortBy) {
  case "az":
    sortedProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    break;

  case "za":
    sortedProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    break;

  case "priceLow":
    sortedProducts.sort(
      (a, b) =>
        Number(a.variant?.price || 0) -
        Number(b.variant?.price || 0)
    );
    break;

  case "priceHigh":
    sortedProducts.sort(
      (a, b) =>
        Number(b.variant?.price || 0) -
        Number(a.variant?.price || 0)
    );
    break;

  default:
    break;
}


  return (
    <div className="products-page">
      <div className="page-header">
  <h1 className="page-title">Products</h1>

  <span className="product-count">
    {sortedProducts.length} Products
  </span>
</div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />
      <div className="filters">
  <StatusFilter
    value={status}
    onChange={setStatus}
  />
   <VendorFilter
    vendors={vendors}
    value={vendor}
    onChange={setVendor}
  />
  <SortDropdown
    value={sortBy}
    onChange={setSortBy}
  />
</div>

      <div className="products-grid">
  {sortedProducts.length > 0 ? (
    sortedProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))
  ) : (
    <div className="empty-state">
      <div className="empty-icon">📦</div>

      <h2>No Products Found</h2>

      <p>
        Try another search term or change your filters.
      </p>
    </div>
  )}
</div>
    </div>
  );
}