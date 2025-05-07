
// import React, { useEffect, useState } from "react";
// import { getFavoriteImages, removeFavoriteImage } from "../../utilities/api";
// import "./FavoritesPage.css";

// const FavoritesPage = ({ token }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const data = await getFavoriteImages(token);
//         setImages(data || []);
//       } catch (err) {
//         console.error("Failed to fetch favorite images:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, [token]);

//   const handleDownload = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "favorite-image.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Download failed:", err);
//     }
//   };

//   const handleRemoveFavorite = async (imageId) => {
//     try {
//       await removeFavoriteImage(imageId, token);
//       setImages((prev) => prev.filter((img) => img.id !== imageId));
//     } catch (err) {
//       console.error("Failed to remove from favorites:", err);
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;

//   return (
//     <div className="favorites-container">
//       {/* <h1 className="favorites-title">My Favorite Images</h1> */}
//       <div class="split-text-container" style={{marginBottom:'30px'}}>
//     <span class="text-part left">My &nbsp;Favorite </span>
//     <span> </span>
//     <span class="text-part right"> &nbsp; Images</span>
// </div>
//       {images.length === 0 ? (
//         <p className="no-favorites">You have no favorite images.</p>
//       ) : (
//         <div className="favorites-scroll">
//           {images.map((image, index) => {
//             const gradientClasses = [
//               "card-yellow",
//               "card-orange",
//               "card-pink",
//               "card-blue",
//             ];
//             const gradientClass = gradientClasses[index % gradientClasses.length];

//             return (
//               <div key={image.id} className={`favorite-card ${gradientClass}`}>
//                 <img
//                   src={image.image_url}
//                   alt={image.prompt}
//                   className="favorite-image"
//                 />
//                 <p className="favorite-prompt">{image.prompt}</p>
//                 <div className="button-group">
//                   <button
//                     onClick={() => handleDownload(image.image_url)}
//                     className="btn fancy-btn"
//                   >
//                     Download
//                   </button>
//                   <button
//                     onClick={() => handleRemoveFavorite(image.id)}
//                     className="btn fancy-btn remove"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FavoritesPage;

import React, { useEffect, useState } from "react";
import { getFavoriteImages, removeFavoriteImage } from "../../utilities/api";
import "./FavoritesPage.css";

const FavoritesPage = ({ token }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteImages(token);
        setImages(data || []);
      } catch (err) {
        console.error("Failed to fetch favorite images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "favorite-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleRemoveFavorite = async (imageId) => {
    try {
      await removeFavoriteImage(imageId, token);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error("Failed to remove from favorites:", err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="favorites-container">
      {images.length === 0 ? (
        <p className="no-favorites">You have no favorite images.</p>
      ) : (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-card glass-effect">
              <div className="card-header">
                <img
                  src={image.image_url}
                  alt="Favorite"
                  className="grid-image"
                />
                <div className="card-title">{image.prompt}</div>
              </div>
              <div className="card-body">
                <div className="image-actions">
                  <button
                    onClick={() => handleDownload(image.image_url)}
                    className="download-btn glass-btn"
                    aria-label="Download"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3V14M10 14L5 9M10 14L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="16" width="14" height="2" rx="1" fill="currentColor"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(image.id)}
                    className="remove-btn glass-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
