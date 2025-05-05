import React, { useEffect, useState } from "react";
import { getExploreImages } from "../../utilities/api";

const ExplorePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicImages = async () => {
      try {
        const data = await getExploreImages();
        console.log("Fetched explore images:", data);

        // Handle both paginated and direct list responses
        const imageList = data.results ? data.results : data;

        setImages(imageList);
      } catch (err) {
        console.error("Error fetching public images:", err);
        setError("Failed to load public images.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicImages();
  }, []);

  return (
    <div className="explore-container" style={{ padding: "2rem" }}>
      <h2>🌍 Explore Public Images</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : images.length === 0 ? (
        <p>No public images found.</p>
      ) : (
        <div
          className="image-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="image-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#f9f9f9",
                padding: "1rem",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={
                  img.image_url.startsWith("http")
                    ? img.image_url
                    : `http://localhost:8000${img.image_url}`
                }
                alt={img.prompt}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                }}
              />
              <p><strong>Prompt:</strong> {img.prompt}</p>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                Created by user ID: {img.user}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
