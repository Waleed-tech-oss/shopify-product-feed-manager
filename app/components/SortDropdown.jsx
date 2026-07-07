export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="filter-select"
    >
      <option value="default">Sort By</option>
      <option value="az">Title (A → Z)</option>
      <option value="za">Title (Z → A)</option>
      <option value="priceLow">Price (Low → High)</option>
      <option value="priceHigh">Price (High → Low)</option>
    </select>
  );
}