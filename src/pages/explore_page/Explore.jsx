// import React, { useEffect, useState } from "react";
// import { getExploreImages, toggleFavorite,postComment } from "../../utilities/api";


// const ExplorePage = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [comments, setComments] = useState({});

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
//     if (!imageId) return;
//         try {
//           await toggleFavorite(imageId, token);
//           setIsFavorite(!isFavorite);
//         } catch (err) {
//           console.error(err);
//         }
//   };

//   const handleDownload = async (imageUrl, prompt) => {
//     try {
//       const response = await fetch(imageUrl.startsWith("http") ? imageUrl : `http://localhost:8000${imageUrl}`, {
//         mode: "cors",
//       });
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
//     } catch (err) {
//       console.error("Failed to post emoji comment:", err);
//       alert("Failed to post comment.");
//     }
//   };

//   return (
//     <div className="explore-container" style={{ padding: "2rem" }}>
//       <h2>🌍 Explore Public Images</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : images.length === 0 ? (
//         <p>No public images found.</p>
//       ) : (
//         <div
//           className="image-grid"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//             gap: "1.5rem",
//             marginTop: "1rem",
//           }}
//         >
//           {images.map((img) => (
//             <div
//               key={img.id}
//               className="image-card"
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 backgroundColor: "#f9f9f9",
//                 padding: "1rem",
//                 boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <img
//                 src={
//                   img.image_url.startsWith("http")
//                     ? img.image_url
//                     : `http://localhost:8000${img.image_url}`
//                 }
//                 alt={img.prompt}
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   borderRadius: "8px",
//                   marginBottom: "0.5rem",
//                 }}
//               />
//               <p><strong>Prompt:</strong> {img.prompt}</p>

//               <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
//                 <button onClick={() => handleFavorite(img.id)}>❤️ Add to Fav</button>
//                 <button onClick={() => handleDownload(img.image_url, img.prompt)}>⬇️ Download</button>
//               </div>

//               <div style={{ marginTop: "1rem" }}>
//                 <p style={{ marginBottom: "0.5rem" }}>💬 Comment with Emoji:</p>
//                 {['😀','😍','🔥','😢','👏','👍'].map((emoji) => (
//                   <button
//                     key={emoji}
//                     onClick={() => handleEmojiComment(img.id, emoji)}
//                     style={{ fontSize: "1.5rem", margin: "0 5px" }}
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//                 {comments[img.id] && <p style={{ marginTop: "0.5rem" }}>Your Comment: {comments[img.id]}</p>}
//               </div>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExplorePage;
import React, { useEffect, useState } from "react";
import { getExploreImages, toggleFavorite, postComment } from "../../utilities/api";
import "./Explore.css";
const ExplorePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState({});
  const [flyingEmojis, setFlyingEmojis] = useState({});
  const animations = ['flyEmoji1', 'flyEmoji2', 'flyEmoji3'];
  useEffect(() => {
    const fetchPublicImages = async () => {
      try {
        const data = await getExploreImages();
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

  const handleFavorite = async (imageId) => {
    try {
      await toggleFavorite(imageId);
      // Optionally refresh or toggle favorite UI
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (imageUrl, prompt) => {
    try {
      const response = await fetch(
        imageUrl.startsWith("http")
          ? imageUrl
          : `http://localhost:8000${imageUrl}`,
        { mode: "cors" }
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${prompt?.slice(0, 10) || "generated"}-image.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download image.");
    }
  };

  const handleEmojiComment = async (imageId, emoji) => {
    try {
      setComments((prev) => ({ ...prev, [imageId]: emoji }));
      await postComment(imageId, emoji);

      const newEmojis = Array.from({ length: 20 }).map(() => ({
        emoji,
        id: Math.random(),
        x: Math.random() * 90,  // random horizontal starting point
        delay: Math.random() * 0.5, // small delay for stagger
      }));

      setFlyingEmojis((prev) => ({
        ...prev,
        [imageId]: [...(prev[imageId] || []), ...newEmojis],
      }));

      setTimeout(() => {
        setFlyingEmojis((prev) => ({
          ...prev,
          [imageId]: [],
        }));
      }, 2000);
    } catch (err) {
      console.error("Failed to post emoji comment:", err);
      alert("Failed to post comment.");
    }
  };

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
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#f9f9f9",
                padding: "1rem",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Flying Emojis */}
              {flyingEmojis[img.id]?.map((emoji) => (
                <div
                key={emoji.id}
                className="flying-emoji"
                style={{
                  position: "absolute",
                  left: `${emoji.x}%`,
                  bottom: "0%",
                  fontSize: "2rem",
                  animation: `${animations[Math.floor(Math.random() * animations.length)]} 2s ease-out forwards`,
                  animationDelay: `${emoji.delay}s`,
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                  {emoji.emoji}
                </div>
              ))}

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
              <p>
                <strong>Prompt:</strong> {img.prompt}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <button onClick={() => handleFavorite(img.id)}>
                  ❤️ Add to Fav
                </button>
                <button
                  onClick={() => handleDownload(img.image_url, img.prompt)}
                >
                  ⬇️ Download
                </button>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p style={{ marginBottom: "0.5rem" }}>💬 Comment with Emoji:</p>
                {["😀", "😍", "🔥", "😢", "👏", "👍"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiComment(img.id, emoji)}
                    style={{ fontSize: "1.5rem", margin: "0 5px" }}
                  >
                    {emoji}
                  </button>
                ))}
                {comments[img.id] && (
                  <p style={{ marginTop: "0.5rem" }}>
                    Your Comment: {comments[img.id]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;