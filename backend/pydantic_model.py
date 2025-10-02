from pydantic import BaseModel


class ShowListing(BaseModel):
    title: str
    about: str
    country: str
    location: str

    class Config:
        orm_mode = True
