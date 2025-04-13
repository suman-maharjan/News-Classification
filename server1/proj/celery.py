from celery import Celery
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = Celery(
    "proj",
    broker=os.getenv("CELERY_BROKER_URL"),
    backend=os.getenv("CELERY_BACKEND"),
    include=["proj.tasks"],
)


# app.autodiscover_tasks(["proj.tasks"])  # Automatically discover tasks in 'proj.tasks'

if __name__ == "__main__":
    app.start()
