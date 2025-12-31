import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.raghavm.dev",
  headers: {
    "Content-Type": "application/json",
  },
});
