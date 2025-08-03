import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_address(soup, element_name="address", element_class=None, patterns=None):
    """Extract leads from address blocks"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} blocks")
    leads = []
    
    # Default patterns if none provided
    if patterns is None:
        patterns = {
            "email": r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})',
            "address": r'(.+)'
        }
    
    kwargs = {}
    if element_class:
        kwargs["class_"] = element_class
    
    address_blocks = soup.find_all(element_name, **kwargs)
    for addr in address_blocks:
        text = addr.get_text()
        lead = {"source": f"{element_name}-block"}
        
        # Extract using patterns
        for field_name, pattern in patterns.items():
            match = re.search(pattern, text)
            if match:
                lead[field_name] = match.group(1).strip()
        
        # Special case for name - look for preceding heading
        name_element = addr.find_previous("h3") or addr.find_previous("h2")
        lead["name"] = name_element.get_text(strip=True) if name_element else "N/A"
        
        # Only add if email was found
        if "email" in lead and lead["email"] != "N/A":
            # Clean up the address field by removing the email
            if "address" in lead and "email" in lead:
                lead["address"] = re.sub(re.escape(lead["email"]), "", lead["address"]).strip()
            
            leads.append(lead)
    
    return leads
