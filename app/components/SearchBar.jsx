export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}