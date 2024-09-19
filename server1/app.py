from flask import Flask, request, render_template, jsonify
from utils.functions import predict_news, predict_news_probability, predict_custom

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/classify", methods=["POST"])
def classify():
    data = request.get_json()
    news = data.get("news", "")
    prediction = predict_news(news)
    return jsonify({"prediction": prediction})


@app.route("/classify-probability", methods=["POST"])
def classifyProbability():
    data = request.get_json()
    news = data.get("news", "")
    prediction = predict_news_probability(news)
    return jsonify({"prediction": prediction})


# @app.route("/custom-classify", methods=["POST"])
# def classifyCustom():
#     data = request.get_json()
#     news = data.get("news", "")
#     prediction = predict_custom(news)
#     return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run(debug=True)
