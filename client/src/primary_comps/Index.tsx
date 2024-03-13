import { useState, useEffect } from "react";

function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  interface Post {
    pet_name: string;
    description: string;
    id: number;
    species: {
      name: string;
    };
    city: {
      name: string;
    };
  }

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/api/post/all`);
    if (response.ok) {
      const parsed = await response.json();
      setPosts(parsed.data);
      console.log(parsed.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <div>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {currentPosts.map((post) => (
            <div className="d-lg-flex my-3 mx-2" key={post.id}>
              <div className="card p-0" style={{ width: "12rem" }}>
                <img
                  src="src/IMG/PetNoPhoto.png"
                  className="card-img-top fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{post.pet_name}</h5>
                  <p className="card-text">{post.species.name}</p>
                  <p className="card-text" style={{ height: "3rem" }}>
                    {post.description}
                  </p>
                  <p className="card-text">{post.city.name}</p>
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
