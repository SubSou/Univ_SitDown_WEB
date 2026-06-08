type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function NoticePagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={page === index ? "page-button active" : "page-button"}
          onClick={() => onPageChange(index)}
        >
          {index + 1}
        </button>
      ))}

      {page + 1 < totalPages && (
        <button className="page-button" onClick={() => onPageChange(page + 1)}>
          〉
        </button>
      )}
    </div>
  );
}

export default NoticePagination;
