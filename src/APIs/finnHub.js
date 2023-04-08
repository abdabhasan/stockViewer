import axios from "axios";

const TOKEN = "cglbkhhr01qjg0jhbsb0cglbkhhr01qjg0jhbsbg";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
