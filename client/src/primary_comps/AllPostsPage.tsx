import "./AllPostsPage.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import FilterSelector from "../components/AllPostsPage/FilterComponents/FilterSelector";
import Footer from "../components/header_footer/footer/Footer";
import Header from "../components/header_footer/header/Header";
import Pagination from "../components/AllPostsPage/Pagination/Pagination";
import PostList from "../components/AllPostsPage/PostList/PostList";

const AllPostsPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selection, setSelection] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalpages, setTotalPages] = useState("");
  const [optionFilters, setOptionFilters] = useState([]);
  const [searchParams] = useSearchParams();
  const speciesParam = searchParams.toString();
  const speciesName = searchParams.get("species");
  const [fetchUrl, setFetchUrl] = useState(
    `http://localhost:3001/api/post/all/?${speciesParam}&page=${pageNumber}`
  );
  const [city, setCity] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!speciesParam) {
      navigate("/");
    }
  }, [speciesParam, navigate]);

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/post/cities");
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      const allcities = data.data;
      const city = allcities.map((city) => city.name);
      setCity(city);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchData = async () => {
    const response = await fetch(fetchUrl);
    // const species = speciesParam.split("=");
    // const speciesName = species[1];
    const characteristicsAndOptions = await fetch(
      `http://localhost:3001/api/post/test/${speciesName}`
    );
    if (response.ok && characteristicsAndOptions.ok) {
      const parsed = await response.json();
      const parsed2 = await characteristicsAndOptions.json();
      console.log(parsed2);
      setOptionFilters(parsed2.data);
      setAllPosts(parsed.data);
      setTotalPages(parsed.totalPages);
    }
  };

  useEffect(() => {
    let updatedUrl = `http://localhost:3001/api/post/all/${speciesParam}&page=${pageNumber}`;

    if (selection["miestai"]) {
      updatedUrl += `&city=${selection["miestai"]}`;
    }
    if (selection["svoris"]) {
      updatedUrl += `&option=${selection["svoris"]}`;
    }
    if (selection["kailio ilgis"]) {
      updatedUrl += `&option=${selection["kailio ilgis"]}`;
    }
    if (selection["spalva"]) {
      updatedUrl += `&option=${selection["spalva"]}`;
    }

    setFetchUrl(updatedUrl);
  }, [selection, pageNumber, speciesParam]);

  useEffect(() => {
    fetchData();
  }, [fetchUrl, speciesParam]);

  // useEffect(() => {
  //   if (!speciesParam) {
  //     navigate("/");
  //   }
  // }, [speciesParam, navigate]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    if (page) {
      setPageNumber(parseInt(page, 10));
    } else {
      setPageNumber(1);
    }
  }, [location.search]);

  const handleFilterChange = (newSelection: Array<string>) => {
    setSelection(newSelection);
    setPageNumber(1);
  };

  const handlePageChange = (selectedPage) => {
    const newPageNumber = selectedPage + 1;
    setPageNumber(newPageNumber);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", newPageNumber);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <>
      <Header />
      <div className="container mt-4 allposts">
        <div className="row">
          <div className="col-3">
            {optionFilters.map((filter, index) => (
              <FilterSelector
                key={index}
                inputLabel={filter.characteristic.name}
                datalist={filter.characteristic.option.map(
                  (option) => option.value
                )}
                setSelection={handleFilterChange}
              />
            ))}
            <FilterSelector
              inputLabel="miestai"
              datalist={city}
              setSelection={handleFilterChange}
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
