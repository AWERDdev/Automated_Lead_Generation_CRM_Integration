import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

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
