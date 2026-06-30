import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//creates a short URL by calling POST /url
//data = { url, customAlias, expiresInDays }
export const createShortUrl = async (data) => {
  const response = await axios.post(`${API_URL}/url`, data);
  return response.data; // { id, expiresAt }
};

// fetches analytics for a given shortId by calling GET /analytics/:shortId
export const fetchAnalytics = async (shortId) => {
  const response = await axios.get(`${API_URL}/analytics/${shortId}`);
  return response.data; // { totalClicks, firstVisit, lastVisit, clicksToday, analytics }
};
