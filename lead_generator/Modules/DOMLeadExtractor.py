import requests
from bs4 import BeautifulSoup
import re
import logging

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

def extract_from_business_divs(soup , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from div elements with business-entry class"""
    if soup is None:
        return []
        
    logging.info("Extracting data from business entry divs")
    leads = []
    business_entries = soup.find_all(elementName , class_=elemetClass)
    for entry in business_entries:
        name = entry.find(elementSource , class_=elementSourceClass).get_text(strip=True) if entry.find(elementSource , class_=elementSourceClass) else "N/A"
        email =  entry.find(elementSource , class_=elementSourceClass).get_text(strip=True) if entry.find(elementSource , class_=elementSourceClass) else "N/A"
        # add more spans if needed and change the type of needed to a p or anything else
        leads.append({
            "source": "business-entry",
            "name": name,
            "email": email
        })
    return leads

def extract_from_tables(soup , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from tables"""
    if soup is None:
        return []
        
    logging.info("Extracting data from contact tables")
    leads = []
    contact_tables = soup.find_all("table", class_="contact-table")
    for table in contact_tables:
        rows = table.find_all("tr")
        for row in rows[1:]:  # Skip header row
            cells = row.find_all("td")
            if len(cells) >= 3:
                leads.append({
                    "source": "contact-table",
                    "name": cells[0].get_text(strip=True),
                    "email": cells[1].get_text(strip=True),
                    "phone": cells[2].get_text(strip=True)
                })
    return leads

def extract_from_paragraphs(soup  , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from paragraph tags"""
    if soup is None:
        return []
        
    logging.info("Extracting data from contact paragraphs")
    leads = []
    contact_paragraphs = soup.find_all("p", class_="contact-info")
    for p in contact_paragraphs:
        # Extract using regex patterns
        email_match = re.search(r'Email:\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', p.get_text())
        phone_match = re.search(r'Phone:\s*([\d\s\(\)\-\+]+)', p.get_text())
        name_match = re.search(r'Name:\s*([^,]+)', p.get_text())
        
        if email_match or phone_match:
            leads.append({
                "source": "contact-paragraph",
                "name": name_match.group(1).strip() if name_match else "N/A",
                "email": email_match.group(1).strip() if email_match else "N/A",
                "phone": phone_match.group(1).strip() if phone_match else "N/A"
            })
    return leads

def extract_from_list_items(soup , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from list items"""
    if soup is None:
        return []
        
    logging.info("Extracting data from contact lists")
    leads = []
    contact_lists = soup.find_all("ul", class_="team-members")
    for ul in contact_lists:
        list_items = ul.find_all("li")
        for item in list_items:
            name_el = item.find("strong")
            email_el = item.find("a", href=lambda href: href and "mailto:" in href)
            
            if name_el or email_el:
                leads.append({
                    "source": "team-list",
                    "name": name_el.get_text(strip=True) if name_el else "N/A",
                    "email": email_el.get_text(strip=True) if email_el else (
                        email_el["href"].replace("mailto:", "") if email_el and "href" in email_el.attrs else "N/A"
                    )
                })
    return leads

def extract_from_images(soup , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from image alt text and captions"""
    if soup is None:
        return []
        
    logging.info("Extracting data from team photos")
    leads = []
    team_photos = soup.find_all("figure", class_="team-photo")
    for figure in team_photos:
        img = figure.find("img")
        caption = figure.find("figcaption")
        
        if img and "alt" in img.attrs:
            name = img["alt"]
            email = "N/A"
            
            # Check if caption has email
            if caption:
                email_match = re.search(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', caption.get_text())
                if email_match:
                    email = email_match.group(1)
            
            leads.append({
                "source": "team-photo",
                "name": name,
                "email": email
            })
    return leads

def extract_from_data_attrs(soup):
    """Extract leads from data attributes"""
    if soup is None:
        return []
        
    logging.info("Extracting data from employee cards")
    leads = []
    employee_cards = soup.find_all("div", class_="employee-card")
    for card in employee_cards:
        if card.has_attr("data-name") and card.has_attr("data-email"):
            leads.append({
                "source": "employee-card",
                "name": card["data-name"],
                "email": card["data-email"],
                "position": card["data-position"] if card.has_attr("data-position") else "N/A"
            })
    return leads

def extract_from_json_ld(soup , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from JSON-LD metadata"""
    if soup is None:
        return []
        
    logging.info("Extracting data from JSON-LD metadata")
    leads = []
    json_ld_scripts = soup.find_all("script", type="application/ld+json")
    for script in json_ld_scripts:
        try:
            import json
            data = json.loads(script.string)
            
            # Look for Person schema
            if data.get("@type") == "Person":
                leads.append({
                    "source": "json-ld",
                    "name": data.get("name", "N/A"),
                    "email": data.get("email", "N/A"),
                    "phone": data.get("telephone", "N/A"),
                    "url": data.get("url", "N/A")
                })
        except (json.JSONDecodeError, AttributeError) as e:
            logging.warning(f"Failed to parse JSON-LD: {e}")
    return leads

def extract_from_address(soup , elementName , elemetClass , elementSource ,  elementSourceClass):
    """Extract leads from address blocks"""
    if soup is None:
        return []
        
    logging.info("Extracting data from address blocks")
    leads = []
    address_blocks = soup.find_all("address")
    for addr in address_blocks:
        # Often contact info is in address tags
        email_match = re.search(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', addr.get_text())
        if email_match:
            name_el = addr.find_previous("h3") or addr.find_previous("h2")
            leads.append({
                "source": "address-block",
                "name": name_el.get_text(strip=True) if name_el else "N/A",
                "email": email_match.group(1),
                "address": re.sub(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', '', addr.get_text(strip=True))
            })
    return leads

def scrape_leads(url="http://172.17.80.1:3000/lead_generator/Views/index.html", extractors=None):
    """
    Main function to scrape leads with configurable extractors
    
    Args:
        url (str): URL to scrape
        extractors (list): List of extractor functions to use. If None, all extractors are used.
    
    Returns:
        dict: Dictionary containing extracted leads
    """
    soup = get_soup(url)
    if soup is None:
        return {"error": "Failed to fetch URL", "leads": []}
    
    # Define all available extractors
    all_extractors = {
        "business_divs": extract_from_business_divs,
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
    
    # Run selected extractors
    leads = []
    for extractor_name in extractors:
        if extractor_name in all_extractors:
            extractor_leads = all_extractors[extractor_name](soup)
            leads.extend(extractor_leads)
            logging.info(f"Extracted {len(extractor_leads)} leads from {extractor_name}")
        else:
            logging.warning(f"Unknown extractor: {extractor_name}")
    
    # Print all the extracted leads
    for lead in leads:
        print(f"Source: {lead['source']} | Name: {lead.get('name', 'N/A')} | Email: {lead.get('email', 'N/A')}")
    
    logging.info(f"Extracted {len(leads)} leads in total")
    return {"leads": leads}
