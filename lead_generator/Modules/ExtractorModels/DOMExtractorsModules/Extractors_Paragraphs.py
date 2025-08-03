import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_paragraphs(soup, element_name="p", element_class="contact-info", 
                           patterns=None):
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
    
    paragraphs = soup.find_all(element_name, class_=element_class)
    for p in paragraphs:
        text = p.get_text()
        lead = {"source": f"{element_name}-{element_class}"}
        
        # Extract data using each regex pattern
        for field_name, pattern in patterns.items():
            match = re.search(pattern, text)
            lead[field_name] = match.group(1).strip() if match else "N/A"
        
        # Only add if at least one field was found
        if any(value != "N/A" for field, value in lead.items() if field != "source"):
            leads.append(lead)
    
    return leads
