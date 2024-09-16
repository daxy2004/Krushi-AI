import React, { useState } from 'react';
import './landform.css'; 
const LandForm = () => {
  const [landSize, setLandSize] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    farmerName: '',
    address: '',
    cropType: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleLandSizeChange = (e) => {
    const value = e.target.value;
    setLandSize(value);
    if (parseFloat(value) >= 1) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (landSize <= 1) {
      alert('Please enter a valid land size larger than 1 acre to see additional details.');
    } else {
      console.log('Form Data:', { landSize, ...formData });
      // Simulate form submission (e.g., API call)
      setShowPopup(true);  // Show pop-up after form submission
    }
  };

  const closePopup = () => {
    setShowPopup(false);  // Close the pop-up when "OK" is clicked
  };

  return (
    <div className="land-form-container">
      <h2>Land Size Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Land Size (in acres):</label>
          <input
            type="number"
            value={landSize}
            onChange={handleLandSizeChange}
            placeholder="Enter size of land"
            required
          />
        </div>

        {showDetails && (
          <>
            <div className="form-group">
              <label>Farmer's Name:</label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleInputChange}
                placeholder="Enter farmer's name"
                required
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </div>

            <div className="form-group">
              <label>Type of Crop:</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                placeholder="Enter type of crop"
                required
              />
            </div>
          </>
        )}

        <button type="submit">Submit</button>
      </form>

      {/* Pop-up Notification */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Submission Successful!</h3>
            <p>Your details have been sent to all bio-waste collection companies. They will contact you within 2 working days.</p>
            <button onClick={closePopup} className="popup-btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandForm;