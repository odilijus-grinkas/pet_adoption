import { useState, useEffect } from "react";
import FilterSelector from "../components/Posts/FilterComponents/FilterSelector";

function Index() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [selection, setSelection] = useState("");
  console.log(selection);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/api/post/all`);
    if (response.ok) {
      const parsed = await response.json();
      setPosts(parsed.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  function OnFilterSelection(section: string) {
    setPosts((currentPosts) =>
      currentPosts.filter((item) => {
        const city = item.post.city.name.toLowerCase();
        const species = item.post.species.name.toLowerCase();
        const optionValue = item.option.value.toLowerCase();
        return (
          city.includes(section.toLowerCase()) ||
          species.includes(section.toLowerCase()) ||
          optionValue.includes(section.toLowerCase())
        );
      })
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div>
        <FilterSelector
          inputLabel="Miestai"
          datalist={["Vilnius", "Klaipėda"]}
          setSelection={setSelection}
          onFilterSelection={OnFilterSelection}
        />

        <FilterSelector
          inputLabel="Rūšys"
          datalist={["Katinas", "Šuo"]}
          setSelection={setSelection}
          onFilterSelection={OnFilterSelection}
        />
        <FilterSelector
          inputLabel="Svoris"
          datalist={["Mažas", "Vidutinis", "Didelis"]}
          setSelection={setSelection}
          onFilterSelection={OnFilterSelection}
        />
      </div>
      <div>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {currentPosts.map((item) => (
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
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({
              length: Math.ceil(posts.length / postsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Index;
