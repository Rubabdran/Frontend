//---------------import--------------//

import React, { useState } from "react";
import {createImage,updateImagePublic,toggleFavorite,} from "../../utilities/api";
import "./GenerateImage.css";
import robot from "../../assets/images/robot3.svg";

//----------------state and functions--------------//
const GenerateImage = ({ token }) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
      setImageUrl(pollinationsUrl);
      const res = await createImage(prompt, pollinationsUrl, false, token);
      setImageId(res.id);
      setShowPopup(true); 
    } catch (err) {
      console.error(err);
      alert("Failed to save image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download image.");
    }
  };

  const handlePublish = async () => {
    if (!imageId) return;
    try {
      await updateImagePublic(imageId, token);
      setIsPublic(true);
      alert("Image published!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async () => {
    if (!imageId) return;
    try {
      await toggleFavorite(imageId, token);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  //------------------------layout--------------//
  return (
    <div className="full-page-wrapper">
      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>

      <div className="generate-container">
        <div className="left-side">
          
          <textarea
            className="prompt-input"
            placeholder="Enter your prompt..."
            rows="5"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        <div className="right-side">
  <div className="robot-section">
    <h2 className="cursor typewriter-animation"> Hello there! What magical image can <br/> i create for you today ? </h2>
  </div>
</div>

<img src={robot} alt="AI Robot" className="robot-img" />
    
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <h3>Generated Image:</h3>
            <img src={imageUrl} alt="Generated" className="generated-img" />
            <div className="button-group">
              <button onClick={handleDownload}>Download</button>
              <button onClick={handleFavorite}>
                {isFavorite ? "Unfavorite" : "Add to Favorite"}
              </button>
              {!isPublic && <button onClick={handlePublish}>Publish</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateImage;
