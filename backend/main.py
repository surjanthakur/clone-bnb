from fastapi import FastAPI
from router import listings, users
from database import create_db

app = FastAPI()

# listings router
app.include_router(listings.router)


# create database
@app.on_event("startup")
def on_startup():
    try:
        create_db()
        print("db is connected ✅")
    except Exception as err:
        print(f"cannot connect to database: {err}")
