import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def extract_from_data_attrs(
    soup,
    element_name=None,
    element_class=None,
    required_attrs=None,
    attributes=None,
    multiple_elements=None,
    multiple_source_elements=None,
    dynamic_fields=None
):
    required_attrs = required_attrs or ["data-name", "data-email"]

    # Merge attributes + dynamic_fields (dynamic_fields will overwrite attributes if same keys)
    attributes = {**(attributes or {}), **(dynamic_fields or {})}

    elements_to_search = multiple_elements or ([element_name] if element_name else [])
    source_elements_to_search = multiple_source_elements or ([element_name] if element_name else [])

    leads = []

    for current_element in elements_to_search:
        if not current_element:
            continue
        entries = soup.find_all(current_element, class_=element_class)

        for entry_index, entry in enumerate(entries, 1):
            if not all(entry.has_attr(attr) for attr in required_attrs):
                logging.debug(f"Skipping entry #{entry_index} due to missing required attributes")
                continue

            lead = {"source": f"{current_element}-{element_class or 'no-class'}"}
            logging.debug(f"Processing entry #{entry_index}")

            for field_name, attr_name in attributes.items():
                value = entry.attrs.get(attr_name, "N/A")  # safer than entry.get()

                if value == "N/A":
                    logging.debug(f"Attribute '{attr_name}' not found in entry #{entry_index}")
                    continue

                lead[field_name] = value

            for source_elem in source_elements_to_search:
                child_element = entry.find(source_elem, class_=element_class) if element_class else entry.find(source_elem)
                if child_element:
                    lead[f"{source_elem}_text"] = child_element.get_text(strip=True)

            if any(value != "N/A" for key, value in lead.items() if key != "source"):
                leads.append(lead)

    logging.info(f"Total leads extracted: {len(leads)}")
    return leads
