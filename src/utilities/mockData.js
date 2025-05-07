// Use local image for all mock images
const localImage = "/src/assets/images/image.png";

// Mock data for the application
export const mockData = {
  // Mock user data
  user: {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    profile_picture: localImage
  },

  // Mock images data
  images: [
    {
      id: 1,
      prompt: "A serene Japanese garden with cherry blossoms and a small pond",
      image_url: localImage,
      is_public: true,
      is_favorite: false,
      user_id: 1,
      created_at: "2024-03-15T10:30:00Z",
      comments: [
        { id: 1, emoji: "😍", user: { id: 2, username: "user2" } },
        { id: 2, emoji: "👍", user: { id: 3, username: "user3" } }
      ]
    },
    {
      id: 2,
      prompt: "A futuristic cityscape with flying cars and neon lights",
      image_url: localImage,
      is_public: true,
      is_favorite: true,
      user_id: 2,
      created_at: "2024-03-14T15:45:00Z",
      comments: [
        { id: 3, emoji: "🌊", user: { id: 1, username: "testuser" } }
      ]
    },
    {
      id: 3,
      prompt: "A magical forest with glowing mushrooms and fairy lights",
      image_url: localImage,
      is_public: false,
      is_favorite: false,
      user_id: 1,
      created_at: "2024-03-13T09:15:00Z",
      comments: []
    }
  ],

  // Mock authentication responses
  auth: {
    login: {
      access: "mock_access_token",
      refresh: "mock_refresh_token",
      user: {
        id: 1,
        username: "testuser",
        email: "test@example.com"
      }
    },
    register: {
      user: {
        id: 1,
        username: "newuser",
        email: "new@example.com"
      }
    }
  }
};

// Mock API functions
export const mockApi = {
  // Auth functions
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.auth.login;
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.auth.register;
  },

  // Image functions
  getImages: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockData.images;
  },

  getImage: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.images.find(img => img.id === parseInt(id));
  },

  createImage: async (imageData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newImage = {
      id: mockData.images.length + 1,
      ...imageData,
      created_at: new Date().toISOString(),
      is_public: false,
      is_favorite: false,
      comments: [],
      user_id: mockData.user.id
    };
    mockData.images.unshift(newImage);
    return newImage;
  },

  // User functions
  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.user;
  },

  // Additional image functions
  updateImagePublic: async (imageId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const image = mockData.images.find(img => img.id === parseInt(imageId));
    if (image) {
      image.is_public = !image.is_public;
    }
    return image;
  },

  getExploreImages: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      results: mockData.images.filter(img => img.is_public),
      count: mockData.images.filter(img => img.is_public).length
    };
  },

  toggleFavorite: async (imageId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const image = mockData.images.find(img => img.id === parseInt(imageId));
    if (image) {
      image.is_favorite = !image.is_favorite;
    }
    return image;
  },

  getFavoriteImages: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockData.images.filter(img => img.is_favorite);
  },

  postComment: async (imageId, emoji) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const image = mockData.images.find(img => img.id === parseInt(imageId));
    if (image) {
      const newComment = {
        id: image.comments.length + 1,
        emoji,
        user: mockData.user
      };
      image.comments.push(newComment);
    }
    return image;
  }
};

// Export mockImages as an alias to mockData.images for backward compatibility
export const mockImages = mockData.images;

// Mock user data
export const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
  },
];

// Mock images data
export const mockImagesData = [
  {
    id: 1,
    prompt: "A serene Japanese garden with cherry blossoms and a small pond",
    image_url: localImage,
    is_public: true,
    user_id: 1,
    created_at: "2024-03-15T10:00:00Z",
  },
  {
    id: 2,
    prompt: "A futuristic cityscape with flying cars and neon lights",
    image_url: localImage,
    is_public: true,
    user_id: 2,
    created_at: "2024-03-15T11:00:00Z",
  },
  {
    id: 3,
    prompt: "A magical forest with glowing mushrooms and fairy lights",
    image_url: localImage,
    is_public: true,
    user_id: 1,
    created_at: "2024-03-15T12:00:00Z",
  },
  {
    id: 4,
    prompt: "An underwater scene with bioluminescent creatures",
    image_url: localImage,
    is_public: true,
    user_id: 2,
    created_at: "2024-03-15T13:00:00Z",
  },
  {
    id: 5,
    prompt: "A steampunk-inspired mechanical dragon",
    image_url: localImage,
    is_public: true,
    user_id: 1,
    created_at: "2024-03-15T14:00:00Z",
  },
  {
    id: 6,
    prompt: "A cozy cafe interior with vintage decor and warm lighting",
    image_url: localImage,
    is_public: true,
    user_id: 2,
    created_at: "2024-03-15T15:00:00Z",
  },
  {
    id: 7,
    prompt: "A cosmic scene with swirling galaxies and nebulae",
    image_url: localImage,
    is_public: true,
    user_id: 1,
    created_at: "2024-03-15T16:00:00Z",
  },
  {
    id: 8,
    prompt: "An ancient temple hidden in misty mountains",
    image_url: localImage,
    is_public: true,
    user_id: 2,
    created_at: "2024-03-15T17:00:00Z",
  },
  {
    id: 9,
    prompt: "A cyberpunk street market at night",
    image_url: localImage,
    is_public: true,
    user_id: 1,
    created_at: "2024-03-15T18:00:00Z",
  },
  {
    id: 10,
    prompt: "A whimsical treehouse village connected by rope bridges",
    image_url: localImage,
    is_public: true,
    user_id: 2,
    created_at: "2024-03-15T19:00:00Z",
  },
  {
    id: 11,
    prompt: "A crystal cave with glowing formations",
    image_url: localImage,
    is_public: true,
    user_id: 1,
    created_at: "2024-03-15T20:00:00Z",
  },
  {
    id: 12,
    prompt: "A desert oasis with palm trees and a mirage",
    image_url: localImage,
    is_public: true,
    user_id: 2,
    created_at: "2024-03-15T21:00:00Z",
  }
];

// Mock authentication responses
export const mockAuthResponses = {
  login: {
    token: "mock-jwt-token",
    user: mockUsers[0],
  },
  signup: {
    token: "mock-jwt-token",
    user: mockUsers[1],
  },
};

// Mock API functions
export const mockAPI = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockAuthResponses.login;
  },

  signup: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockAuthResponses.signup;
  },

  getCurrentUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUsers[0];
  },

  getExploreImages: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      results: mockImagesData.filter(img => img.is_public),
      count: mockImagesData.filter(img => img.is_public).length
    };
  },

  getFavoriteImages: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockImagesData.slice(0, 3); // Return first 3 images as favorites
  },

  createImage: async (prompt, imageUrl, isPublic) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newImage = {
      id: mockImagesData.length + 1,
      prompt,
      image_url: imageUrl,
      is_public: isPublic,
      user_id: 1,
      created_at: new Date().toISOString(),
    };
    mockImagesData.push(newImage);
    return newImage;
  },

  toggleFavorite: async (imageId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },

  postComment: async (imageId, comment) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },

  updateImagePublic: async (imageId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const image = mockImagesData.find(img => img.id === imageId);
    if (image) {
      image.is_public = true;
    }
    return { success: true };
  },

  removeFavoriteImage: async (imageId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  }
}; 