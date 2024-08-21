const axios = require("axios");

const classify = async (payload) => {
  const { news } = payload;
  if (!news) {
    throw new Error("News is required");
  }
  const response = await axios.post("http://localhost:5000/classify", {
    news,
  });
  return response.data;
};

module.exports = { classify };
