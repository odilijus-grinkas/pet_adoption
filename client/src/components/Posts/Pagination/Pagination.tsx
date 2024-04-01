import ReactPaginate from "react-paginate";

const Pagination = ({ totalpages, handlePageChange, currentPage }) => {
  return (
    <div className="pagination">
      <ReactPaginate
        pageCount={Number(totalpages)}
        previousLabel="<"
        nextLabel=">"
        onPageChange={({ selected }) => handlePageChange(selected)}
        containerClassName={"pagination"}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
