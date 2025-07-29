from fastapi import APIRouter
from Modules import DOMLeadExtractor 

router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

router.get('/')
def Welcome_Message():
    return{"message":"welcome to the DOM Leads Extractor"}


@router.get("/Divs", url = str )
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )
    return {"message": "DOM leads scraped","Results":results}


@router.get("/paragraphs")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )
   
    return {"message": "DOM leads scraped","Results":results}


@router.get("/list_items")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )

    return {"message": "DOM leads scraped","Results":results}


@router.get("/images")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}


@router.get("/extract_from_data_attrs")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_json_ld")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_address")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'divs' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}


