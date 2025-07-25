from fastapi import APIRouter
from Modules import DOMLeadExtractor 

router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

@router.get("/DOMleadElements")
def DOMLEADS():
    soup = DOMLeadExtractor.get_soup(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location")
    results = DOMLeadExtractor.extract_from_business_divs(soup)
    return {"message": "DOM leads scraped","Results":results}

