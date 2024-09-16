import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"; // Assume your styling is in App.css
import "./home.css"; // Additional styles for the home page
import Landform from "./landform";
import Soilmon from "./soilmon";
import Disease from "./diseasepred";
// Import images for products and slider
import Logo from "./assets/logo.png";
import soilImage from "./assets/istockphoto-489871228-612x612.jpg";
import seedsImage from "./assets/istockphoto-511976070-612x612.jpg";
import fertilizerImage from "./assets/gettyimages-1280905059-612x612.jpg";
import sliderImage1 from "./assets/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed_181624-25838.avif";
import sliderImage2 from "./assets/istockphoto-489871228-612x612.jpg";
import sliderImage3 from "./assets/hydroponic-farming-system-organic-hydroponic-vegetable-garden-greenhouse_978588-13663.avif";

// Load Google Translate script dynamically only once
const loadGoogleTranslate = () => {
  if (!window.googleTranslateLoaded) {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateLoaded = true; // Mark the script as loaded
  }
};

// Initialize Google Translate only if it is not already initialized
const googleTranslateElementInit = () => {
  if (
    window.google &&
    window.google.translate &&
    !window.google.translate.initialized
  ) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi,ta,te,bn,ml,mr,gu,kn,pa", // English and Indian languages
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
    window.google.translate.initialized = true; // Mark Google Translate as initialized
  }
};

const App = () => {
  useEffect(() => {
    // Load Google Translate script when the component mounts
    loadGoogleTranslate();

    // Assign the init function to the global scope
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Header Section */}
        <header className="app-header">
          <div className="app-logo">
            <img src={Logo} alt="logo" />
            <h1>Krushi-AI</h1>
          </div>
          <nav className="app-nav-bar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/soil-monitoring">Soil Monitoring</Link>
              </li>
              <li>
                <Link to="/disease-prediction">Disease Prediction</Link>
              </li>
              <li>
                <Link to="/crop-recommendation">Crop Recommendation</Link>
              </li>
              <li>
                <Link to="/market-demand">Market Demand</Link>
              </li>
              <li>
                <Link to="/biowaste">Bio-Waste</Link>
              </li>
            </ul>
          </nav>
          {/* Language Section */}
          <div className="app-language">
            <div id="google_translate_element"></div>
          </div>
        </header>

        {/* Routing Section */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biowaste" element={<Landform />} />
          <Route path="/soil-monitoring" element={<Soilmon />} />
          <Route path="/disease-prediction" element={<Disease />} />
          <Route path="/crop-recommendation" element={<Disease />} />
          <Route path="/market-demand" element={<Disease />} />
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>

        {/* Footer Section */}
        <footer className="footer">
          <p>&copy; 2024 AgroFarm. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

// Home Component with Image Slider and Blur Effect
const Home = () => {
  const images = [sliderImage1, sliderImage2, sliderImage3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-content">
      {/* Hero Section */}
      <section className="main-hero">
        <div className="image-carousel">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "visible" : ""
              }`}
              style={{
                backgroundImage: `url(${image})`,
                display: index === currentIndex ? "block" : "none",
              }}
            >
              {/* Apply blur effect to the background image */}
              <div className="carousel-blur-background"></div>

              {/* The text container that remains in focus */}
              <div className="carousel-caption">
                <h2>Welcome to Krushi-AI</h2>
                <p>
                  Empowering farmers with modern agricultural solutions for new
                  age farmers
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="learn-more-button">Learn More</button>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h3>About Us</h3>
        <p>
          AgroFarm is dedicated to providing sustainable agricultural products
          and services, promoting healthy farming practices worldwide.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h3>Our Services</h3>
        <div className="service-cards">
          <div className="card">
            <h4>Consulting</h4>
            <p>
              Professional advice to improve crop production and farm
              efficiency.
            </p>
          </div>
          <div className="card">
            <h4>Equipment Rental</h4>
            <p>
              Modern farming equipment available for rent at affordable prices.
            </p>
          </div>
          <div className="card">
            <h4>Training Programs</h4>
            <p>
              Learn modern farming techniques through our training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products">
        <h3>Our Products</h3>
        <div className="product-grid">
          <div className="product">
            <img src={soilImage} alt="Soil" />
            <h4>Soil</h4>
            <p>High-quality soil for efficient farming.</p>
          </div>
          <div className="product">
            <img src={seedsImage} alt="Seeds" />
            <h4>Organic Seeds</h4>
            <p>Top-notch organic seeds for a healthy harvest.</p>
          </div>
          <div className="product">
            <img src={fertilizerImage} alt="Fertilizer" />
            <h4>Fertilizer</h4>
            <p>Eco-friendly fertilizers to boost crop yields.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h3>Contact Us</h3>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

// NotFound Component for handling unknown routes
const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default App;
