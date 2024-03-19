import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Profile.scss";

interface UserData {
    username: string;
}

interface Post {
    id: number;
    pet_name: string;
    description: string;
    created: string;
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [ownedPosts, setOwnedPosts] = useState<Post[] | null>(null);
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

    return (
        <section className='ProfileSection'>
            <div className='profilecard text-black'>
                {userData ? (
                    <div className='p-3'>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <h2>Jūsų Paskyra</h2>
                                <div className="form-outline mb-4 d-flex align-items-center">
                                    <FontAwesomeIcon icon={faUser} className='icon me-2' />
                                    {userData.username}
                                </div>
                                <h3>Aktyvūs Skelbimai</h3>
                                {ownedPosts ? (
                                    <ul>
                                        {ownedPosts.map(pet => (
                                            <li key={pet.id} className='p-3'>
                                                <p><strong>Augintinio Vardas:</strong> {pet.pet_name}</p>
                                                <p><strong>Aprašymas:</strong> {pet.description}</p>
                                                <p><strong>Įkėlimo Data:</strong> {pet.created.split('T')[0]}</p>
                                                <div className="row justify-content-center">
                                                    <div className="col-auto">
                                                        <Link to={`/post/${pet.id}`} className="btn btn-primary">Peržiurėti</Link>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Jokių priklausančių augintinių nerasta.</p>
                                )}
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
