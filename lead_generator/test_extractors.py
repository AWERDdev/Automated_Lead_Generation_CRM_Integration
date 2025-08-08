#!/usr/bin/env python3
"""
Test script to verify that all extractor functions work correctly
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from Modules.ExtractorModels.DOMExtractorsModules.FetchSoup import get_soup
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Divs import extract_from_divs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Paragraphs import extract_from_paragraphs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Images import extract_from_images
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_ListItems import extract_from_list_items
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Tables import extract_from_tables
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_data_attrs import extract_from_data_attrs
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_Adress import extract_from_address
from Modules.ExtractorModels.DOMExtractorsModules.Extractors_JSONLD import extract_from_json_ld

def test_extractors():
    """Test all extractor functions with a simple HTML file"""
    
    # Test HTML content
    test_html = """
    <html>
        <body>
            <div class="business-entry">
                <span class="name">Alice Smith</span>
                <span class="email">alice@example.com</span>
            </div>
            <div class="business-entry">
                <span class="name">Bob Jones</span>
                <span class="email">bob@example.com</span>
            </div>
            <p class="contact-info">Name: John Doe, Email: john@example.com, Phone: 555-1234</p>
            <ul class="team-members">
                <li><strong>Jane Doe</strong><a href="mailto:jane@example.com">jane@example.com</a></li>
            </ul>
            <table class="contact-table">
                <tr><td>Name</td><td>Email</td></tr>
                <tr><td>Test User</td><td>test@example.com</td></tr>
            </table>
            <figure class="team-photo">
                <img alt="Team Member" src="photo.jpg">
                <figcaption>Contact: member@example.com</figcaption>
            </figure>
            <div class="employee-card" data-name="Employee" data-email="employee@example.com" data-position="Developer">
                Employee Info
            </div>
            <address>Contact: address@example.com</address>
        </body>
    </html>
    """
    
    # Create a simple file to test with
    test_file_path = "test_extractors.html"
    with open(test_file_path, "w") as f:
        f.write(test_html)
    
    try:
        # Get soup from the test file
        soup = get_soup(f"file://{os.path.abspath(test_file_path)}")
        
        if soup is None:
            print("❌ Failed to get soup from test file")
            return False
        
        print("✅ Successfully created soup object")
        
        # Test each extractor
        extractors_to_test = [
            ("Divs", extract_from_divs, {"element_name": "div", "element_class": "business-entry"}),
            ("Paragraphs", extract_from_paragraphs, {"element_name": "p", "element_class": "contact-info"}),
            ("List Items", extract_from_list_items, {"element_name": "ul", "element_class": "team-members"}),
            ("Tables", extract_from_tables, {"element_name": "table", "element_class": "contact-table"}),
            ("Images", extract_from_images, {"element_name": "figure", "element_class": "team-photo"}),
            ("Data Attributes", extract_from_data_attrs, {"element_name": "div", "element_class": "employee-card"}),
            ("Address", extract_from_address, {"element_name": "address"}),
        ]
        
        all_passed = True
        
        for name, extractor_func, config in extractors_to_test:
            try:
                print(f"\nTesting {name} extractor...")
                results = extractor_func(soup, **config)
                print(f"✅ {name}: Found {len(results)} leads")
                for lead in results:
                    print(f"   - {lead}")
            except Exception as e:
                print(f"❌ {name}: Error - {e}")
                all_passed = False
        
        if all_passed:
            print("\n🎉 All extractors passed!")
        else:
            print("\n⚠️  Some extractors failed!")
            
        return all_passed
        
    finally:
        # Clean up test file
        if os.path.exists(test_file_path):
            os.remove(test_file_path)

if __name__ == "__main__":
    test_extractors() 