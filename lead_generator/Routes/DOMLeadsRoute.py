from fastapi import APIRouter
from Modules import DOMLeadExtractor 
from pydantic import BaseModel

class eleconfigs(BaseModel):
    element_class:str | None = None
    source_element:str | None = None
    source_class:str | None = None
    element_name:str | None = None
    fields:str | None = None
    row_element:str | None = None
    cell_element:str | None = None
    header_rows:str | None = None
    patterns:str | None = None
    item_element:str | None = None
    image_element:str | None = None
    caption_element:str | None = None
    required_attrs:str | None = None
    attributes:str | None = None
    extractors:str | None = None


router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

@router.get('/')
def Welcome_Message():
    return{"message":"welcome to the DOM Leads Extractor"}


@router.post("/config/{url}")
async def DOMLEADS( url: str , config:eleconfigs ):
    results = DOMLeadExtractor.scrape_leads(url , configs = config )
    print(f"results from the scraper {results}")
    return {"message": "DOM leads scraped","Results":results}


@router.post("/divs/{url}")
def DOMLEADS(url:str , config:eleconfigs  ):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
   
    return {"message": "DOM leads scraped","Results":results}

@router.get("/paragraphs/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
   
    return {"message": "DOM leads scraped","Results":results}


@router.get("/list_items/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)

    return {"message": "DOM leads scraped","Results":results}


@router.get("/images/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
    return {"message": "DOM leads scraped","Results":results}


@router.get("/extract_from_data_attrs/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_json_ld/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_address/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_table/{url}")
def DOMLEADS(url:str , config:eleconfigs):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup, element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
    return {"message": "DOM leads scraped","Results":results}


