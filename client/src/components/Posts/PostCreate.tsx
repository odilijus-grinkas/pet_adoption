import "./assets/postCreation.scss";

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PostCreate = () => {
  const [post, setPost] = useState({
    // Define initial state for your post
    pet_name: "",
    city_id: "",
    species_id: "",
    description: "",
    status: "",
  });

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const loggedIn = !!user; // Check if user is logged in
  const parsedUser = loggedIn ? JSON.parse(user) : null;
  const authToken = parsedUser ? parsedUser.token : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault(); // Prevent default form submission

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

  if (!loggedIn) {
    return <Navigate to="/Login" />; // Redirect to login page if not logged in
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
