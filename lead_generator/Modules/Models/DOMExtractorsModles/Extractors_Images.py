import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_images(soup, element_name="figure", element_class="team-photo", 
                       image_element="img", caption_element="figcaption", 
                       fields=None):
    """Extract leads from image alt text and captions"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with class {element_class}")
    leads = []
    
    # Default fields if none provided
    if fields is None:
        fields = {
            "name": {"element": image_element, "attribute": "alt"},
            "email": {"element": caption_element, "regex": r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})'}
        }
    
    figures = soup.find_all(element_name, class_=element_class)
    for figure in figures:
        lead = {"source": f"{element_name}-{element_class}"}
        
        # Extract each field based on configuration
        for field_name, field_config in fields.items():
            field_element = field_config.get("element")
            field_class = field_config.get("class")
            field_attr = field_config.get("attribute")
            regex_pattern = field_config.get("regex")
            
            # Find the element
            if field_class:
                element = figure.find(field_element, class_=field_class)
            else:
                element = figure.find(field_element)
            
            # Extract the value
            if element:
                if regex_pattern:
                    match = re.search(regex_pattern, element.get_text())
                    value = match.group(1) if match else "N/A"
                elif field_attr and field_attr in element.attrs:
                    value = element[field_attr]
                else:
                    value = element.get_text(strip=True)
            else:
                value = "N/A"
            
            lead[field_name] = value
        
        leads.append(lead)
    
    return leads

