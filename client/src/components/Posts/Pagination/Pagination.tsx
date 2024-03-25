import ReactPaginate from "react-paginate";

const Pagination = ({ totalpages, handlePageChange }) => {
  return (
    <div className="pagination">
      <ReactPaginate
        pageCount={Number(totalpages)}
        previousLabel="<"
        nextLabel=">"
        onPageChange={({ selected }) => handlePageChange(selected)}
        containerClassName={"pagination"}
      />
    </div>
  );
};

export default Pagination;
