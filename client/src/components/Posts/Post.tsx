import "./assets/post.scss";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PostDetails from "./PostDetails";
import PostEditForm from "./PostEditForm";
import PostImageCarousel from "./PostImageCarousel";
import PostNotFound from "./PostNotFound";

interface Post {
  pet_name: string;
  city_id: number;
  city: City;
  description: string;
  created: Date;
  user: User;
}

interface User {
  id: number;
  user: string;
  email: string;
  role: number;
}

interface City {
  city: string;
  name: string;
}

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const authToken = parsedUser ? parsedUser.token : null;
  const logged = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedIn = logged.id ? true : false;
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const postData = await response.json();
        setPost(postData.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, authToken]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error("Failed to update");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      navigate("/"); // Redirect to the index page
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeletePhoto = async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:3001/delete/${filename}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setPost((prevPost) => {
          const updatedPhotos = prevPost.photo.filter(
            (photo) => photo.photo !== filename
          );
          return { ...prevPost, photo: updatedPhotos };
        });
      } else {
        console.error("Failed to delete photo:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const isAdmin = parsedUser && (parsedUser.role === 3 || parsedUser.role === 4);
  const isUserPost =
    post &&
    parsedUser &&
    post.user &&
    (parsedUser.id === post.user.id || isAdmin);

   

    const navigateToCreateMessage = () => {
      if (post && parsedUser) {
        navigate(`/chat/${post.user.id}`, {
          state: {
            loggedInUserId: parsedUser.id,
            targetUserId: post.user.id,
          }
        });
      }
    };

    return (
      <section className="PostSection">
        <div className="postcard text-black">
          {post ? (
            <>
              <PostImageCarousel
                post={post}
                onDeletePhoto={handleDeletePhoto}
                isEditing={isEditing}
              />
              {isEditing ? (
                <PostEditForm
                  post={post}
                  handleSave={handleSave}
                />
              ) : (
                <PostDetails post={post} />
              )}
              {isUserPost && !isEditing && (
              <div className="row justify-content-center">
                <div className="col-auto">
                  <button className="btn btn-primary" onClick={handleEdit}>
                    Redaguoti
                  </button>
                </div>
              </div>
              )}
              {loggedIn && (
                <div className="row justify-content-center">
                 <div className="col-auto">
                  <button className="btn btn-primary" onClick={navigateToCreateMessage}>
                    Siųsti Žinutę
                  </button>
                </div>
              </div>
              )}

              {isEditing && isAdmin && (
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Ištrinti Skelbimą
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <PostNotFound />
          )}
        </div>
      </section>
    );
  };
  
  export default Post;