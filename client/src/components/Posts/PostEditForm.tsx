import React, { useEffect, useState } from "react";
import { faEnvelope, faMapMarkerAlt, faPhone,faSignature } from "@fortawesome/free-solid-svg-icons";
import DropzoneComponent from "./DropzoneComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface PostEditFormProps {
  post: Post;
  setPost: (post: Post) => void;
  handleSave: () => void;
}

const PostEditForm: React.FC<PostEditFormProps> = ({ post, setPost, handleSave }) => {
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    // Check if postId exists in localStorage
    const storedPostId = localStorage.getItem("postId");
    if (storedPostId) {
      setPostId(storedPostId);
    }
  }, []);

  useEffect(() => {
    // Save postId to localStorage when it's set in the post object
    if (post.id) {
      localStorage.setItem("postId", post.id.toString());
    }
  }, [post.id]);

  const handleSaveAndRefresh = () => {
    handleSave(); // Save the changes
    window.location.reload(); // Reload the page
  };


  return (
    <div className="p-3">
      <div className="row">
        <div className="col-md-6">
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faSignature} className="icon me-2" />
          <input
            className="form-control"
            value={post.pet_name}
            onChange={(e) => setPost({ ...post, pet_name: e.target.value })}
          />
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon me-2" />
            <select
              className="form-control"
              value={post.city_id}
              onChange={(e) =>
                setPost({
                  ...post,
                  city_id: parseInt(e.target.value),
                  city: {
                    city: e.target.options[e.target.selectedIndex].text,
                    name: "",
                  },
                })
              }
            >
              <option value={1}>New York</option>
              <option value={2}>Vilnius</option>
              <option value={3}>Klaipėda</option>
              <option value={4}>Kaunas</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6" style={{ maxHeight: "200px", overflowY: "auto" }}>
          <DropzoneComponent postId={postId} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <textarea
            className="form-control"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="icon me-2" />
            {post.user.email}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faPhone} className="icon me-2" />
            Cia butu telefonas
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center text-muted">
        Ikėlimo data: {post.created.toString().split("T")[0]}
      </p>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleSaveAndRefresh}>
            Išsaugoti
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditForm;
