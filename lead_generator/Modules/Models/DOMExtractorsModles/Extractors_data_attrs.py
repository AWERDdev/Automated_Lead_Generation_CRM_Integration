import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def extract_from_data_attrs(soup, element_name="div", element_class="employee-card", 
                           required_attrs=None, attributes=None):
    """Extract leads from data attributes"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with class {element_class}")
    leads = []
    
    # Default required attributes if none provided
    if required_attrs is None:
        required_attrs = ["data-name", "data-email"]
    
    # Default attributes to extract if none provided
    if attributes is None:
        attributes = {
            "name": "data-name",
            "email": "data-email",
            "position": "data-position"
        }
    
    elements = soup.find_all(element_name, class_=element_class)
    for element in elements:
        # Check if all required attributes are present
        if all(element.has_attr(attr) for attr in required_attrs):
            lead = {"source": f"{element_name}-{element_class}"}
            
            # Extract each attribute
            for field_name, attr_name in attributes.items():
                lead[field_name] = element[attr_name] if element.has_attr(attr_name) else "N/A"
            
            leads.append(lead)
    
    return leads
