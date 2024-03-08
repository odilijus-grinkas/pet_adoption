import { useEffect, useState } from "react";

function Index() {
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

  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <div className="container d-flex justify-content-center align-items-center flex-wrap">
      {posts.map((post) => (
        <div className="d-lg-flex my-3 mx-2">
          <div className="card p-0" key={post.id} style={{ width: "18rem" }}>
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
  );
}

export default Index;
