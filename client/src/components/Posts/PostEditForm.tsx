import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ValidationEdit } from "../Inputs/Validation";
import { useState } from "react";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
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
const PostEditForm = ({
  post,
  setPost,
  handleSave,
}: {
  post: Post;
  setPost: (post: Post) => void;
  handleSave: () => void;
}) => {
  const [errors, setErrors] = useState<Partial<Post>>({});

  const validateForm = () => {
    const formData = { ...post };
    const newErrors = ValidationEdit(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof Post, value: string | number) => {
    setPost({ ...post, [field]: value });
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-md-6">
          <input
            className="form-control"
            value={post.pet_name}
            name="pet_name"
            onChange={(e) => handleChange("pet_name", e.target.value)}
          />
          {errors.pet_name && (
            <span className="text-danger">{errors.pet_name}</span>
          )}
        </div>
      </div>
      <div className="form-outline mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon me-2" />
        <div className="row p-2">
          <div className="col-md-6"></div>
          <select
            className="form-control"
            value={post.city_id}
            onChange={(e) =>
              setPost({
                ...post,
                city_id: parseInt(e.target.value),
                city: {
                  city: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                },
              })
            }
          >
            <option value={1}>Klaipėda</option>
            <option value={2}>Jonava</option>
            <option value={3}>Vilnius</option>
            <option value={4}>Trakai</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <textarea
            className="form-control"
            name="description"
            value={post.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {errors.description && (
            <span className="text-danger">{errors.description}</span>
          )}
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
        <div className="col">
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
          <button className="btn btn-primary" onClick={handleFormSubmit}>
            Išsaugoti
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditForm;
