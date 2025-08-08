import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_divs(soup, element_name="div", element_class="business-entry", 
                               source_element="h2", source_class="business-name", 
                               fields=None, multiple_elements=None, multiple_source_elements=None, 
                               dynamic_fields=None):
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
    
    # Use dynamic fields if provided, otherwise use default fields
    if dynamic_fields:
        fields = dynamic_fields
    
    # Determine which elements to search for
    elements_to_search = [element_name]
    if multiple_elements:
        elements_to_search = multiple_elements
    
    # Determine which source elements to search for
    source_elements_to_search = [source_element]
    if multiple_source_elements:
        source_elements_to_search = multiple_source_elements
    
    # Search through all specified elements
    for current_element in elements_to_search:
        business_entries = soup.find_all(current_element, class_=element_class)
        
        for entry in business_entries:
            lead = {"source": f"{current_element}-{element_class}"}
            
            # Extract each field based on configuration
            for field_name, field_config in fields.items():
                field_element = field_config.get("element", "span")
                field_class = field_config.get("class")
                field_attr = field_config.get("attribute")
                field_transform = field_config.get("transform")
                field_regex = field_config.get("regex")
                
                # Try to find the element using any of the source elements
                element = None
                for source_elem in source_elements_to_search:
                    if field_class:
                        element = entry.find(source_elem, class_=field_class)
                    else:
                        element = entry.find(source_elem)
                    if element:
                        break
                
                # If not found in source elements, try the field_element
                if not element:
                    if field_class:
                        element = entry.find(field_element, class_=field_class)
                    else:
                        element = entry.find(field_element)
                
                # Extract the value
                if element:
                    if field_regex:
                        # Use regex pattern to extract value
                        text = element.get_text()
                        match = re.search(field_regex, text)
                        value = match.group(1) if match else "N/A"
                    elif field_attr and field_attr in element.attrs:
                        value = element[field_attr]
                    else:
                        value = element.get_text(strip=True)
                    
                    # Apply transformation if provided
                    if field_transform and value != "N/A":
                        if field_transform == "mailto:" and value.startswith("mailto:"):
                            value = value.replace("mailto:", "")
                        elif callable(field_transform):
                            value = field_transform(value)
                else:
                    value = "N/A"
                
                lead[field_name] = value
            
            # Only add if at least one field was found
            if any(value != "N/A" for field, value in lead.items() if field != "source"):
                leads.append(lead)
    
    return leads