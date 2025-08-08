from fastapi import APIRouter , Body
from Modules.DOMLeadExtractor import scrape_leads, get_soup, extract_from_divs, extract_from_tables, extract_from_list_items, extract_from_data_attrs, extract_from_json_ld, extract_from_images, extract_from_address, extract_from_paragraphs
# from pydantic import BaseModel
from ClassModels.DOMExtractorClassModels import genConfig , DivExtractorConfig, ParagraphExtractorConfig, ListItemExtractorConfig, extract_from_tablesConfig, extract_from_imagesConfig, extract_from_data_attrsConfig, extract_from_json_ld, extract_from_addressConfig

router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

@router.get('/')
def Welcome_Message():
    return{"message":"welcome to the DOM Leads Extractor"}


@router.post("/config")
async def DOMLEADS( url:str = Body(...) , config:genConfig = Body(...) ):
    # Convert Pydantic model to dictionary
    config_dict = config.dict()
    results = scrape_leads(url , configs = config_dict )
    print(f"results from the scraper configed  {results}")
    return {"message": "DOM leads scraped","Results":results}


@router.post("/divs")
def DOMLEADS(url:str = Body(...) , config:DivExtractorConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_divs(soup,element_name = config.element_name ,element_class = config.element_class, source_element = config.source_element, source_class = config.source_class)
    print(f"results from the Div scraper {results}")
    return {"message": "DOM leads scraped","Results":results}

@router.post("/paragraphs")
def DOMLEADS(url:str = Body(...) , config:ParagraphExtractorConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_paragraphs(soup,element_name = config.element_name , element_class = config.element_class, patterns = config.patterns, fields = config.fields)
    print(f"results from the paragraphs scraper {results}")
    return {"message": "DOM leads scraped","Results":results}


@router.post("/list_items")
def DOMLEADS(url:str = Body(...) , config:ListItemExtractorConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_list_items(soup,element_name = config.element_name , element_class = config.element_class, item_element = config.item_element, fields = config.fields)
    print(f"results from the list scraper {results}")
    return {"message": "DOM leads scraped","Results":results}


@router.post("/images")
def DOMLEADS(url:str = Body(...) , config:extract_from_imagesConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_images(soup,element_name = config.element_name , element_class = config.element_class, image_element = config.image_element, caption_element = config.caption_element ,fields = config.fields)
    print(f"results from the Images scraper {results}")
    return {"message": "DOM leads scraped","Results":results}


@router.post("/extract_from_data_attrs")
def DOMLEADS(url:str = Body(...) , config:extract_from_data_attrsConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_data_attrs(soup,element_name = config.element_name , element_class = config.element_class, required_attrs = config.required_attrs, attributes = config.attributes)
    print(f"results from the Data attrs scraper {results}")
    return {"message": "DOM leads scraped","Results":results}

@router.post("/extract_from_json_ld")
def DOMLEADS(url:str , config:extract_from_json_ld):
    soup = get_soup(url)
    results = extract_from_json_ld(soup,element_name = config.element_name , type_attr = config.type_attr, schema_type = config.schema_type, fields = config.fields)
    print(f"results from the JSON LD scraper {results}")
    return {"message": "DOM leads scraped","Results":results}

@router.post("/extract_from_address")
def DOMLEADS(url:str = Body(...) , config:extract_from_addressConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_address(soup,element_name = config.element_name , element_class = config.element_class, source_element = config.source_element, source_class = config.source_class ,fields = config.fields ,patterns = config.patterns)
    print(f"results from the address scraper {results}")
    return {"message": "DOM leads scraped","Results":results}

@router.post("/extract_from_table")
def DOMLEADS(url:str = Body(...) , config:extract_from_tablesConfig = Body(...)):
    soup = get_soup(url)
    results = extract_from_tables(soup,element_name = config.element_name , element_class = config.element_class, row_element = config.row_element, cell_element = config.cell_element , header_rows = config.header_rows)
    print(f"results from the table scraper {results}")
    return {"message": "DOM leads scraped","Results":results}


