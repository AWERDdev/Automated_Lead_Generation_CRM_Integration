from fastapi import APIRouter
from Modules import DOMLeadExtractor 

router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

@router.get('/')
def Welcome_Message():
    return{"message":"welcome to the DOM Leads Extractor"}


@router.get("/Divs/{url}")
async def DOMLEADS( url: str ):
    results = DOMLeadExtractor.scrape_leads(url , extractors = 'divs' , configs = None )
    return {"message": "DOM leads scraped","Results":results}


@router.get("/paragraphs")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'paragraphs' , configs = None )
   
    return {"message": "DOM leads scraped","Results":results}


@router.get("/list_items")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'list_items' , configs = None )

    return {"message": "DOM leads scraped","Results":results}


@router.get("/images")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'images' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}


@router.get("/extract_from_data_attrs")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'data_attrs' , configs = None ,required_attrs = '' )
    
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_json_ld")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'json_ld' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_address")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'address' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_table")
def DOMLEADS():
    results = DOMLeadExtractor.scrape_leads(url = "https://www.yellowpages.com/search?search_terms=coffee&geo_location",extractors = 'tables' , configs = None )
    
    return {"message": "DOM leads scraped","Results":results}


