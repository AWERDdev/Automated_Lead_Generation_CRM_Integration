from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class genConfig(BaseModel):
    element_name: Optional[str] = None
    element_class: Optional[str] = None
    source_element: Optional[str] = None
    source_class: Optional[str] = None
    fields: Optional[Dict[str, Any]] = None
    row_element: Optional[str] = None
    cell_element: Optional[str] = None
    header_rows: Optional[int] = None
    patterns: Optional[Dict[str, Any]] = None
    item_element: Optional[str] = None
    image_element: Optional[str] = None
    caption_element: Optional[str] = None
    required_attrs: Optional[List[str]] = None
    attributes: Optional[Dict[str, Any]] = None
    extractors: Optional[List[str]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class DivExtractorConfig(BaseModel):
    element_name: Optional[str] = None
    extractor: Optional[str] = None
    element_class: Optional[str] = None
    source_element: Optional[str] = None
    source_class: Optional[str] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class ParagraphExtractorConfig(BaseModel):
    extractor: Optional[str] = None
    element_name: Optional[str] = None
    element_class: Optional[str] = None
    patterns: Optional[Dict[str, Any]] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class ListItemExtractorConfig(BaseModel):
    element_name: Optional[str] = None    
    extractor: Optional[str] = None
    element_class: Optional[str] = None
    item_element: Optional[str] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class extract_from_tablesConfig(BaseModel):
    element_name: Optional[str] = None
    extractor: Optional[str] = None
    element_class: Optional[str] = None
    row_element: Optional[str] = None
    cell_element: Optional[str] = None
    header_rows: Optional[int] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class extract_from_imagesConfig(BaseModel):
    element_name: Optional[str] = None
    extractor: Optional[str] = None
    element_class: Optional[str] = None
    image_element: Optional[str] = None
    caption_element: Optional[str] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class extract_from_data_attrsConfig(BaseModel):
    element_name: Optional[str] = None
    extractor: Optional[str] = None
    element_class: Optional[str] = None
    required_attrs: Optional[List[str]] = None
    attributes: Optional[Dict[str, Any]] = None
    # fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class extract_from_json_ld(BaseModel):
    element_name: Optional[str] = None
    extractor: Optional[str] = None
    type_attr: Optional[str] = None
    schema_type: Optional[str] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None

class extract_from_addressConfig(BaseModel):
    element_name: Optional[str] = None
    extractor: Optional[str] = None
    element_class: Optional[str] = None
    source_element: Optional[str] = None
    source_class: Optional[str] = None
    patterns: Optional[Dict[str, Any]] = None
    fields: Optional[Dict[str, Any]] = None
    multiple_elements: Optional[List[str]] = None
    multiple_source_elements: Optional[List[str]] = None
    dynamic_fields: Optional[Dict[str, Dict[str, Any]]] = None
