import  { useState } from 'react';
import './assets/AdMod.scss';

export default function City() {
    const [regionId, setRegionId] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/post/city', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You might need to include an authorization header if required
                },
                body: JSON.stringify({ region_id: regionId, name: name }),
            });

            if (!response.ok) {
                throw new Error('Failed to create city');
            }

            const data = await response.json();
            console.log('City created:', data);
            // Reset form fields
            setRegionId('');
            setName('');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error creating city:', error);
            setError('Failed to create city. Please try again later.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create City</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="regionId" className="form-label">Region ID</label>
                    <input type="text" className="form-control" id="regionId" value={regionId} onChange={(e) => setRegionId(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
