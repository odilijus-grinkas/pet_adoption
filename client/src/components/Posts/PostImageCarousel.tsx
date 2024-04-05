import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import noImageFound from "../../primary_comps/Assets/notfound.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface PostImageCarouselProps {
  post: Post;
  userRole: number; // User's role
  onDeletePhoto: (photoId: number) => void; // Function to handle photo deletion
}

const PostImageCarousel: React.FC<PostImageCarouselProps> = ({ post, userRole, onDeletePhoto }) => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const isAdmin = parsedUser && (parsedUser.role === 3 || parsedUser.role === 4);

  const openEnlargeImage = (photoUrl: string) => {
    setEnlargedImage(photoUrl);
  };

  const closeEnlargeImage = () => {
    setEnlargedImage(null);
  };

  const handleDeletePhoto = (photoId: number) => {
    onDeletePhoto(photoId);
  };

  return (
    <div className="post-image-carousel">
      {post && post.photo && post.photo.length > 0 ? (
        <Carousel showThumbs={false}>
          {post.photo.map((photo: PhotoType, index: number) => {
            const photoUrl = `http://localhost:3001/uploads/${photo.photo}`;
            return (
              <div key={index} onClick={() => openEnlargeImage(photoUrl)} style={{ position: "relative" }}>
                <img
                  src={photoUrl}
                  className="img-thumbnail"
                  alt={`Post ${index}`}
                  style={{ width: "100%", height: "550px" }}
                />
                {(parsedUser && parsedUser.id === post.user.id) || isAdmin ? (
                  <button className="delete-button" onClick={() => handleDeletePhoto(photo.photo)}>
                    <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
                  </button>
                ) : null}
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div>
          <img
            src={noImageFound}
            alt="No Image Found"
            style={{ width: "100%", height: "550px" }}
          />
        </div>
      )}

      {enlargedImage && (
        <div className="fullscreen-overlay" onClick={closeEnlargeImage}>
          <img
            src={enlargedImage}
            className="fullscreen-image"
            alt="Enlarged Post"
          />
        </div>
      )}
    </div>
  );
};

export default PostImageCarousel;
