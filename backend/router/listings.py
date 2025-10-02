from fastapi import APIRouter, Depends, HTTPException
from pydantic_model import ShowListing
from database_schema import Listing
from database import get_session
from sqlmodel import Session
import uuid

router = APIRouter(tags=["listings routes"])


# get all routes
@router.get("/listings")
def all_listings(session_db: Session = Depends(get_session)):
    try:
        all_listing = session_db.query(Listing).all()
        return all_listing
    except Exception as err:
        raise HTTPException(status_code=404, detail=f"listings not found {err} !")


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


# get listing by id
@router.get("/listings/{id}")
def get_listing(
    id: str,
    session_db: Session = Depends(get_session),
):
    try:
        listing_byid = session_db.get(Listing, id)
        return listing_byid
    except Exception as err:
        raise HTTPException(status_code=404, detail=f"listing not found {err} !")


# update listing by id
@router.put("/listings/{id}/update", response_model=ShowListing)
def update_listings(
    id: str,
    listing: ShowListing,
    session_db: Session = Depends(get_session),
):
    try:
        db_listing = session_db.get(Listing, id)
        if not db_listing or db_listing is None:
            raise HTTPException(status_code=404, detail="Listing not found !")
        update_data = listing.dict(exclude_unset=True)
        for k, v in update_data.items():
            setattr(db_listing, k, v)
        session_db.commit()
        session_db.refresh(db_listing)
        return db_listing
    except Exception as err:
        raise HTTPException(status_code=404, detail=f"listing not update {err} !")


# delete listing by id
@router.delete("/listings/{id}/delete")
def delete_listings(
    id: str,
    session_db: Session = Depends(get_session),
):
    try:
        del_listing = session_db.get(Listing, id)
        if not del_listing:
            raise HTTPException(status_code=404, detail="listing not found !")
        session_db.delete(del_listing)
        session_db.commit()
        return del_listing
    except Exception as err:
        raise HTTPException(status_code=404, detail=f"listing not delete {err} !")
