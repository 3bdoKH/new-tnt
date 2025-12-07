const API_BASE_URL = "https://alhaithamdoors.online.winchmohamedbahr.com/api";

// Helper function to convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Articles API functions
export const articlesAPI = {
  // Get all articles
  getAllArticles: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.published !== undefined)
        queryParams.append("published", params.published);
      if (params.author) queryParams.append("author", params.author);
      if (params.search) queryParams.append("search", params.search);

      const url = `${API_BASE_URL}/articles${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // Get single article by ID
  getArticleById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },

  // Create new article
  createArticle: async (articleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  // Update article
  updateArticle: async (id, articleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },

  // Delete article
  deleteArticle: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },

  // Add section to article
  addSectionToArticle: async (articleId, sectionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${articleId}/sections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sectionData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding section to article:", error);
      throw error;
    }
  },
};

// Parts API functions
export const partsAPI = {
  // Get all parts
  getAllParts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/parts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching parts:", error);
      throw error;
    }
  },

  // Get single part by ID
  getPartById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parts/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching part:", error);
      throw error;
    }
  },

  // Create new part
  createPart: async (partData) => {
    try {
      console.log("=== SENDING PART DATA ===");
      console.log("Part data to send:", {
        name: partData.name,
        price: partData.price,
        priceAsNumber: Number(partData.price),
        description: partData.description ? "provided" : "missing",
        brand: partData.brand,
        model: partData.model,
        status: partData.status,
        image: partData.image
          ? `base64 image (length: ${partData.image.length})`
          : null,
      });

      // Validate data before sending
      if (!partData.name?.trim()) {
        throw new Error("Part name is required");
      }
      if (!partData.price || isNaN(Number(partData.price))) {
        throw new Error("Valid price is required");
      }
      if (!partData.description?.trim()) {
        throw new Error("Description is required");
      }
      if (!partData.brand?.trim()) {
        throw new Error("Brand is required");
      }
      if (!partData.model?.trim()) {
        throw new Error("Model is required");
      }

      const requestBody = {
        name: partData.name.trim(),
        price: Number(partData.price),
        description: partData.description.trim(),
        brand: partData.brand.trim(),
        model: partData.model.trim(),
        status: partData.status || "new",
        image: partData.image || null,
      };

      console.log("Request body prepared, sending...");

      const response = await fetch(`${API_BASE_URL}/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", {
        contentType: response.headers.get("content-type"),
        contentLength: response.headers.get("content-length"),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        throw new Error(
          `Server returned invalid JSON (status ${response.status})`
        );
      }

      console.log("Response data:", data);

      if (!response.ok) {
        console.error("Server error response:", data);
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("=== ERROR CREATING PART ===");
      console.error("Error:", error);
      throw error;
    }
  },

  // Update part
  updatePart: async (id, partData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...partData,
          price: Number(partData.price),
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating part:", error);
      throw error;
    }
  },

  // Delete part
  deletePart: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting part:", error);
      throw error;
    }
  },
};

// Videos API functions
export const videosAPI = {
  // Get all videos
  getAllVideos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

  // Create new video with URL
  createVideo: async (videoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating video:", error);
      throw error;
    }
  },

  // Upload video file (stored in database)
  uploadVideo: async (videoFile, title, description) => {
    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("title", title);
      formData.append("description", description || "");

      const response = await fetch(`${API_BASE_URL}/videos/upload`, {
        method: "POST",
        // No Content-Type header - browser will set it with the correct boundary
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  },

  // Update video
  updateVideo: async (id, videoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating video:", error);
      throw error;
    }
  },

  // Delete video
  deleteVideo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  },
};
