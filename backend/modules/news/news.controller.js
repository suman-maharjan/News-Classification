const axios = require("axios");

class NewsController {
  async classify(payload) {
    const { news, type } = payload;
    if (!news) {
      throw new Error("News is required");
    }
    if (type && type == "Probability") {
      const response = await axios.post(
        "http://localhost:5000/classify-probability",
        {
          news,
        }
      );
      return response.data;
    }
    const response = await axios.post("http://localhost:5000/classify", {
      news,
    });
    return response.data;
  }
}
const newsController = new NewsController();
module.exports = newsController;
