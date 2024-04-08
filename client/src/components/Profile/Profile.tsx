import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Profile.scss";
import noImageFound from "../../primary_comps/Assets/notfound.png";

interface UserData {
    username: string;
}

interface Post {
    id: number;
    pet_name: string;
    description: string;
    created: string;
    photo: { photo: string }[];
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [ownedPosts, setOwnedPosts] = useState<Post[] | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const authToken = user.token;
    const loggedIn = user.id;
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${loggedIn}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData.data);
                } else {
                    setUserData(null);
                    console.error(`Error fetching user data: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchOwnedPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/post/owned/${loggedIn}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const postData = await response.json();
                    setOwnedPosts(postData.data);
                } else {
                    setOwnedPosts(null);
                    console.error(`Error fetching owned post data: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error fetching owned post data:", error);
            }
        };

        fetchUserData();
        fetchOwnedPosts();
    }, [loggedIn, authToken]);
    
    if (!loggedIn) {
        return <Navigate to="/Login" />;
    }

    const filteredPosts = ownedPosts ? ownedPosts.filter(post => post.pet_name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    return (
        <section className='ProfileSection'>
            <div className='profilecard text-black'>
                {userData ? (
                    <div className='p-3'>
                        <div className="row justify-content-center">
                            <div>
                                <h2>Jūsų Paskyra</h2>
                                <div className="form-outline mb-4 d-flex align-items-center">
                                    <FontAwesomeIcon icon={faUser} className='icon me-2' />
                                    {userData.username}
                                </div>
                                <h3>Aktyvūs Skelbimai</h3>
                                <div className="search-container mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ieškoti pagal vardą..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="scrollable">
                                    {filteredPosts.length > 0 ? (
                                        <div className="row">
                                            {filteredPosts.map(post => (
                                                <div key={post.id} className="col-md-auto col-lg-6 ">
                                                    <div className="card ">
                                                        {post.photo.length > 0 ? (
                                                            <img className="card-img-top" src={`http://localhost:3001/uploads/${post.photo[0].photo}`} alt={`Pirmoji nuotrauka ${post.pet_name}`} style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                                                        ) : (
                                                            <img className="card-img-top" src={noImageFound} alt="No Image Found" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                                                        )}
                                                        <div className="card-body">
                                                            <h5 className="card-title"><strong>Vardas:</strong> {post.pet_name}</h5>
                                                            <p className="card-text"><strong>Aprašymas:</strong> {post.description}</p>
                                                            <p className="card-text"><strong>Įkėlimo Data:</strong> {post.created.split('T')[0]}</p>
                                                            <Link to={`/post/${post.id}`} className="btn btn-primary">Peržiurėti</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Jokių priklausančių augintinių nerasta.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Reikia Prisijungti...</p>
                )}
            </div>
        </section>
    );
};

export default Profile;
