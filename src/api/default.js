import axios from "axios";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;

// TODO remove the use of mock data before a release day if necessary
const useMockData = import.meta.env.VITE_APP_USE_MOCK_DATA === "true";

export {useMockData}

export default axios.create({
  baseURL: baseApiUrl,
  headers: {"Content-Type": "application/json"   }
})
