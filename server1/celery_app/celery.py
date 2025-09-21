from celery import Celery
import os
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"

app = Celery(
    "celery_app",
    broker=os.getenv("CELERY_BROKER_URL"),
    backend=os.getenv("CELERY_BACKEND"),
    include=["celery_app.tasks"],
)


if __name__ == "__main__":
    app.start()
