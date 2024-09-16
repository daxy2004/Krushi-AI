import React, { useState } from 'react';
import './soilmon.css'; // Ensure you have corresponding CSS for styling

const CropRecommendationForm = () => {
  const [soilType, setSoilType] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [phValue, setPhValue] = useState('');
  const [message, setMessage] = useState('');

  // Define ranges for each nutrient and pH value based on soil type
  const nutrientRanges = {
    sandy: { nitrogen: { min: 25, max: 50 }, phosphorus: { min: 25, max: 50 }, potassium: { min: 25, max: 50 }, ph: { min: 5, max: 8 } },
    loamy: { nitrogen: { min: 50, max: 75 }, phosphorus: { min: 50, max: 75 }, potassium: { min: 50, max: 75 }, ph: { min: 5, max: 8 } },
    clay: { nitrogen: { min: 75, max: 125 }, phosphorus: { min: 75, max: 125 }, potassium: { min: 75, max: 125 }, ph: { min: 5, max: 8 } },
  };

  // Function to check if the values are within the correct range
  const checkNutrientsAndPh = () => {
    const nitrogenValue = parseFloat(nitrogen);
    const phosphorusValue = parseFloat(phosphorus);
    const potassiumValue = parseFloat(potassium);
    const phValueNumber = parseFloat(phValue);

    if (!soilType) {
      setMessage('Please select a soil type.');
      return;
    }

    if ((!nitrogenValue || isNaN(nitrogenValue)) ||
        (!phosphorusValue || isNaN(phosphorusValue)) ||
        (!potassiumValue || isNaN(potassiumValue)) ||
        (!phValueNumber || isNaN(phValueNumber))) {
      setMessage('Please enter valid values for all fields.');
      return;
    }

    const range = nutrientRanges[soilType];

    const nitrogenInRange = nitrogenValue >= range.nitrogen.min && nitrogenValue <= range.nitrogen.max;
    const phosphorusInRange = phosphorusValue >= range.phosphorus.min && phosphorusValue <= range.phosphorus.max;
    const potassiumInRange = potassiumValue >= range.potassium.min && potassiumValue <= range.potassium.max;
    const phInRange = phValueNumber >= range.ph.min && phValueNumber <= range.ph.max;

    // Check all values and generate messages
    if (nitrogenInRange && phosphorusInRange && potassiumInRange && phInRange) {
      setMessage('Fertile Soil! All values are perfect for this soil type.');
    } else {
      let resultMessage = '';

      if (!nitrogenInRange) {
        resultMessage += `Nitrogen level out of range! For ${soilType} soil, the ideal nitrogen range is between ${range.nitrogen.min} and ${range.nitrogen.max} mg-N/kg. `;
      }
      if (!phosphorusInRange) {
        resultMessage += `Phosphorus level out of range! For ${soilType} soil, the ideal phosphorus range is between ${range.phosphorus.min} and ${range.phosphorus.max} mg-N/kg. `;
      }
      if (!potassiumInRange) {
        resultMessage += `Potassium level out of range! For ${soilType} soil, the ideal potassium range is between ${range.potassium.min} and ${range.potassium.max} mg-N/kg. `;
      }
      if (!phInRange) {
        resultMessage += `Soil pH out of range! For ${soilType} soil, the ideal pH range is between ${range.ph.min} and ${range.ph.max}.`;
      }

      setMessage(resultMessage.trim());
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    checkNutrientsAndPh();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="soil-type" className="input-label">Select Soil Type:</label>
          <select
            id="soil-type"
            className="input-field"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="">-- Choose Soil Type --</option>
            <option value="sandy">Sandy</option>
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
          </select>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the value of nitrogen (mg-N/kg)"
            className="input-field"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the value of phosphorus (mg-N/kg)"
            className="input-field"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the value of potassium (mg-N/kg)"
            className="input-field"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the soil pH value (0-14)"
            className="input-field"
            value={phValue}
            onChange={(e) => setPhValue(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>

      {/* Display the message in a pop-up style */}
      {message && <div className="popup-message">{message}</div>}
    </div>
  );
};

export default CropRecommendationForm;
