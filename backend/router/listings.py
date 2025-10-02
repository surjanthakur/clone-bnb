from fastapi import APIRouter, Depends, HTTPException
from pydantic_model import ShowListing
from database_schema import Listing
from database import get_session
from sqlmodel import Session
import uuid

router = APIRouter(tags=["listings routes"])


@router.post("/listings/create", response_model=ShowListing)
def create_listings(listing: Listing, session=Depends(get_session)):
    listing_id = str(uuid.uuid4())
    new_listing = Listing(
        id=listing_id,
        title=listing.title,
        about=listing.about,
        country=listing.country,
        location=listing.location,
    )
    session.add(new_listing)
    session.commit()
    session.refresh(new_listing)
    return new_listing
