import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-51-20-117-99.eu-north-1.compute.amazonaws.com:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
