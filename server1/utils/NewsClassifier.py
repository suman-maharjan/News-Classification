from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

import joblib


class NewsClassifier:
    def __init__(self):
        # Load the pre-trained model
        self.svmModel = joblib.load("model/svm.pkl")
        self.tdifModel = joblib.load("model/tfidf.pkl")

        # Categories for Classification
        self.categories = [
            "Business",
            "Entertainment",
            "Politics",
            "Sport",
            "Technology",
        ]

        # Stop words and lemmatizer initialized once
        self.stop_words = set(stopwords.words("english"))
        self.lemmatizer = WordNetLemmatizer()

    def preprocess_text(self, text):
        text = str(text).lower()  # Lowercasing

        # Tokenizing text
        word_tokens = word_tokenize(text)

        # Removing Stop words
        filtered_list = [w for w in word_tokens if not w in self.stop_words]

        # Remove numbers and special Symbols
        filtered_list = [w for w in filtered_list if w.isalnum() and not w.isdigit()]

        # Lemmatizing the text
        lemmatized_list = [
            self.lemmatizer.lemmatize(w, wordnet.VERB) for w in filtered_list
        ]

        # Returning the processed text as a string
        return " ".join(lemmatized_list)

    def predict_news(self, news):
        # Preprocess the input news
        news = self.preprocess_text(news)

        # Transform the news using the TF-IDF model
        news_vector = self.tdifModel.transform([news]).toarray()

        # Predict the category using the SVM model
        prediction = self.svmModel.predict(news_vector)

        print(prediction)

        # Return the corresponding category
        return self.categories[prediction[0]]

    def predict_news_probability(self, news):
        # Preprocess the input news
        news = self.preprocess_text(news)

        # Transform the news using the TF-IDF model
        news_vector = self.tdifModel.transform([news]).toarray()

        # Get the probability estimates for each category
        probabilities = self.svmModel.predict_proba(news_vector)[0]

        # Create a string with category names and corresponding probabilities
        category_probabilities_str = ", ".join(
            [
                f"{self.categories[i]}: {probabilities[i] * 100:.2f}%"
                for i in range(len(self.categories))
            ]
        )

        return category_probabilities_str


classifier = NewsClassifier()
