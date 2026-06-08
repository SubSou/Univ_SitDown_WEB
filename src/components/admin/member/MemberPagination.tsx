type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function MemberPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="member-pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={page === index ? "active" : ""}
          onClick={() => onPageChange(index)}
        >
          {index + 1}
        </button>
      ))}

      {page + 1 < totalPages && (
        <button onClick={() => onPageChange(page + 1)}>〉</button>
      )}
    </div>
  );
}
