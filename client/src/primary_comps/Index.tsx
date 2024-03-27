import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterSelector from "../components/Posts/FilterComponents/FilterSelector";
import Pagination from "../components/Posts/Pagination/Pagination";
import PostList from "../components/Posts/PostList/PostList";
import "./index.css";

const Index = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selection, setSelection] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalpages, setTotalPages] = useState("");
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
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    let updatedUrl = `http://localhost:3001/api/post/all/page=${pageNumber}`;

    if (selection["Miestai"]) {
      updatedUrl += `&city=${selection["Miestai"]}`;
    }
    if (selection["Rūšys"]) {
      updatedUrl += `&species=${selection["Rūšys"]}`;
    }
    if (selection["Svoris"]) {
      updatedUrl += `&option=${selection["Svoris"]}`;
    }
    if (selection["Spalva"]) {
      updatedUrl += `&option=${selection["Spalva"]}`;
    }

    setFetchUrl(updatedUrl);
  }, [selection, pageNumber]);

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

  const handlePageChange = (selectedPage) => {
    const newPageNumber = selectedPage + 1;
    setPageNumber(newPageNumber);
    navigate(`/page=${newPageNumber}`);
  };

  useEffect(() => {
    setPageNumber(1);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <FilterSelector
            inputLabel="Miestai"
            datalist={["Vilnius", "Klaipėda"]}
            setSelection={setSelection}
          />
          <FilterSelector
            inputLabel="Rūšys"
            datalist={["Katinas", "Šuo"]}
            setSelection={setSelection}
          />
          <FilterSelector
            inputLabel="Svoris"
            datalist={["Mažas", "Vidutinis", "Didelis"]}
            setSelection={setSelection}
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
      <Pagination totalpages={totalpages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Index;
