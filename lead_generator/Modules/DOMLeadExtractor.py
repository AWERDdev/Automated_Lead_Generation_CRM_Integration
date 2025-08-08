import logging
import re

from Modules.ExtractorModels.DOMExtractorsModules.FetchSoup import get_soup
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Tables import extract_from_tables
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_ListItems import extract_from_list_items
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_data_attrs import extract_from_data_attrs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_JSONLD import extract_from_json_ld
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Images import extract_from_images
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Adress import extract_from_address
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Divs import extract_from_divs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Paragraphs import extract_from_paragraphs

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

