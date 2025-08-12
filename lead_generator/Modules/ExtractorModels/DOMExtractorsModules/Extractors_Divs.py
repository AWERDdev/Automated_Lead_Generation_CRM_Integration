import re
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def extract_from_divs(soup, element_name="div", element_class="business-entry", 
                      source_element="h2", source_class="business-name", 
                      fields=None, multiple_elements=None, multiple_source_elements=None, 
                      dynamic_fields=None):
    """Extract leads from div elements with business-entry class"""

    logging.info(f"Extracting data from <{element_name}> with class '{element_class}'")
    leads = []

    # Default fields if none provided
    if fields is None:
        fields = {
            "name": {"element": source_element, "class": source_class},
            "email": {"element": "span", "class": "email"}
        }

    # Use dynamic fields if provided
    if dynamic_fields:
        fields = dynamic_fields

    elements_to_search = multiple_elements or [element_name]
    source_elements_to_search = multiple_source_elements or [source_element]

    for current_element in elements_to_search:
        business_entries = soup.find_all(current_element, class_=element_class)

        for entry_index, entry in enumerate(business_entries, 1):
            lead = {"source": f"{current_element}-{element_class}"}
            logging.debug(f"Processing entry #{entry_index}")

            for field_name, field_config in fields.items():
                field_element = field_config.get("element", "span")
                field_class = field_config.get("class")
                field_attr = field_config.get("attribute")
                field_transform = field_config.get("transform")
                field_regex = field_config.get("regex")

                # Try to find using source_elements
                element = None
                for source_elem in source_elements_to_search:
                    if field_class:
                        element = entry.find(source_elem, class_=field_class)
                    else:
                        element = entry.find(source_elem)
                    if element:
                        break

                # Fallback: use field_element
                if not element:
                    if field_class:
                        element = entry.find(field_element, class_=field_class)
                    else:
                        element = entry.find(field_element)

                # Extract or log missing field
                if element:
                    if field_regex:
                        text = element.get_text()
                        match = re.search(field_regex, text)
                        value = match.group(1) if match else "N/A"
                    elif field_attr and field_attr in element.attrs:
                        value = element[field_attr]
                    else:
                        value = element.get_text(strip=True)

                    if field_transform and value != "N/A":
                        if field_transform == "mailto:" and value.startswith("mailto:"):
                            value = value.replace("mailto:", "")
                        elif callable(field_transform):
                            value = field_transform(value)
                else:
                    value = "N/A"
                    logging.warning(
                        f"Missing field '{field_name}' in entry #{entry_index} "
                        f"({current_element}.{element_class})"
                    )

                lead[field_name] = value

            # Only add lead if it has meaningful data
            if any(value != "N/A" for field, value in lead.items() if field != "source"):
                leads.append(lead)

    logging.info(f"Total leads extracted: {len(leads)}")
    return leads
