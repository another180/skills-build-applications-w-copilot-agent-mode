function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—';
  if (typeof value === 'object') {
    if (value.username) return value.username;
    if (value.name) return value.name;
    return JSON.stringify(value);
  }

  return value;
}

export default function CollectionView({ title, description, columns, records, loading, error }) {
  return (
    <section aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <p className="section-kicker">OCTOFIT / TRACKER</p>
          <h1 id="collection-title">{title}</h1>
          <p className="section-description">{description}</p>
        </div>
        <span className="record-count" aria-live="polite">
          {loading ? 'Loading' : `${records.length} ${records.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading ? (
        <div className="loading-state" role="status">Loading {title.toLowerCase()}…</div>
      ) : !error && records.length === 0 ? (
        <div className="empty-state">No {title.toLowerCase()} to show yet.</div>
      ) : (
        <div className="table-responsive collection-table-wrap">
          <table className="table collection-table align-middle mb-0">
            <thead>
              <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(record[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
