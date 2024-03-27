import { useState, useEffect } from "react";
import FilterSelector from "../components/Posts/FilterComponents/FilterSelector";

function Index() {
  const [allPosts, setAllPosts] = useState([]);
  const [selection, setSelection] = useState("");
  const [currentPosts, setCurrentPosts] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/api/post/all`);
    if (response.ok) {
      const parsed = await response.json();
      setAllPosts(parsed.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const posts = allPosts.filter((item) => {
      if (
        selection["Miestai"] &&
        item.post.city.name.toLowerCase() !== selection["Miestai"].toLowerCase()
      ) {
        return false;
      }
      if (
        selection["Rūšys"] &&
        item.post.species.name.toLowerCase() !==
          selection["Rūšys"].toLowerCase()
      ) {
        return false;
      }
      if (
        selection["Svoris"] &&
        item.option.value.toLowerCase() !== selection["Svoris"].toLowerCase()
      ) {
        return false;
      }
      return true;
    });
    setCurrentPosts(posts);
  }, [selection, allPosts]);

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
      </div>
    </div>
  );
}

export default Index;

export default Index;