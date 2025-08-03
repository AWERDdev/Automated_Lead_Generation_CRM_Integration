import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_list_items(soup, element_name="ul", element_class="team-members", 
                           item_element="li", fields=None):
    """Extract leads from list items"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with class {element_class}")
    leads = []
    
    # Default fields if none provided
    if fields is None:
        fields = {
            "name": {"element": "strong"},
            "email": {"element": "a", "attribute": "href", "transform": lambda x: x.replace("mailto:", "") if x.startswith("mailto:") else x}
        }
    
    lists = soup.find_all(element_name, class_=element_class)
    for list_element in lists:
        items = list_element.find_all(item_element)
        
        for item in items:
            lead = {"source": f"{element_name}-{element_class}"}
            
            # Extract each field based on configuration
            for field_name, field_config in fields.items():
                field_element = field_config.get("element")
                field_class = field_config.get("class")
                field_attr = field_config.get("attribute")
                transform_func = field_config.get("transform")
                
                # Find the element
                if field_class:
                    element = item.find(field_element, class_=field_class)
                else:
                    element = item.find(field_element)
                
                # Extract the value
                if element:
                    if field_attr and field_attr in element.attrs:
                        value = element[field_attr]
                    else:
                        value = element.get_text(strip=True)
                    
                    # Apply transformation if provided
                    if transform_func and callable(transform_func):
                        value = transform_func(value)
                else:
                    value = "N/A"
                
                lead[field_name] = value
            
            leads.append(lead)
    
    return leads

