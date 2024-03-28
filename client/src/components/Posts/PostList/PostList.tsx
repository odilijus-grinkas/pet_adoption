import PetNoPhoto from "../../../IMG/PetNoPhoto.png";
const PostList = ({ allPosts }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {allPosts.map((item) => (
        <div className="d-lg-flex my-3 mx-2" key={item.id}>
          <div className="card p-0" style={{ width: "12rem" }}>
            <img src={PetNoPhoto} className="card-img-top fluid" alt="..." />
            <div className="card-body">
              <p className="card-title">{item.pet_name}</p>
              <p className="card-text">{item.species.name}</p>
              <p className="card-text">{item.city.name}</p>
              <p className="card-description">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
