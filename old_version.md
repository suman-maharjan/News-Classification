
### Version 1

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


### Version 2

1. Clone the repository

   ```bash
   git clone https://github.com/nvwns1/News-Classification.git
   cd news-classification
   ```

#### Backend 1 Setup

1. Install required Python libraries:

   ```bash
   pip install -r requirements.txt
   ```

2. Start the Python worker

   ```bash
   cd server1
   celery -A celery_app worker --pool=solo -l info
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
   npm run build
   ```

   ```bash
   npm run start
   ```

5. Start Node Js Worker (Save Conversation):
   ```bash
   npm run worker
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