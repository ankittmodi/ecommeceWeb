import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// POST requests
export const postData = async (url, formData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("POST error:", err);
    return { error: true, message: err.message }; // ✅ always return object
  }
};

// GET requests
export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params={
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.get(apiUrl + url,params);

    return data;
  } catch (err) {
    console.error("GET error:", err);

    // ensure we always return a consistent object
    return {
      error: true,
      message: err.response?.data?.message || err.message || "Request failed",
    };
  }
};
