from fastapi import APIRouter
from Modules import DOMLeadExtractor 
from pydantic import BaseModel
from Models import genConfig , DivExtractorConfig, ParagraphExtractorConfig, ListItemExtractorConfig, extract_from_tablesConfig, extract_from_imagesConfig, extract_from_data_attrsConfig, extract_from_json_ldConfig, extract_from_addressConfig

router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

@router.get('/')
def Welcome_Message():
    return{"message":"welcome to the DOM Leads Extractor"}


@router.post("/config/{url}")
async def DOMLEADS( url: str , config:genConfig ):
    results = DOMLeadExtractor.scrape_leads(url , configs = config )
    print(f"results from the scraper {results}")
    return {"message": "DOM leads scraped","Results":results}


@router.post("/divs/{url}")
def DOMLEADS(url:str , config:DivExtractorConfig  ):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name ,element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
   
    return {"message": "DOM leads scraped","Results":results}

@router.get("/paragraphs/{url}")
def DOMLEADS(url:str , config:ParagraphExtractorConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , element_class = config.element_class, patterns = config.patterns, fields = config.fields)
   
    return {"message": "DOM leads scraped","Results":results}


@router.get("/list_items/{url}")
def DOMLEADS(url:str , config:ListItemExtractorConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , element_class = config.element_class, item_element = config.item_element, fields = config.fields)

    return {"message": "DOM leads scraped","Results":results}


@router.get("/images/{url}")
def DOMLEADS(url:str , config:extract_from_imagesConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , element_class = config.element_class, image_element = config.image_element, caption_element = config.caption_element ,fields = config.fields)
    return {"message": "DOM leads scraped","Results":results}


@router.get("/extract_from_data_attrs/{url}")
def DOMLEADS(url:str , config:extract_from_data_attrsConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , element_class = config.element_class, required_attrs = config.required_attrs, attributes = config.attributes)
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_json_ld/{url}")
def DOMLEADS(url:str , config:extract_from_json_ldConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , type_attr = config.type_attr, schema_type = config.schema_type, fields = config.fields)
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_address/{url}")
def DOMLEADS(url:str , config:extract_from_addressConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , element_class = config.element_class, source_element = config.source_element, source_class = config.source_class ,fields = config.fields ,patterns = config.patterns)
    return {"message": "DOM leads scraped","Results":results}

@router.get("/extract_from_table/{url}")
def DOMLEADS(url:str , config:extract_from_tablesConfig):
    soup = DOMLeadExtractor.get_soup(url)
    results = DOMLeadExtractor.extract_from_divs(soup,element_name = config.element_name , element_class = config.element_class, row_element = config.row_element, cell_element = config.cell_element , header_rows = config.header_rows)
    return {"message": "DOM leads scraped","Results":results}


