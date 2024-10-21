# News Classification Project

This project aims to classify news articles into various categories using a machine learning model. The model uses a Support Vector Machine (SVM) for classification, and the text data is processed using techniques such as TF-IDF for feature extraction.

## Features

- **Text Preprocessing:** The news articles are preprocessed to remove stopwords, perform tokenization, and convert text into vector format using TF-IDF.
- **Classification:** SVM is used to classify news articles into predefined categories such as business, technology, sports, politics, etc.
- **Real-time Classification:** Input news articles through a user interface and receive immediate classification results.

## Tech Stack

- **Backend:**
  - Python (Flask for deploying the model)
  - Custom Model as SVM model
- **Frontend:**
  - React.js
- **Database:**
  - MongoDB for storing classified news articles and conversations
- **Authentication:**
  - Node.js for user authentication
- **Deployment:**
  - EC2 for cloud hosting

## Installation

### Prerequistics

- **Node.js** and npm
- **Python** with **Flask**
- **MongoDB** installed or cloud-hosted

### Project Setup

1. Clone the repository

   ```bash
   git clone https://github.com/nvwns1/News-Classification.git
   cd news-classification
   ```

#### Backend 1 Setup (Flask)

1. Install required Python libraries:

   ```bash
   pip install -r requirements.txt
   ```

2. Start the Flask server

   ```bash
   cd server1
   python app.py
   ```

#### Backend 2 Setup (Node Js)

1. Navigate to the Backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup env for Node Js Server:

   - Update .env (.env.example included in the folder)

4. Start Node Js Server:

   ```bash
   npm run start
   ```

#### Frontend Setup (React Js)

1. Navigate to the Frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup env for React Js:

   - Update .env (.env.example included in the folder)

4. Start React Js:

   ```bash
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
