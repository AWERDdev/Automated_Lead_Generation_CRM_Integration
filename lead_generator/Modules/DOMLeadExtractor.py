import logging
from lead_generator.Modules.Models.DOMExtractorsModles.FetchSoup import get_soup
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_Tables import extract_from_tables
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_ListItems import extract_from_list_items
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_data_attrs import extract_from_data_attrs
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_JSONLD import extract_from_json_ld
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_Images import extract_from_images
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_Adress import extract_from_address
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_Divs import extract_from_divs
from lead_generator.Modules.Models.DOMExtractorsModles.Extractors_Paragraphs import extract_from_paragraphs

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


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