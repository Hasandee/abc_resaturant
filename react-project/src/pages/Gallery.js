import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        loadGalleries();
    }, []);

    const loadGalleries = async () => {
        const result = await axios.get('/gallery');
        setGalleries(result.data);
    };

    return (
        <div>
            <h2>Gallery</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {galleries.map((gallery) => (
                    <div key={gallery.id} style={{ margin: '10px' }}>
                        <h3>{gallery.title}</h3>
                        <p>{gallery.description}</p>
                        <img src={gallery.imageUrl} alt={gallery.title} style={{ width: '200px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
