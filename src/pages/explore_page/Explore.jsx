
// import React, { useEffect, useState } from "react";
// import { getExploreImages, toggleFavorite, postComment } from "../../utilities/api";
// import "./Explore.css";

// const ExplorePage = () => {
//   const [images, setImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [comments, setComments] = useState({});
//   const [flyingEmojis, setFlyingEmojis] = useState({});
//   const animations = ['flyEmoji1', 'flyEmoji2', 'flyEmoji3'];

//   useEffect(() => {
//     const fetchPublicImages = async () => {
//       try {
//         const data = await getExploreImages();
//         const imageList = data.results ? data.results : data;
//         setImages(imageList);
//       } catch (err) {
//         console.error("Error fetching public images:", err);
//         setError("Failed to load public images.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPublicImages();
//   }, []);

//   const handleFavorite = async (imageId) => {
//     try {
//       await toggleFavorite(imageId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDownload = async (imageUrl, prompt) => {
//     try {
//       const response = await fetch(
//         imageUrl.startsWith("http")
//           ? imageUrl
//           : `http://localhost:8000${imageUrl}`,
//         { mode: "cors" }
//       );
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${prompt?.slice(0, 10) || "generated"}-image.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Failed to download image.");
//     }
//   };

//   const handleEmojiComment = async (imageId, emoji) => {
//     try {
//       setComments((prev) => ({ ...prev, [imageId]: emoji }));
//       await postComment(imageId, emoji);

//       const newEmojis = Array.from({ length: 20 }).map(() => ({
//         emoji,
//         id: Math.random(),
//         x: Math.random() * 90,
//         delay: Math.random() * 0.5,
//       }));

//       setFlyingEmojis((prev) => ({
//         ...prev,
//         [imageId]: [...(prev[imageId] || []), ...newEmojis],
//       }));

//       setTimeout(() => {
//         setFlyingEmojis((prev) => ({
//           ...prev,
//           [imageId]: [],
//         }));
//       }, 2000);
//     } catch (err) {
//       console.error("Failed to post emoji comment:", err);
//       alert("Failed to post comment.");
//     }
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const currentImage = images[currentIndex];

//   return (
//     <div className="explore-container" style={{ padding: "2rem" }}>
//       <div className="split-text-container">
//         <span className="text-part left">Explore&nbsp;</span>
//         <span className="text-part right">&nbsp;Images</span>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : !currentImage ? (
//         <p>No public images found.</p>
//       ) : (
//         <div className="image-card single-view">
//           {flyingEmojis[currentImage.id]?.map((emoji) => (
//             <div
//               key={emoji.id}
//               className="flying-emoji"
//               style={{
//                 position: "absolute",
//                 left: `${emoji.x}%`,
//                 bottom: "0%",
//                 fontSize: "2rem",
//                 animation: `${animations[Math.floor(Math.random() * animations.length)]} 2s ease-out forwards`,
//                 animationDelay: `${emoji.delay}s`,
//                 pointerEvents: "none",
//                 zIndex: 10,
//               }}
//             >
//               {emoji.emoji}
//             </div>
//           ))}
// <div className="div-custom-img">
//           <img  className="custom-img"
//             src={
//               currentImage.image_url.startsWith("http")
//                 ? currentImage.image_url
//                 : `http://localhost:8000${currentImage.image_url}`
//             }
//             alt={currentImage.prompt}
//             style={{
//               width: "80%",
//               height: "auto",
//               borderRadius: "8px",
//               marginBottom: "0.5rem",
//               paddingTop:"20px"
//             }}
//           />
//           </div>
//           <p>
//             {currentImage.prompt}
//           </p>

//           <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "1rem" }}>
//             <button onClick={() => handleFavorite(currentImage.id)} className="custom-button"> Favorite</button>
//             <button onClick={() => handleDownload(currentImage.image_url, currentImage.prompt)} className="custom-button">Download</button>
//           </div>

//           <div style={{ marginTop: "1rem" }}>
//             <p style={{ marginBottom: "0.5rem" }}>Comment with Emoji:</p>
//             {["😀", "😍", "🔥", "😢", "👏", "👍"].map((emoji) => (
//               <button
//                 key={emoji}
//                 onClick={() => handleEmojiComment(currentImage.id, emoji)}
//                 style={{ fontSize: "0.8rem", margin: "0 5px" }}
//                 className="custom-button"
//               >
//                 {emoji}
//               </button>
//             ))}
//             {comments[currentImage.id] && (
//               <p style={{  marginTop: "0.5rem" }}>
//                 {/* add user name */}
//                 {comments[currentImage.id]}
//               </p>
//             )}
//           </div>

//         </div>
//       )}
      
//       <div className="navigation-buttons">
//             <button onClick={handlePrevious}>←</button>
//             <button onClick={handleNext}>→</button>
//           </div>
//     </div>
//   );
// };

// export default ExplorePage;



// import React, { useState, useEffect } from 'react';
// import './Explore.css';
// import { getExploreImages, toggleFavorite } from "../../utilities/api";

// const ExplorePage = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await getExploreImages();
//       const imageList = response.results ? response.results : response;
//       setImages(imageList);
//     } catch (err) {
//       setError('Failed to fetch images');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFavorite = async (imageId) => {
//     try {
//       await toggleFavorite(imageId);
//       setImages(images.map(img =>
//         img.id === imageId ? { ...img, isFavorite: !img.isFavorite } : img
//       ));
//     } catch (err) {
//       console.error('Failed to update favorite status');
//     }
//   };

//   const handleDownload = async (imageUrl, prompt) => {
//     try {
//       const urlToFetch = imageUrl.startsWith("http") ? imageUrl : `http://localhost:8000${imageUrl}`;
//       const response = await fetch(urlToFetch, { mode: 'cors' });
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `image-${prompt?.slice(0, 10) || "download"}.png`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Failed to download image', err);
//       alert('Failed to download image.');
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
      
//     <div className="explore-container">
//       <div className="image-grid">
//         {images.map((image) => (
//           <div key={image.id} className="image-card glass-effect">
//             <div className="card-header">
//               <img 
//                 src={image.image_url.startsWith("http") ? image.image_url : `http://localhost:8000${image.image_url}`}
//                 alt="Generated"
//                 className="grid-image"
//               />
//               <div className="card-title">{image.prompt}</div>
//             </div>
//             <div className="card-body">
//               <div className="image-actions">
//                 <button 
//                   onClick={() => handleFavorite(image.id)}
//                   className={`favorite-btn glass-btn ${image.isFavorite ? 'favorited' : ''}`}
//                 >
//                   {image.isFavorite ? '❤️' : '🤍'}
//                 </button>
//                 <button
//                   onClick={() => handleDownload(image.image_url, image.prompt)}
//                   className="download-btn glass-btn"
//                   aria-label="Download"
//                 >
//                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M10 3V14M10 14L5 9M10 14L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <rect x="3" y="16" width="14" height="2" rx="1" fill="currentColor"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ExplorePage;

import React, { useState, useEffect } from 'react';
import './Explore.css';
import { getExploreImages, toggleFavorite, postComment } from "../../utilities/api";

const ExplorePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [flyingEmojis, setFlyingEmojis] = useState({});
  const animations = ['flyEmoji1', 'flyEmoji2', 'flyEmoji3'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getExploreImages();
      const imageList = response.results ? response.results : response;
      setImages(imageList);
    } catch (err) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (imageId) => {
    try {
      await toggleFavorite(imageId);
      setImages(images.map(img =>
        img.id === imageId ? { ...img, isFavorite: !img.isFavorite } : img
      ));
    } catch (err) {
      console.error('Failed to update favorite status');
    }
  };

  const handleDownload = async (imageUrl, prompt) => {
    try {
      const urlToFetch = imageUrl.startsWith("http") ? imageUrl : `http://localhost:8000${imageUrl}`;
      const response = await fetch(urlToFetch, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `image-${prompt?.slice(0, 10) || "download"}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download image', err);
      alert('Failed to download image.');
    }
  };

  const handleEmojiComment = async (imageId, emoji) => {
    try {
      setComments(prev => ({ ...prev, [imageId]: emoji }));
      await postComment(imageId, emoji);

      const newEmojis = Array.from({ length: 10 }).map(() => ({
        emoji,
        id: Math.random(),
        x: Math.random() * 90,
        delay: Math.random() * 0.5,
      }));

      setFlyingEmojis(prev => ({
        ...prev,
        [imageId]: [...(prev[imageId] || []), ...newEmojis],
      }));

      setTimeout(() => {
        setFlyingEmojis(prev => ({
          ...prev,
          [imageId]: [],
        }));
      }, 2000);
    } catch (err) {
      console.error('Failed to post emoji comment:', err);
      alert('Failed to post comment.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="explore-container">
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card glass-effect" style={{ position: 'relative' }}>
            {flyingEmojis[image.id]?.map((emoji) => (
              <div
                key={emoji.id}
                className="flying-emoji"
                style={{
                  position: 'absolute',
                  left: `${emoji.x}%`,
                  bottom: '0%',
                  fontSize: '2rem',
                  animation: `${animations[Math.floor(Math.random() * animations.length)]} 2s ease-out forwards`,
                  animationDelay: `${emoji.delay}s`,
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                {emoji.emoji}
              </div>
            ))}
            <div className="card-header">
              <img
                src={image.image_url.startsWith("http") ? image.image_url : `http://localhost:8000${image.image_url}`}
                alt="Generated"
                className="grid-image"
              />
              <div className="card-title">{image.prompt}</div>
            </div>
            <div className="card-body">
              <div className="image-actions">
                <button
                  onClick={() => handleFavorite(image.id)}
                  className={`favorite-btn glass-btn ${image.isFavorite ? 'favorited' : ''}`}
                >
                  {image.isFavorite ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={() => handleDownload(image.image_url, image.prompt)}
                  className="download-btn glass-btn"
                  aria-label="Download"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3V14M10 14L5 9M10 14L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="16" width="14" height="2" rx="1" fill="currentColor"/>
                  </svg>
                </button>
              </div>

              <div className="emoji-comments">
                <p style={{ marginTop: "1rem", fontWeight: "bold" }}>React with Emoji:</p>
                {["😀", "😍", "🔥", "😢", "👏", "👍"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiComment(image.id, emoji)}
                    style={{ fontSize: "1.2rem", margin: "0 4px" }}
                    className="glass-btn"
                  >
                    {emoji}
                  </button>
                ))}
                {comments[image.id] && (
                  <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
                    You reacted: {comments[image.id]}
                  </p>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
