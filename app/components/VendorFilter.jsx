export default function VendorFilter({
  vendors,
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="filter-select"
    >
      <option value="ALL">All Vendors</option>

      {vendors.map((vendor) => (
        <option key={vendor} value={vendor}>
          {vendor}
        </option>
      ))}
    </select>
  );
}