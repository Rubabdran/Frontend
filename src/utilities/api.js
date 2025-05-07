import sendRequest from "./sendRequest";
const BASE_URL = "http://localhost:8000"; 
const url = "/users/";

//-----------------------user 

export async function signup(formData) {
  try {
    const response = await sendRequest(`${url}signup/`, "POST", formData);
    localStorage.setItem('token', response.access);
    localStorage.setItem('refresh', response.refresh);
    return response.user;
  } catch (err) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    return null;
  }
}

export async function login(formData) {
  try {
    const response = await sendRequest(`${url}login/`, "POST", formData);

    if (response && response.access) {
      localStorage.setItem('token', response.access);
      localStorage.setItem('refresh', response.refresh);
      return response.user;
    } else {
      console.error("Login failed: No access token in response.");
      throw new Error("Login failed: No access token in response.");
    }
  } catch (err) {
    console.error("Login failed:", err);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    throw new Error("Login failed");
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
}

export async function getUser() {
  try {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      const response = await sendRequest(`${url}token/refresh/`, "POST", { refresh });
      localStorage.setItem('token', response.access);
      return response.user;
    }
    return null;
  } catch (err) {
    console.log("Error verifying user:", err);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    return null;
  }
}

//-----------------local storage


export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

//------------------------image

export const hello = async () => {

}

export const createImage = async (prompt, imageUrl, isPublic) => {
  const response = await sendRequest(`/images/`, "POST", {
    prompt,
    image_url: imageUrl,
    is_public: isPublic
  });

  console.log("Image creation response:", response);
  return response;
};


export const updateImagePublic = async (imageId) => {
  const response = await sendRequest(`/images/${imageId}/publish/`,"PUT");

  console.log("Image publish response:", response);
  return response;
};

export const getExploreImages = async () => {
  const response = await sendRequest("/images/explore/", "GET");

  console.log("Explore public images response:", response);
  return response;
};


export const toggleFavorite = async (imageId) => {
  const response = await sendRequest(`/images/${imageId}/favorite/`,"POST");

  console.log("Toggle favorite response:", response);
  return response;
};

export const getFavoriteImages = async () => {
  const response = await sendRequest(`/images/favorites/`, "GET");

  console.log("Favorite images response:", response);
  return response;
};

export async function removeFavoriteImage(imageId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8000/images/favorites/${imageId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to remove favorite image");
  }

  return true;
}

export const postComment = async (imageId, emoji) => {
  const response = await sendRequest(`/images/${imageId}/comments/`, "POST",{emoji:emoji});

  console.log("Explore public images response:", response);
  return response;
};

// import { mockApi } from './mockData';

// // Auth functions
// export const login = async (credentials) => {
//     return mockApi.login(credentials);
// };

// export const register = async (userData) => {
//     return mockApi.register(userData);
// };

// // Image functions
// export const getImages = async () => {
//     return mockApi.getImages();
// };

// export const getImage = async (id) => {
//     return mockApi.getImage(id);
// };

// export const createImage = async (imageData) => {
//     return mockApi.createImage(imageData);
// };

// // User functions
// export const getCurrentUser = async () => {
//     return mockApi.getCurrentUser();
// };

// //-----------------local storage


// export function getAuthHeaders() {
//   const token = localStorage.getItem("token");
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// }

// //------------------------image

// export const hello = async () => {

// }

// export const updateImagePublic = async (imageId) => {
//   const response = await mockApi.updateImagePublic(imageId);

//   console.log("Image publish response:", response);
//   return response;
// };

// export const getExploreImages = async () => {
//   const response = await mockApi.getExploreImages();

//   console.log("Explore public images response:", response);
//   return response;
// };


// export const toggleFavorite = async (imageId) => {
//   const response = await mockApi.toggleFavorite(imageId);

//   console.log("Toggle favorite response:", response);
//   return response;
// };

// export const getFavoriteImages = async () => {
//   const response = await mockApi.getFavoriteImages();

//   console.log("Favorite images response:", response);
//   return response;
// };

// export async function removeFavoriteImage(imageId) {
//   const token = localStorage.getItem("token");
//   const response = await fetch(`http://localhost:8000/images/favorites/${imageId}/`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || "Failed to remove favorite image");
//   }

//   return true;
// }

// export const postComment = async (imageId, emoji) => {
//   const response = await mockApi.postComment(imageId, emoji);

//   console.log("Explore public images response:", response);
//   return response;
// };

