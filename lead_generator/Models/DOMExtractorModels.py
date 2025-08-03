from pydantic import BaseModel


class genConfig(BaseModel):
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

class DivExtractorConfig(BaseModel):
    extractor:str | None = None
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    fields: object | None = None

class ParagraphExtractorConfig(BaseModel):
    extractor:str | None = None
    element_class: str | None = None
    patterns: object | None = None
    fields: object | None = None

class ListItemExtractorConfig(BaseModel):    
    extractor:str | None = None
    element_class: str | None = None
    item_element: str | None = None
    fields: object | None = None

class extract_from_tablesConfig(BaseModel):
    extractor:str | None = None
    element_class: str | None = None
    row_element: str | None = None
    cell_element: str | None = None
    header_rows: int | None = None
    fields: object | None = None

class extract_from_imagesConfig(BaseModel):
    extractor:str | None = None
    element_class: str | None = None
    image_element: str | None = None
    caption_element: str | None = None
    fields: object | None = None

class extract_from_data_attrsConfig(BaseModel):
    extractor:str | None = None
    element_class: str | None = None
    required_attrs: object | None = None
    attributes: object | None = None
    fields: object | None = None

class extract_from_json_ld(BaseModel):
    extractor:str | None = None
    type_attr: str | None = None
    schema_type: str | None = None
    fields: object | None = None

class extract_from_addressConfig(BaseModel):
    extractor:str | None = None
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    patterns: object | None = None
    fields: object | None = None
