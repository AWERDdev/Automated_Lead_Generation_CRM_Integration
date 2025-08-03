import re
import logging
import json
# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def _get_nested(data, path, default="N/A"):
    """Traverse nested JSON keys using dotted path notation."""
    keys = path.split(".")
    for key in keys:
        if isinstance(data, dict) and key in data:
            data = data[key]
        else:
            return default
    return data



def extract_from_json_ld(soup, element_name="script", type_attr="application/ld+json",
                         schema_type=("Person",), fields=None):
    """Extract structured data from JSON-LD."""
    if soup is None:
        logging.warning("No BeautifulSoup object provided.")
        return []
    
    if isinstance(schema_type, str):
        schema_type = (schema_type,)
    schema_type = {t.lower() for t in schema_type}  # case-insensitive matching

    if fields is None:
        fields = {
            "name": "name",
            "email": "email",
            "phone": "telephone",
            "url": "url"
        }

    logging.info(f"Searching for JSON-LD <{element_name} type={type_attr}> elements...")
    leads = []
    scripts = soup.find_all(element_name, type=type_attr)
    
    for script in scripts:
        try:
            raw_json = script.string or script.get_text()
            if not raw_json.strip():
                continue
            
            data = json.loads(raw_json)

            # Normalize to a list of objects
            candidates = []
            if isinstance(data, dict):
                if "@graph" in data and isinstance(data["@graph"], list):
                    candidates.extend(data["@graph"])
                else:
                    candidates.append(data)
            elif isinstance(data, list):
                candidates.extend(data)

            for node in candidates:
                if not isinstance(node, dict):
                    continue

                node_types = node.get("@type")
                if not node_types:
                    continue
                if isinstance(node_types, str):
                    node_types = [node_types]
                node_types = {t.lower() for t in node_types}

                # Match against expected schema types
                if schema_type & node_types:
                    lead = {"source": f"{element_name}-{','.join(schema_type)}"}
                    for field_name, json_path in fields.items():
                        lead[field_name] = _get_nested(node, json_path)
                    leads.append(lead)

        except json.JSONDecodeError as e:
            logging.warning(f"Invalid JSON-LD: {e}")
        except Exception as e:
            logging.error(f"Unexpected error parsing JSON-LD: {e}")

    logging.info(f"Extracted {len(leads)} leads from {len(scripts)} JSON-LD blocks.")
    return leads
