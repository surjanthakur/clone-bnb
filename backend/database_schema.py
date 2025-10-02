from sqlmodel import Field, SQLModel


# create listings model
class Listing(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=50, min_length=2)
    about: str = Field(max_length=500, min_length=10)
    country: str
    location: str
