import { Link } from "react-router-dom";
import PetNoPhoto from "../../../primary_comps/Assets/notfound.png";
const PostList = ({ allPosts }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {allPosts.length === 0 ? (
        <p>Atsiprašome, nebuvo rasta jokių gyvūnėlių</p>
      ) : (
        allPosts.map((item) => (
          <Link to={`/post/${item.id}`} className="card-link" key={item.id}>
            <div className="d-lg-flex my-3 mx-2">
              <div className="card p-0" style={{ width: "12rem" }}>
                {item.photo.length > 0 ? (
                  <img
                    src={`http://localhost:3001/uploads/${item.photo[0].photo}`}
                    className="card-img-top fluid"
                    alt="BRR"
                  />
                ) : (
                  <img
                    src={PetNoPhoto}
                    className="card-img-top fluid"
                    alt="PetNoPhoto"
                  />
                )}
                <div className="card-body">
                  <p className="card-title">{item.pet_name}</p>
                  <p className="card-text">{item.species.name}</p>
                  <p className="card-text">{item.city.name}</p>
                  <p className="card-description">{item.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default PostList;
