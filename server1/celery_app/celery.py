from celery import Celery
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = Celery(
    "celery_app",
    broker=os.getenv("CELERY_BROKER_URL"),
    backend=os.getenv("CELERY_BACKEND"),
    include=["celery_app.tasks"],
)


if __name__ == "__main__":
    app.start()
