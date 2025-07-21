import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()

# The URL you want to scrape
url = "https://example.com"

# Fetch the page
response = requests.get(url)
response.raise_for_status()  # Raises an error if the request failed

# Parse the HTML
soup = BeautifulSoup(response.text, "html.parser")

# Find all links
for link in soup.find_all("a"):
    href = link.get("href")
    text = link.get_text(strip=True)
    print(f"Text: {text} | URL: {href}")