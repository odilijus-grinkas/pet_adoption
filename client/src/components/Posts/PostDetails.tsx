import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

interface PostType {
    pet_name: string;
    city_id: number;
    city: City;
    description: string;
    created: Date;
    user: User;
}
interface User {
    user: string;
    email: string;
}
interface City {
    name: string;
}

const PostDetails = ({ post }: { post: PostType }) => {
    return (
        <div className='p-3'>
            <h3>{post.pet_name}</h3>
            <div className="form-outline mb-4 d-flex align-items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className='icon me-2' />
                {post.city.name}
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
            <p className='text-center text-muted'>Ikėlimo data: {post.created.toString().split('T')[0]}</p>
        </div>
    );
}

export default PostDetails;
