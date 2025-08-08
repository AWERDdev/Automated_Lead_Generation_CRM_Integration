import logging
import re

from Modules.ExtractorModels.DOMExtractorsModules.FetchSoup import get_soup
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Tables import extract_from_tables
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_ListItems import extract_from_list_items
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_data_attrs import extract_from_data_attrs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_JSONLD import extract_from_json_ld
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Images import extract_from_images
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Adress import extract_from_address
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Divs import extract_from_divs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Paragraphs import extract_from_paragraphs

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


# def scrape_leads(url="http://172.17.80.1:3000/lead_generator/Views/index.html",element_name=None, element_class=None, 
#                                source_element=None, source_class=None, 
#                                fields=None, multiple_elements=None,
#                                multiple_source_elements=None, 
#                                dynamic_fields=None, extractors=None, ):
#     """
#     Main function to scrape leads with configurable extractors
    
#     Args:
#         url (str): URL to scrape
#         extractors (list): List of extractor function names to use
#         configs (dict): Dictionary of configurations for extractors
    
#     Returns:
#         dict: Dictionary containing extracted leads
#     """
#     soup = get_soup(url)
#     if soup is None:
#         return {"error": "Failed to fetch URL", "leads": []}
    
#     # Define all available extractors
#     all_extractors = {
#         "divs": extract_from_divs,
#         "tables": extract_from_tables,
#         "paragraphs": extract_from_paragraphs,
#         "list_items": extract_from_list_items,
#         "images": extract_from_images,
#         "data_attrs": extract_from_data_attrs,
#         "json_ld": extract_from_json_ld,
#         "address": extract_from_address
#     }
    
#     # If no extractors specified, use all
#     if extractors is None:
#         extractors = all_extractors.keys()
#     # Default fields if none provided
#     if fields is None:
#         fields = {
#             "name": {"element": source_element, "class": source_class},
#             "email": {"element": "span", "class": "email"}
#         }
    
#     # Use dynamic fields if provided, otherwise use default fields
#     if dynamic_fields:
#         fields = dynamic_fields
    
#     # Determine which elements to search for
#     elements_to_search = [element_name]
#     if multiple_elements:
#         elements_to_search = multiple_elements
    
#     # Determine which source elements to search for
#     source_elements_to_search = [source_element]
#     if multiple_source_elements:
#         source_elements_to_search = multiple_source_elements
    
#     # Search through all specified elements
#     for current_element in elements_to_search:
#         business_entries = soup.find_all(current_element, class_=element_class)
        
#         for entry in business_entries:
#             lead = {"source": f"{current_element}-{element_class}"}
            
#             # Extract each field based on configuration
#             for field_name, field_config in fields.items():
#                 field_element = field_config.get("element", "span")
#                 field_class = field_config.get("class")
#                 field_attr = field_config.get("attribute")
#                 field_transform = field_config.get("transform")
#                 field_regex = field_config.get("regex")
                
#                 # Try to find the element using any of the source elements
#                 element = None
#                 for source_elem in source_elements_to_search:
#                     if field_class:
#                         element = entry.find(source_elem, class_=field_class)
#                     else:
#                         element = entry.find(source_elem)
#                     if element:
#                         break
                
#                 # If not found in source elements, try the field_element
#                 if not element:
#                     if field_class:
#                         element = entry.find(field_element, class_=field_class)
#                     else:
#                         element = entry.find(field_element)
                
#                 # Extract the value
#                 if element:
#                     if field_regex:
#                         # Use regex pattern to extract value
#                         text = element.get_text()
#                         match = re.search(field_regex, text)
#                         value = match.group(1) if match else "N/A"
#                     elif field_attr and field_attr in element.attrs:
#                         value = element[field_attr]
#                     else:
#                         value = element.get_text(strip=True)
                    
#                     # Apply transformation if provided
#                     if field_transform and value != "N/A":
#                         if field_transform == "mailto:" and value.startswith("mailto:"):
#                             value = value.replace("mailto:", "")
#                         elif callable(field_transform):
#                             value = field_transform(value)
#                 else:
#                     value = "N/A"
                
#                 lead[field_name] = value
            
#     logging.info(f"Extracted {len(lead)} leads in total")
#     return {"leads": [lead]}