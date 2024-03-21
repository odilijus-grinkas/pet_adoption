import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterSelector from "../components/Posts/FilterComponents/FilterSelector";

function Index() {
  const [allPosts, setAllPosts] = useState([]);
  const [selection, setSelection] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchUrl, setFetchUrl] = useState(
    `http://localhost:3001/api/post/all/page=${pageNumber}`
  );
  const [hasMorePets, setHasMorePets] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async () => {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const parsed = await response.json();
      setAllPosts(parsed.data);
      setHasMorePets(parsed.data.length > 0);
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
    }
  }, [params]);

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
    navigate(`/page=${newPageNumber}`, { replace: true });
  };

  return (
    <div className="container">
      <div>
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
      </div>
      <div>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {allPosts.map((item) => (
            <div className="d-lg-flex my-3 mx-2" key={item.post.id}>
              <div className="card p-0" style={{ width: "12rem" }}>
                <img
                  src="src/IMG/PetNoPhoto.png"
                  className="card-img-top fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.post.pet_name}</h5>
                  <p className="card-text">{item.post.species.name}</p>
                  <p className="card-text" style={{ height: "3rem" }}>
                    {item.post.description}
                  </p>
                  <p className="card-text">{item.post.city.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          {hasMorePets && (
            <button onClick={() => handlePageChange(pageNumber + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
