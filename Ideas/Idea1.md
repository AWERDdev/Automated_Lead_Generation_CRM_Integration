make all of the scrapers use varibles instead of set value for example 

 instead of this 

def extract_from_business_divs(soup):
    """Extract leads from div elements with business-entry class"""
    if soup is None:
        return []
        
    logging.info("Extracting data from business entry divs")
    leads = []
    business_entries = soup.find_all("div", class_="business-entry")
    for entry in business_entries:
        name = entry.find("span", class_="name").get_text(strip=True) if entry.find("span", class_="name") else "N/A"
        email = entry.find("span", class_="email").get_text(strip=True) if entry.find("span", class_="email") else "N/A"
        # add more spans if needed and change the type of needed to a p or anything else
        leads.append({
            "source": "business-entry",
            "name": name,
            "email": email
        })
    return leads

use this 

def extract_from_business_divs(soup , elementname , elementClass , elementType):

    """Extract leads from div elements with business-entry class"""
    if soup is None:
        return []
        
    logging.info("Extracting data from business entry divs")
    leads = []
    business_entries = soup.find_all("div", class_="business-entry")
    for entry in business_entries:
        name = entry.find( elementname, class_ = elementClass).get_text(strip=True) if entry.find(elementname, class_=elementClass) else "N/A"
        email = entry.find("span", class_="email").get_text(strip=True) if entry.find("span", class_="email") else "N/A"
        # add more spans if needed and change the type of needed to a p or anything else
        leads.append({
            "source": "business-entry",
            "name": name,
            "email": email
        })
    return leads