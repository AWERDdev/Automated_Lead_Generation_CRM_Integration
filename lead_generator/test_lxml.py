#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import time

def test_lxml():
    """Test lxml vs html.parser performance"""
    
    # Test HTML
    test_html = """
    <html>
        <body>
            <div class="business-entry">
                <span class="name">Test Name</span>
                <span class="email">test@example.com</span>
            </div>
        </body>
    </html>
    """
    
    print("Testing lxml parser...")
    start = time.time()
    soup_lxml = BeautifulSoup(test_html, "lxml")
    lxml_time = time.time() - start
    
    print("Testing html.parser...")
    start = time.time()
    soup_html = BeautifulSoup(test_html, "html.parser")
    html_time = time.time() - start
    
    print(f"lxml parsing time: {lxml_time:.4f}s")
    print(f"html.parser time: {html_time:.4f}s")
    
    # Test extraction
    lxml_result = soup_lxml.find("span", class_="name")
    html_result = soup_html.find("span", class_="name")
    
    print(f"lxml found: {lxml_result.text if lxml_result else 'None'}")
    print(f"html.parser found: {html_result.text if html_result else 'None'}")
    
    print("✅ lxml is working correctly!")

if __name__ == "__main__":
    test_lxml() 