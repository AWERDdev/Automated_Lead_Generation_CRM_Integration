import logging
import httpx
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

ua = UserAgent()

async def get_soup(url: str):
    """Fetch and parse the URL into a BeautifulSoup object (async)"""
    headers = {
        "User-Agent": ua.random,  # Generate a fresh random User-Agent per request
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.google.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
    }
    try:
        logging.info(f"Fetching content from {url} with User-Agent: {headers['User-Agent']}")
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url, headers=headers)  # <-- Pass headers here
            response.raise_for_status()
            return BeautifulSoup(response.text, "lxml")
    except httpx.RequestError as e:
        logging.error(f"Error fetching the URL: {e}")
    except httpx.HTTPStatusError as e:
        logging.error(f"HTTP error {e.response.status_code} for {url}")
    return None
