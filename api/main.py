from fastapi import FastAPI, Depends
from db import models
from db.database import engine
from routers import user, post
from fastapi.staticfiles import StaticFiles
from auth import authentication


app = FastAPI()


app.include_router(user.router)
app.include_router(post.router)
app.include_router(authentication.router)


@app.get("/")
def root():
    return "hello world"


# @app.get("/info")
# async def info():
#     return {
#         "app_name": settings.app_name,
#         "admin_email": settings.admin_email,
#         "items_per_user": settings.items_per_user,
#         "secret_key": settings.ACCESS_TOKEN_SECRET_KEY,
#     }


models.Base.metadata.create_all(engine)

app.mount("/images", StaticFiles(directory="images"), name="images")
