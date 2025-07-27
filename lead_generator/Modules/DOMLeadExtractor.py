import requests
from bs4 import BeautifulSoup
import re
import logging
import json

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def get_soup(url):
    """Fetch and parse the URL into a BeautifulSoup object"""
    try:
        logging.info(f"Fetching content from {url}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, "html.parser")
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching the URL: {e}")
        return None

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

def extract_from_tables(soup, element_name="table", element_class="contact-table", 
                        row_element="tr", cell_element="td", header_rows=1,
                        fields=None):
    """Extract leads from tables"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with class {element_class}")
    leads = []
    
    # Default fields if none provided
    if fields is None:
        fields = ["name", "email", "phone"]
    
    tables = soup.find_all(element_name, class_=element_class)
    for table in tables:
        rows = table.find_all(row_element)
        
        # Skip header rows
        for row in rows[header_rows:]:
            cells = row.find_all(cell_element)
            
            if len(cells) >= len(fields):
                lead = {"source": f"{element_name}-{element_class}"}
                
                # Map cells to field names
                for i, field_name in enumerate(fields):
                    lead[field_name] = cells[i].get_text(strip=True)
                
                leads.append(lead)
    
    return leads

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

def extract_from_json_ld(soup, element_name="script", type_attr="application/ld+json", 
                        schema_type="Person", fields=None):
    """Extract leads from JSON-LD metadata"""
    if soup is None:
        return []
    
    logging.info(f"Extracting data from {element_name} with type {type_attr}")
    leads = []
    
    # Default fields if none provided
    if fields is None:
        fields = {
            "name": "name",
            "email": "email",
            "phone": "telephone",
            "url": "url"
        }
    
    json_ld_scripts = soup.find_all(element_name, type=type_attr)
    for script in json_ld_scripts:
        try:
            if script.string:
                data = json.loads(script.string)
                
                # Check if it matches the expected type
                if data.get("@type") == schema_type:
                    lead = {"source": f"{element_name}-{schema_type}"}
                    
                    # Extract each field
                    for field_name, json_path in fields.items():
                        lead[field_name] = data.get(json_path, "N/A")
                    
                    leads.append(lead)
        except (json.JSONDecodeError, AttributeError) as e:
            logging.warning(f"Failed to parse JSON-LD: {e}")
    
    return leads

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

def scrape_leads(url="http://172.17.80.1:3000/lead_generator/Views/index.html", extractors=None, configs=None):
    """
    Main function to scrape leads with configurable extractors
    
    Args:
        url (str): URL to scrape
        extractors (list): List of extractor function names to use
        configs (dict): Dictionary of configurations for extractors
    
    Returns:
        dict: Dictionary containing extracted leads
    """
    soup = get_soup(url)
    if soup is None:
        return {"error": "Failed to fetch URL", "leads": []}
    
    # Define all available extractors
    all_extractors = {
        "divs": extract_from_divs,
        "tables": extract_from_tables,
        "paragraphs": extract_from_paragraphs,
        "list_items": extract_from_list_items,
        "images": extract_from_images,
        "data_attrs": extract_from_data_attrs,
        "json_ld": extract_from_json_ld,
        "address": extract_from_address
    }
    
    # If no extractors specified, use all
    if extractors is None:
        extractors = all_extractors.keys()
    
    # Initialize configurations if none provided
    if configs is None:
        configs = {}
    
    # Run selected extractors
    leads = []
    for extractor_name in extractors:
        if extractor_name in all_extractors:
            # Get configuration for this extractor if available
            config = configs.get(extractor_name, {})
            
            # Call the extractor with the configuration
            extractor_leads = all_extractors[extractor_name](soup, **config)
            leads.extend(extractor_leads)
            logging.info(f"Extracted {len(extractor_leads)} leads from {extractor_name}")
        else:
            logging.warning(f"Unknown extractor: {extractor_name}")
    
    # Print all the extracted leads
    for lead in leads:
        print(f"Source: {lead['source']} | Name: {lead.get('name', 'N/A')} | Email: {lead.get('email', 'N/A')}")
    
    logging.info(f"Extracted {len(leads)} leads in total")
    return {"leads": leads}