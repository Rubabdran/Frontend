
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
