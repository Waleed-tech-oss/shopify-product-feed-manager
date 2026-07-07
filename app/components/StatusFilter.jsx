export default function StatusFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="filter-select"
    >
      <option value="ALL">All Status</option>
      <option value="ACTIVE">Active</option>
      <option value="DRAFT">Draft</option>
      <option value="ARCHIVED">Archived</option>
    </select>
  );
}