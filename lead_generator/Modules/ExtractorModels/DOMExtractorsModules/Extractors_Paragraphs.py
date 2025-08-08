import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_paragraphs(soup, element_name="p", element_class="contact-info", 
                           patterns=None, fields=None, multiple_elements=None, 
                           multiple_source_elements=None, dynamic_fields=None):
    """Extract leads from paragraph tags using regex patterns"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with class {element_class}")
    leads = []
    
    # Default patterns if none provided
    if patterns is None:
        patterns = {
            "name": r'Name:\s*([^,]+)',
            "email": r'Email:\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})',
            "phone": r'Phone:\s*([\d\s\(\)\-\+]+)'
        }
    
    # Use dynamic fields if provided, otherwise use default patterns
    if dynamic_fields:
        # Convert dynamic fields to patterns if they contain regex
        for field_name, field_config in dynamic_fields.items():
            if "regex" in field_config:
                patterns[field_name] = field_config["regex"]
    
    # Determine which elements to search for
    elements_to_search = [element_name]
    if multiple_elements:
        elements_to_search = multiple_elements
    
    # Search through all specified elements
    for current_element in elements_to_search:
        paragraphs = soup.find_all(current_element, class_=element_class)
        
        for p in paragraphs:
            text = p.get_text()
            lead = {"source": f"{current_element}-{element_class}"}
            
            # Extract data using each regex pattern
            for field_name, pattern in patterns.items():
                # Convert string pattern to regex if needed
                if isinstance(pattern, str):
                    try:
                        match = re.search(pattern, text)
                        lead[field_name] = match.group(1).strip() if match else "N/A"
                    except re.error:
                        # If pattern is not valid regex, try simple text search
                        if pattern in text:
                            lead[field_name] = pattern
                        else:
                            lead[field_name] = "N/A"
                else:
                    # Handle compiled regex patterns
                    match = re.search(pattern, text)
                    lead[field_name] = match.group(1).strip() if match else "N/A"
            
            # Only add if at least one field was found
            if any(value != "N/A" for field, value in lead.items() if field != "source"):
                leads.append(lead)
    
    return leads
