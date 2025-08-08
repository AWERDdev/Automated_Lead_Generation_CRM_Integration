import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def extract_from_list_items(
    soup,
    element_name=None,
    element_class=None,
    item_element="li",
    fields=None,
    dynamic_fields=None,
    multiple_elements=None,
    multiple_source_elements=None
):
    """Extract data from multiple list-like structures in HTML"""
    if soup is None:
        logging.warning("Soup is None. Nothing to extract.")
        return []

    logging.info(f"Extracting data from <{element_name}> with class '{element_class}'")
    leads = []

    # Use dynamic fields if provided
    if dynamic_fields:
        fields = dynamic_fields
    elif fields is None:
        # Default fallback fields
        fields = {
            "name": {"element": "span"},
            "email": {"element": "span", "class": "email"},
        }

    # Handle multiple elements and source elements
    elements_to_search = multiple_elements or [element_name]
    source_elements_to_search = multiple_source_elements or [item_element]

    for current_element in elements_to_search:
        logging.debug(f"Searching inside <{current_element}> with class '{element_class}'")
        list_containers = soup.find_all(current_element, class_=element_class) if element_class else soup.find_all(current_element)

        for container in list_containers:
            for current_source_elem in source_elements_to_search:
                items = container.find_all(current_source_elem)
                logging.debug(f"Found {len(items)} <{current_source_elem}> elements in <{current_element}>")

                for item in items:
                    lead = {"source": f"{current_element}-{element_class}"}

                    for field_name, field_config in fields.items():
                        field_element = field_config.get("element", "span")
                        field_class = field_config.get("class")
                        field_attr = field_config.get("attribute")
                        field_transform = field_config.get("transform")
                        field_regex = field_config.get("regex")

                        # First try to use source elements
                        element = None
                        for source_tag in source_elements_to_search:
                            if field_class:
                                element = item.find(source_tag, class_=field_class)
                            else:
                                element = item.find(source_tag)
                            if element:
                                break

                        # Fallback: use declared field_element
                        if not element:
                            if field_class:
                                element = item.find(field_element, class_=field_class)
                            else:
                                element = item.find(field_element)

                        # Extract value
                        if element:
                            if field_regex:
                                text = element.get_text()
                                match = re.search(field_regex, text)
                                value = match.group(1) if match else "N/A"
                            elif field_attr and field_attr in element.attrs:
                                value = element[field_attr]
                            else:
                                value = element.get_text(strip=True)

                            # Apply transformation if needed
                            if field_transform and value != "N/A":
                                if field_transform == "mailto:" and value.startswith("mailto:"):
                                    value = value.replace("mailto:", "")
                                elif callable(field_transform):
                                    value = field_transform(value)
                        else:
                            value = "N/A"
                            logging.warning(
                                f"Missing field '{field_name}' in list item "
                                f"({current_element}.{element_class})"
                            )

                        lead[field_name] = value

                    if any(value != "N/A" for field, value in lead.items() if field != "source"):
                        leads.append(lead)

    logging.info(f"Total leads extracted: {len(leads)}")
    return leads
