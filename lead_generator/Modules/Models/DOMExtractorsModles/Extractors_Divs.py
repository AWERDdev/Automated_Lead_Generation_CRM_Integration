import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_divs(soup, element_name="div", element_class="business-entry", 
                               source_element="h2", source_class="business-name", 
                               fields=None):
    """Extract leads from div elements with business-entry class"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with class {element_class}")
    leads = []
    
    # Default fields if none provided
    if fields is None:
        fields = {
            "name": {"element": source_element, "class": source_class},
            "email": {"element": "span", "class": "email"}
        }
    
    business_entries = soup.find_all(element_name, class_=element_class)
    for entry in business_entries:
        lead = {"source": f"{element_name}-{element_class}"}
        
        # Extract each field based on configuration
        for field_name, field_config in fields.items():
            field_element = field_config.get("element", "span")
            field_class = field_config.get("class")
            field_attr = field_config.get("attribute")
            
            # Find the element
            if field_class:
                element = entry.find(field_element, class_=field_class)
            else:
                element = entry.find(field_element)
            
            # Extract the value
            if element:
                if field_attr and field_attr in element.attrs:
                    value = element[field_attr]
                else:
                    value = element.get_text(strip=True)
            else:
                value = "N/A"
            
            lead[field_name] = value
        
        leads.append(lead)
    
    return leads