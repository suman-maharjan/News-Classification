from .celery import app
from utils.NewsClassifier import classifier


@app.task
def classify(news):
    result = classifier.predict_news(news)
    return {"prediction": result}


@app.task
def probability(news):
    result = classifier.predict_news_probability(news)
    return {"prediction": result}
