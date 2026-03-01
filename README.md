# News Portal with ML Classification Project

This project aims to classify news articles into various categories using a machine learning model. The model uses a Support Vector Machine (SVM) and Naive Bayes for classification, and the text data is processed using techniques such as TF-IDF for feature extraction.

## Features

- **Text Preprocessing:** The news articles are preprocessed to remove stopwords, perform tokenization, and convert text into vector format using TF-IDF.
- **Classification:** SVM & Naive Bayes is used to classify news articles into predefined categories such as business, technology, sports, politics, and entertainment.
- **Real-time Classification:** Input news articles through a user interface and receive immediate classification results.

## Tech Stack

- **Backend:**
  - Python (Celery for executing the ML model function)
  - Custom Model as SVM model, Naive Bayes
- **Frontend:**
  - React.js (News Classification)
  - Next.js (News Portal)
- **Database:**
  - MongoDB for storing classified news articles and conversations
- **Authentication:**
  - Node.js for user authentication
- **Deployment:**
  - EC2 for cloud hosting

## Installation

### Prerequistics

- **Node.js** and npm
- **Python** with **Celery**
- **MongoDB** installed or cloud-hosted
- **Docker**

### Project Setup v3

1. Clone the repository

   ```bash
   git clone https://github.com/nvwns1/News-Classification.git
   cd news-classification
   ```

### Env Setup

1. ML Service (Backend)

   ```bash
   cd backend/ml-service
   cp .env.example .env
   ```

2. Node Service (Backend)

   ```bash
   cd backend/node-api
   cp .env.example .env
   ```

3. News - Portal (Frontend)

   ```bash
   cd frontend/news-portal
   cp .env.example .env
   ```

4. News - Classification (Frontend)

   ```bash
   cd frontend/news-classification
   cp .env.example .env
   ```

5. Redis

   ```bash
   cd redis
   cp .env.example .env
   ```

### Docker Runner

1. Run Redis (Required)

   ```bash
   cd redis
   docker compose up -d
   ```

2. Run Services (Optional)

   ```bash
   docker compose up -d
   ```

### Manual Runner

#### ML service (Celery)

1. Create & activate virtual environment

   ```bash
      cd backend/ml-service 
      python3 -m venv venv     # windows: python -m venv venv
      source venv/bin/activate # windows: venv\Scripts\activate
   ```

2. Install & download required Python libraries:

   ```bash
   pip install -r requirements.txt
   python -m nltk.downloader stopwords punkt wordnet
   ```

3. Run Celery Python

   ```bash
   celery -A celery_app.celery worker --pool=solo -l info
   ```

#### Node Backend

1. Navigate to the Backend folder:

   ```bash
   cd backend/node-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start Node Js Server:

   ```bash
   npm run start
   ```

4. Start Node JS Worker:

   ```bash
   npm run worker
   ```

#### Frontend Setup

##### News Classification (Vite)

1. Navigate to the Frontend folder:

   ```bash
   cd frontend/news-classification
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start React Js:

   ```bash
   npm run build
   npm run start
   ```


##### News Portal (Next.js)

1. Navigate to the Frontend folder:

   ```bash
   cd frontend/news-portal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start Next Js:

   ```bash
   npm run build
   npm run start
   ```

## Contributing

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Make your changes and commit (git commit -m "Add a new feature")
4. Push to the branch (git push origin feature-branch)
5. Open a pull request

## License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.
