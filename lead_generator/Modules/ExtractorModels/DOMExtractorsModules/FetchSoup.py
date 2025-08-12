import logging
import httpx
from bs4 import BeautifulSoup

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

async def get_soup(url: str):
    """Fetch and parse the URL into a BeautifulSoup object (async)"""
    try:
        logging.info(f"Fetching content from {url}")
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)
            response.raise_for_status()
            return BeautifulSoup(response.text, "lxml")
    except httpx.RequestError as e:
        logging.error(f"Error fetching the URL: {e}")
    except httpx.HTTPStatusError as e:
        logging.error(f"HTTP error {e.response.status_code} for {url}")
    return None
