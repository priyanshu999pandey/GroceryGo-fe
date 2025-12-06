// src/api/Axios.js
import axios from "axios";

// ✅ Create axios instance
const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 🔹 Apna backend base URL yahan likho
  withCredentials: true, // agar backend cookies bhejta hai to use true rakho
});

// ✅ Request Interceptor
Axios.interceptors.request.use(
  (config) => {
    // 1️⃣ Access token get karo localStorage se
    const token = localStorage.getItem("accessToken");

    // 2️⃣ Agar token mila, to request ke headers me attach karo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3️⃣ Config return karo (important)
    return config;
  },
  (error) => {
    // Agar request bhejne se pehle error mila
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use((response)=>{ return response},
 async(error)=>{
    let originRequest = error.config

    if(error.response.status ===401 && !originRequest.retry){
        originRequest.retry = true

        const refreshToken = localStorage.getItem("refreshToken")

        if(refreshToken){
            const newAccessToken = await refreshAccessToken(refreshToken);

            if(newAccessToken){
                originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return Axios(originRequest)
            }
        }
    }

    return Promise.reject(error)
 }
)

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios.put("http://localhost:8080/api/user/refresh-token",{},                      // PUT body empty — backend sirf header/cookie se token read karega
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true, // cookie bhejne ke liye zaroori
      }
    );

    // Backend agar naya access token return karta hai (agar karta ho)
    const accessToken = response?.data?.accessToken;

    if (accessToken) {
      // Save in localStorage for next API calls
      localStorage.setItem("accessToken", accessToken);
    }

    return accessToken;
  } catch (error) {
    console.log("Error while refreshing token:", error);
    return null;
  }
};

// ✅ Export axios instance
export default Axios;
