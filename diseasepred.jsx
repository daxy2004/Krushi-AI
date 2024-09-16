import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./diseasepred.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState(null); // State to hold the uploaded image

  async function generateAnswers() {
    setAnswer("loading..");

    const formData = new FormData();
    formData.append("question", question);
    if (image) {
      formData.append("image", image); // Add image to the request if available
    }

    try {
      const response = await axios({
        url: "https://your-api-url.com/analyze",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAnswer(response.data.answer); // Update this based on your API response format
    } catch (error) {
      console.error("Error generating answers:", error);
      setAnswer("Error occurred while generating answers.");
    }
  }

  return (
    <>
      <div className="diseasepred-container">
        <img src={viteLogo} className="diseasepred-logo" alt="Vite logo" />
        <h1>Chat with the Bot</h1>

        {/* Textarea for inputting the question */}
        <textarea
          className="diseasepred-textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>

        {/* File input for uploading an image */}
        <div className="diseasepred-upload-container">
          <label htmlFor="imageUpload" className="diseasepred-upload-label">
            Upload Image:
          </label>
          <input
            type="file"
            id="imageUpload"
            className="diseasepred-upload-input"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Update image state
          />
        </div>

        {/* Button to generate answers */}
        <div className="diseasepred-button-container">
          <button className="diseasepred-button" onClick={generateAnswers}>
            Generate answers
          </button>
        </div>

        {/* Display answer */}
        <p className="diseasepred-answer">Answer: {answer}</p>
      </div>
    </>
  );
}

export default App;
