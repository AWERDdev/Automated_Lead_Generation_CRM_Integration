from pydantic import BaseModel
from typing import List, Dict, Any, Optional, Union


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
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["div", "span", "p"]
    multiple_source_elements: List[str] | None = None  # ["h1", "h2", "h3", "p"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class DivExtractorConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["div", "span", "p"]
    multiple_source_elements: List[str] | None = None  # ["h1", "h2", "h3", "p"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class ParagraphExtractorConfig(BaseModel):
    extractor: str | None = None
    element_name: str | None = None
    element_class: str | None = None
    patterns: dict | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["p", "div", "span"]
    multiple_source_elements: List[str] | None = None  # ["h1", "h2", "h3", "p"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class ListItemExtractorConfig(BaseModel):
    element_name: str | None = None    
    extractor: str | None = None
    element_class: str | None = None
    item_element: str | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["ul", "ol", "div"]
    multiple_source_elements: List[str] | None = None  # ["li", "div", "span"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class extract_from_tablesConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    row_element: str | None = None
    cell_element: str | None = None
    header_rows: int | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["table", "div"]
    multiple_source_elements: List[str] | None = None  # ["tr", "div"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class extract_from_imagesConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    image_element: str | None = None
    caption_element: str | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["figure", "div", "img"]
    multiple_source_elements: List[str] | None = None  # ["img", "figcaption", "div"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class extract_from_data_attrsConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    required_attrs: list | None = None
    attributes: dict | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["div", "span", "p"]
    multiple_source_elements: List[str] | None = None  # ["div", "span", "p"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class extract_from_json_ld(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    type_attr: str | None = None
    schema_type: str | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["script", "div"]
    multiple_source_elements: List[str] | None = None  # ["script", "div"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations

class extract_from_addressConfig(BaseModel):
    element_name: str | None = None
    extractor: str | None = None
    element_class: str | None = None
    source_element: str | None = None
    source_class: str | None = None
    patterns: dict | None = None
    fields: dict | None = None
    # New fields for dynamic configuration
    multiple_elements: List[str] | None = None  # ["address", "div", "p"]
    multiple_source_elements: List[str] | None = None  # ["h1", "h2", "h3", "p"]
    dynamic_fields: Dict[str, Dict[str, Any]] | None = None  # User-defined field configurations
