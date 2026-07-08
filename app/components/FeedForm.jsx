import { Form } from "react-router";
import { useEffect, useState } from "react";

import { currencies } from "../constants/currencies";
import { countries } from "../constants/countries";
import { languages } from "../constants/languages";

export default function FeedForm({editingFeed}) {
  const [formData, setFormData] = useState({
  feedName: "",
  format: "XML",
  currency: "PKR",
  language: "en",
  country: "PK",
  defaultCategory: "",
  includeOutOfStock: false,
  isActive: true,
});

useEffect(() => {
  if (editingFeed) {
    setFormData({
      feedName: editingFeed.feedName,
      format: editingFeed.format,
      currency: editingFeed.currency,
      language: editingFeed.language,
      country: editingFeed.country,
      defaultCategory: editingFeed.defaultCategory,
      includeOutOfStock: editingFeed.includeOutOfStock,
      isActive: editingFeed.isActive,
    });
  } else {
    setFormData({
      feedName: "",
      format: "XML",
      currency: "PKR",
      language: "en",
      country: "PK",
      defaultCategory: "",
      includeOutOfStock: false,
      isActive: true,
    });
  }
}, [editingFeed]);

function handleChange(e) {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}

  return (
    <Form method="post" className="feed-form">

  {editingFeed && (
    <>
      <input
        type="hidden"
        name="action"
        value="edit"
      />

      <input
        type="hidden"
        name="feedId"
        value={editingFeed._id}
      />
    </>
  )}

  <div className="form-group">
    <label>Feed Name</label>

    <input
  type="text"
  name="feedName"
  placeholder="Google Shopping Feed"
  value={formData.feedName}
  onChange={handleChange}
  required
/>
  </div>

      <div className="form-group">
        <label>Format</label>

        <select
  name="format"
  value={formData.format}
  onChange={handleChange}
>

          <option value="XML">XML</option>
          <option value="CSV">CSV</option>
        </select>
      </div>

      <div className="form-group">
        <label>Currency</label>

        <select
  name="currency"
  value={formData.currency}
  onChange={handleChange}
>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Language</label>

        <select
  name="language"
  value={formData.language}
  onChange={handleChange}
>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Country</label>

        <select
  name="country"
  value={formData.country}
  onChange={handleChange}
>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Default Category</label>

        <input
  type="text"
  name="defaultCategory"
  placeholder="Apparel & Accessories"
  value={formData.defaultCategory}
  onChange={handleChange}
/>
      </div>

      <div className="checkbox-group">
        <label>
          <input
  type="checkbox"
  name="includeOutOfStock"
  checked={formData.includeOutOfStock}
  onChange={handleChange}
/>

          Include Out of Stock Products
        </label>
      </div>

      <div className="checkbox-group">
        <label>
          <input
  type="checkbox"
  name="isActive"
  checked={formData.isActive}
  onChange={handleChange}
/>

          Feed Active
        </label>
      </div>

      <button
  type="submit"
  className="submit-btn"
>
  {editingFeed
    ? "Update Feed"
    : "Create Feed"}
</button>

    </Form>
  );
}