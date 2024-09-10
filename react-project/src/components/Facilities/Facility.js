import React, { useEffect, useState } from 'react';
import './Facility.css';
import axios from 'axios';
import Footer from '../Footer/Footer';

const Facility = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    
    axios.get('/facility')
      .then(response => {
        setFacilities(response.data);
      })
      .catch(error => console.error('Error fetching facilities:', error));
  }, []);

  return (
    <div className="facility-container">
      <header className="facility-header">
        <h1>Our Facilities</h1>
    
      </header>

      <section className="facility-gallery">
        {facilities.map((facility, index) => (
          <div className={`gallery-item ${index % 2 !== 0 ? 'reverse' : ''}`} key={facility.id}>
            <div className="image-container">
              <img src={`data:image/jpeg;base64,${facility.image}`} alt={facility.heading} />
            </div>
            <div className="description">
              <h3>{facility.heading}</h3>
              <p>{facility.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="facility-features">
      
       
      </section>

      <Footer />
    </div>
  );
}

export default Facility;
