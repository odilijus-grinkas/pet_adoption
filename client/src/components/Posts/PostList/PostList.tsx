const PostList = ({ allPosts }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {allPosts.map((item) => (
        <div className="d-lg-flex my-3 mx-2" key={item.post.id}>
          <div className="card p-0" style={{ width: "12rem" }}>
            <img
              src="src/IMG/PetNoPhoto.png"
              className="card-img-top fluid"
              alt="..."
            />
            <div className="card-body">
              <p className="card-title">{item.post.pet_name}</p>
              <p className="card-text">{item.post.species.name}</p>
              <p className="card-text">{item.post.city.name}</p>
              <p className="card-description">{item.post.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
