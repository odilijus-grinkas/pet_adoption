import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import "./post.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt,faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';

interface Post {
    pet_name: string;
    city_id: number;
    city: { city: string };
    description: string;
    user: { id: number; email: string };
    created: string;
}
const Post = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams(); 
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const postData = await response.json();
                setPost(postData.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/post/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post), 
            });
            if (!response.ok) {
                throw new Error('Failed to update');
            }
            setIsEditing(false); 
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const isUserPost = post && parsedUser && post.user.id === parsedUser.id;

    return (
<section className='PostSection'>
    <div className="postcard text-black">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="Carousel Slide 1" />
                </div>
                <div className="carousel-item">
                    <img src="https://via.placeholder.com/800x400"  className="d-block w-100" alt="Carousel Slide 2" />
                </div>
                <div className="carousel-item">
                    <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="Carousel Slide 3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className="text-center intro">
        </div>
        {post ? (
    <>
        {isEditing ? (
            <div className='p-3'>
                <div className="row">
                    <div className="col-md-6">
                    <input className="form-control" value={post.pet_name} onChange={(e) => setPost({ ...post, pet_name: e.target.value })}/>
                    </div>
                </div>
                <div className="form-outline mb-4 d-flex align-items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className='icon me-2' />
                <div className="row p-2">
                    <div className="col-md-6"></div>
                    <select className="form-control" value={post.city_id} onChange={(e) => setPost({ ...post, city_id: parseInt(e.target.value), city: { city: e.target.options[e.target.selectedIndex].text } })}>
    <option value={1}>New York</option>
    <option value={2}>Vilnius</option>
    <option value={3}>Klaipėda</option>
    <option value={4}>Kaunas</option>
</select>

                </div>
                
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                    <textarea className="form-control" value={post.description}  onChange={(e) => setPost({ ...post, description: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-outline mb-4 d-flex align-items-center">
                            <FontAwesomeIcon icon={faEnvelope} className='icon me-2' />
                            {post.user.email}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-outline mb-4 d-flex align-items-center">
                            <FontAwesomeIcon icon={faPhone} className='icon me-2' />
                            Cia butu telefonas
                        </div>
                    </div>
                </div>
                <hr />
                <p className='text-center text-muted'>Ikėlimo data: {post.created.split('T')[0]}</p>
                <div className="row justify-content-center">
                        <div className="col-auto">
                        <button className="btn btn-primary" onClick={handleSave}>Išsaugoti</button>
                </div>
                </div>
            </div>
        ) : (
            <div className='p-3'>
                <h3>{post.pet_name}</h3>
                <div className="form-outline mb-4 d-flex align-items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className='icon me-2' />
                    {post.city.city}
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <p>{post.description}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-outline mb-4 d-flex align-items-center">
                            <FontAwesomeIcon icon={faEnvelope} className='icon me-2' />
                            {post.user.email}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-outline mb-4 d-flex align-items-center">
                            <FontAwesomeIcon icon={faPhone} className='icon me-2' />
                            Cia butu telefonas
                        </div>
                    </div>
                </div>
                <hr />
                <p className='text-center text-muted'>Ikėlimo data: {post.created.split('T')[0]}</p>
                {isUserPost && (
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={handleEdit}>Redaguoti
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
    </>
) : (
    <div >
        <p>Toks skelbimas neegzistuoja ...</p>
        <img src="https://i.pinimg.com/564x/41/9a/a2/419aa2352472717c77f2ee70e8f4029e.jpg" width={300} height={300} alt="" />
    </div>
)}
    </div>
</section>


    );
}

export default Post;
