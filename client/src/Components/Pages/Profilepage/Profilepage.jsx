// Profilepage.jsx

import React, { useState, useEffect } from 'react';
import './Profilepage.css';
import profile_icon from '../../Assets/user-icon-profilepage.png';
import Navbar from '../Navbar/Navbar';

const BackendApiUrl = 'ApiUrlForProfilepage';

const Profilepage = () => {
  const [userData, setUserData] = useState(null);
  const [activeButton, setActiveButton] = useState('volunteer'); // Default active button
  const [loading, setLoading] = useState(true);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  useEffect(() => {
    // Replace 'backendApiUrl' with your actual backend API endpoint
    fetch(BackendApiUrl)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='profilepage-body'>
      <div className="profilepage-container">
        <Navbar />

        <div className="profilepage-rest-body-container">
          <div className="profilepage-middle-section">
            <div className="profilepage-username-container">
              <p>Username</p>
            </div>

            <div className="profilepage-profile-container">
              <img src={profile_icon} alt="Profile icon" className='profilepage-profile-icon' />
              <p className="profilepage-profile-text">Some Text Below the Profile Icon</p>
            </div>
          </div>

          <div className="profilepage-footer-container">
            <div className="profilepage-footer-button-container">
              <div
                className={`profilepage-footer-button ${activeButton === 'volunteer' ? 'active' : ''}`}
                onClick={() => handleButtonClick('volunteer')}
              >
                As a volunteer in NGOs
              </div>
              <div
                className={`profilepage-footer-button ${activeButton === 'donor' ? 'active' : ''}`}
                onClick={() => handleButtonClick('donor')}
              >
                As a donor in NGOs
              </div>
              <div
                className={`profilepage-footer-button ${activeButton === 'executive' ? 'active' : ''}`}
                onClick={() => handleButtonClick('executive')}
              >
                As an executive in NGOs
              </div>
            </div>

            <div className="profilepage-list-container">
              {userData && userData[`${activeButton}NGOs`].map((ngo) => (
                <div key={ngo.id} className="profilepage-content-item">
                  {ngo.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
