from fastapi import APIRouter , Body
from Modules.DOMLeadExtractor import extract_from_divs, extract_from_tables, extract_from_list_items, extract_from_data_attrs, extract_from_images, extract_from_address, extract_from_paragraphs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_JSONLD import extract_from_json_ld
from Modules.ExtractorModels.DOMExtractorsModules.FetchSoup import get_soup
# from pydantic import BaseModel
from ClassModels.DOMExtractorClassModels import DivExtractorConfig, ParagraphExtractorConfig, ListItemExtractorConfig, extract_from_tablesConfig, extract_from_imagesConfig, extract_from_data_attrsConfig, extract_from_json_ld, extract_from_addressConfig

router = APIRouter(
    prefix="/DOMLeads",
    tags=["DOMLeads"],
    responses={404: {"description": "Not found"}}
)

@router.get('/')
def Welcome_Message():
    return{"message":"welcome to the DOM Leads Extractor"}

from fastapi import HTTPException

@router.post("/divs")
async def DOMLEADS(url: str = Body(...), config: DivExtractorConfig = Body(...)):
    try:
        soup = await get_soup(url)
        print(f"Soup object created: {soup}")
        print(f"Config received: {config}")
        print(f"URL received: {url}")

        if not soup:
            # Exit early before calling extract_from_divs
            return {"message": "Failed to create soup object. Please check the URL."}

        if not config:
            return {"message": "No configuration provided."}

        results = extract_from_divs(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            source_element=config.source_element,
            source_class=config.source_class,
            fields=config.fields,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )

        if not results:
            return {"message": "No results found."}

        print(f"Results from the Div scraper {results}")
        return {"message": "DOM leads scraped", "Results": results}

    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/paragraphs")
async def DOMLEADS(url: str = Body(...), config: ParagraphExtractorConfig = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL."}
        if not config:
            return {"message": "No configuration provided."}

        results =  extract_from_paragraphs(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            patterns=config.patterns,
            fields=config.fields,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/list_items")
async def DOMLEADS(url: str = Body(...), config: ListItemExtractorConfig = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL.",soup:soup}
        if not config:
            return {"message": "No configuration provided."}

        results =  extract_from_list_items(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            item_element=config.item_element,
            fields=config.fields,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/images")
async def DOMLEADS(url: str = Body(...), config: extract_from_imagesConfig = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL."}
        if not config:
            return {"message": "No configuration provided."}

        results =  extract_from_images(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            image_element=config.image_element,
            caption_element=config.caption_element,
            fields=config.fields,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract_from_data_attrs")
async def DOMLEADS(url: str = Body(...), config: extract_from_data_attrsConfig = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL."}
        if not config:
            return {"message": "No configuration provided."}

        results =  extract_from_data_attrs(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            required_attrs=config.required_attrs,
            attributes=config.attributes,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract_from_json_ld")
async def DOMLEADS(url: str = Body(...), config: extract_from_json_ld = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL."}
        if not config:
            return {"message": "No configuration provided."}

        results =  extract_from_json_ld(
            soup,
            element_name=config.element_name,
            type_attr=config.type_attr,
            schema_type=config.schema_type,
            fields=config.fields,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract_from_address")
async def DOMLEADS(url: str = Body(...), config: extract_from_addressConfig = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL."}

        results =  extract_from_address(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            source_element=config.source_element,
            source_class=config.source_class,
            fields=config.fields,
            patterns=config.patterns,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract_from_table")
async def DOMLEADS(url: str = Body(...), config: extract_from_tablesConfig = Body(...)):
    try:
        soup = await get_soup(url)
        if not soup:
            return {"message": "Failed to create soup object. Please check the URL."}
        if not config:
            return {"message": "No configuration provided."}

        results =  extract_from_tables(
            soup,
            element_name=config.element_name,
            element_class=config.element_class,
            row_element=config.row_element,
            cell_element=config.cell_element,
            header_rows=config.header_rows,
            fields=config.fields,
            multiple_elements=config.multiple_elements,
            multiple_source_elements=config.multiple_source_elements,
            dynamic_fields=config.dynamic_fields
        )
        return {"message": "DOM leads scraped", "Results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
