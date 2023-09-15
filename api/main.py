from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from db import models
from db.database import engine
from routers import user, post, comment
from auth import authentication
from dotenv import load_dotenv
import os


load_dotenv()  # Loads environment variables from .env file


app = FastAPI()


app.include_router(user.router)
app.include_router(post.router)
app.include_router(comment.router)
app.include_router(authentication.router)


@app.get("/")
def root():
    return "hello world"


origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/info")
async def info():
    return {
        "app_name": os.environ.get("APP_NAME"),
        "admin_email": os.environ.get("ADMIN_EMAIL"),
        "items_per_user": os.environ.get("ITEMS_PER_USER"),
    }


models.Base.metadata.create_all(engine)

app.mount("/images", StaticFiles(directory="images"), name="images")
