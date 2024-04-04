import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FilterSelector from "../components/AllPostsPage/FilterComponents/FilterSelector";
import Pagination from "../components/AllPostsPage/Pagination/Pagination";
import PostList from "../components/AllPostsPage/PostList/PostList";
import "./AllPostsPage.css";
import Header from "../components/header_footer/header/Header";
import Footer from "../components/header_footer/footer/Footer";

const AllPostsPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selection, setSelection] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  console.log(pageNumber);
  const [totalpages, setTotalPages] = useState("");
  // const param = window.location.href;
  // console.log(param.cut("species="));
  const [fetchUrl, setFetchUrl] = useState(
    `http://localhost:3001/api/post/all/page=${pageNumber}`
  );
  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async () => {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const parsed = await response.json();
      setAllPosts(parsed.data);
      setTotalPages(parsed.totalPages);
    }
  };

  useEffect(() => {
    let updatedUrl = `http://localhost:3001/api/post/all/page=${pageNumber}`;
    let newUrl = "";

    if (selection["Miestai"]) {
      updatedUrl += `&city=${selection["Miestai"]}`;
      newUrl += `?city=${selection["Miestai"]}`;
    }
    if (selection["Rūšys"]) {
      updatedUrl += `&species=${selection["Rūšys"]}`;
      newUrl += `?species=${selection["Rūšys"]}`;
    }
    if (selection["Svoris"]) {
      updatedUrl += `&option=${selection["Svoris"]}`;
      newUrl += `?option=${selection["Svoris"]}`;
    }
    if (selection["Spalva"]) {
      updatedUrl += `&option=${selection["Spalva"]}`;
      newUrl += `?option=${selection["Spalva"]}`;
    }
    setFetchUrl(updatedUrl);
    navigate(newUrl);
  }, [selection, pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    if (params.filter) {
      const filterParams = params.filter.split("&");
      const pageParam = filterParams.find((param) => param.startsWith("page="));
      if (pageParam) {
        const page = parseInt(pageParam.split("=")[1], 10);
        setPageNumber(page);
      }
    } else {
      setPageNumber(1);
    }
  }, [params]);

  const handleFilterChange = (newSelection: Array<string>) => {
    let newUrl = "";

    if (selection["Miestai"]) {
      newUrl += `?city=${selection["Miestai"]}`;
    }
    if (selection["Rūšys"]) {
      newUrl += `?species=${selection["Rūšys"]}`;
    }
    if (selection["Svoris"]) {
      newUrl += `?option=${selection["Svoris"]}`;
    }
    if (selection["Spalva"]) {
      newUrl += `?option=${selection["Spalva"]}`;
    }
    navigate(`/allposts/page=1` + newUrl);
    setSelection(newSelection);
    setPageNumber(1);
  };

  const handlePageChange = (selectedPage) => {
    const newPageNumber = selectedPage + 1;
    setPageNumber(newPageNumber);
    navigate(`/allposts/page=${newPageNumber}`, { replace: true });
  };

  useEffect(() => {
    setPageNumber(1);
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-3">
            <FilterSelector
              inputLabel="Miestai"
              datalist={["Vilnius", "Klaipėda"]}
              setSelection={handleFilterChange}
            />
            <FilterSelector
              inputLabel="Rūšys"
              datalist={["Katinas", "Šuo"]}
              setSelection={handleFilterChange}
            />
            <FilterSelector
              inputLabel="Svoris"
              datalist={["Mažas", "Vidutinis", "Didelis"]}
              setSelection={handleFilterChange}
            />
            <FilterSelector
              inputLabel="Spalva"
              datalist={["Juoda", "Ruda", "Balta"]}
              setSelection={setSelection}
            />
          </div>
          <div className="col-9">
            <PostList allPosts={allPosts} />
          </div>
        </div>
        {totalpages !== "" && (
          <Pagination
            totalpages={totalpages}
            handlePageChange={handlePageChange}
            currentPage={pageNumber}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllPostsPage;
