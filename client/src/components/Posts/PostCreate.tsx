import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const PostCreate = () => {
  const [post, setPost] = useState({
    pet_name: "",
    city_id: "",
    species_id: "",
    description: "",
    status: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("user");
  const loggedIn = !!user;
  const parsedUser = loggedIn ? JSON.parse(user) : null;
  const authToken = parsedUser ? parsedUser.token : null;
  const userRole = parsedUser ? parsedUser.role : null;

  useEffect(() => {
    // Redirect if user is not logged in
    if (!loggedIn) {
      navigate("/Login");
    }
  }, [loggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !post.pet_name ||
      !post.city_id ||
      !post.species_id ||
      !post.description
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/post/create/plus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            ...post,
            user_id: parsedUser.id,
            species_id: parseInt(post.species_id),
            city_id: parseInt(post.city_id),
            created: new Date(),
            valid_until: new Date(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      navigate("/"); // Redirect to the index page
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Check if the route matches "/post/create/regular" and user has the "regular" role
  if (location.pathname !== "/post/create/regular" || userRole !== "regular") {
    return <Navigate to="/Unauthorized" />;
  }

  return (
    <div className="PostCreate">
      <h2>Create Post</h2>
      <form onSubmit={handleCreatePost}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="pet_name"
            value={post.pet_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City ID:</label>
          <select
            name="city_id"
            value={post.city_id}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            <option value="1">Klaipėda</option>
            <option value="2">Vilnius</option>
            <option value="3">Klaipeda</option>
            <option value="4">Trakai</option>
          </select>
        </div>
        <div>
          <label>Species ID:</label>
          <select
            name="species_id"
            value={post.species_id}
            onChange={handleInputChange}
          >
            <option value="">Select Species</option>
            <option value="1">Šuo</option>
            <option value="2">Katinas</option>
            <option value="3">Triušis</option>
            <option value="4">Žuvytė</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
