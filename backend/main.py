from fastapi import FastAPI
from router import listings
from database import create_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # kin origins ko allow karna hai
    allow_credentials=True,  # cookies/session tokens allow
    allow_methods=["*"],  # GET, POST, PUT, DELETE sab allow
    allow_headers=["*"],  # custom headers allow
)

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
