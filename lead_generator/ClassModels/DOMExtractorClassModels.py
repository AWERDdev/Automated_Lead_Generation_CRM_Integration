from pydantic import BaseModel


class genConfig(BaseModel):
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    element_name: str | None = None
    fields: dict | None = None
    row_element: str | None = None
    cell_element: str | None = None
    header_rows: int | None = None
    patterns: dict | None = None
    item_element: str | None = None
    image_element: str | None = None
    caption_element: str | None = None
    required_attrs: list | None = None
    attributes: dict | None = None
    extractors: list | None = None

class DivExtractorConfig(BaseModel):
    element_name:str | None = None
    extractor:str | None = None
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    fields: object | None = None

class ParagraphExtractorConfig(BaseModel):
    extractor: str | None = None
    element_name: str | None = None
    element_class: str | None = None
    patterns: dict | None = None
    fields: dict | None = None

class ListItemExtractorConfig(BaseModel):
    element_name: str | None = None    
    extractor: str | None = None
    element_class: str | None = None
    item_element: str | None = None
    fields: dict | None = None

class extract_from_tablesConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    row_element: str | None = None
    cell_element: str | None = None
    header_rows: int | None = None
    fields: dict | None = None

class extract_from_imagesConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    image_element: str | None = None
    caption_element: str | None = None
    fields: dict | None = None

class extract_from_data_attrsConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    required_attrs: list | None = None
    attributes: dict | None = None
    fields: dict | None = None

class extract_from_json_ld(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    type_attr: str | None = None
    schema_type: str | None = None
    fields: dict | None = None

class extract_from_addressConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    patterns: dict | None = None
    fields: dict | None = None
