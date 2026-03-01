# Use the official Python image from the Docker Hub
FROM python:3.9.18-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV NLTK_DATA=/root/nltk_data

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt && pip cache purge

# Install NLTK data for stopwords and punkt wordnet
RUN python -m nltk.downloader stopwords punkt wordnet

# Copy the rest of your application code into the container
COPY . .

# Use exec form for proper signal handling
CMD ["celery", "-A", "celery_app.celery", "worker", "--pool=solo", "-l", "info"]
