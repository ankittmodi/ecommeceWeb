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

    const { data } = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err) {
    console.error("GET error:", err);

    return {
      error: true,
      message: err.response?.data?.message || err.message || "Request failed",
    };
  }
};


// for image upload
export const uploadImage=async(url,formData)=>{
  const token = localStorage.getItem("accessToken");
  const params={
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
    var response;
  await axios.put(apiUrl+url,formData,params).then((res)=>{
    console.log(res);
    response=res;
  })
  return response;
}

// for edit user data
export const editData=async(url,updatedData)=>{
  const token = localStorage.getItem("accessToken");
  const params={
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    var response;
  await axios.put(apiUrl+url,updatedData,params).then((res)=>{
    console.log(res);
    response=res;
  })
  return response;
}

export const deleteImage=async(url)=>{
  const token = localStorage.getItem("accessToken");
  const params={
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  const{res}=await axios.delete(apiUrl+url,params)
  return res;
}

export const deleteData=async(url)=>{
  const token = localStorage.getItem("accessToken");
  const params={
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  const{res}=await axios.delete(apiUrl+url,params)
  return res;
}