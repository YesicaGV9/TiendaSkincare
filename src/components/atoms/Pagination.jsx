import './Pagination.css';

export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onPage(page - 1)} className="page-btn">‹</button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`page-btn ${p === page ? 'active' : ''}`}
        >{p}</button>
      ))}
      <button disabled={page === totalPages} onClick={() => onPage(page + 1)} className="page-btn">›</button>
    </div>
  );
}
