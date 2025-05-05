import React, { useEffect, useState } from "react";
import { getFavoriteImages } from "../../utilities/api";

const FavoritesPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteImages();
        setImages(data || []);
      } catch (err) {
        console.error("Failed to fetch favorite images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">My Favorite Images</h1>
      {images.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorite images.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="border rounded-2xl shadow-md p-3 bg-white"
            >
              <img
                src={image.image_url}
                alt={image.prompt}
                className="w-full h-64 object-cover rounded-xl mb-2"
              />
              <p className="text-sm text-gray-700 text-center">{image.prompt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
