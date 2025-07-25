import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()

@app.get("/scrape-leads")
def scrape_leads():
    # The URL you want to scrape
    url = "http://172.17.80.1:3000/lead_generator/Views/index.html"

    # Fetch the page
    response = requests.get(url)
    response.raise_for_status()  # Raises an error if the request failed

    # Parse the HTML
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all business entries
    business_entries = soup.find_all("div", class_="business-entry")

    # Extract data from each entry
    leads = []
    for entry in business_entries:
        name = entry.find("span", class_="name").get_text(strip=True)
        email = entry.find("span", class_="email").get_text(strip=True)
        leads.append({
            "name": name,
            "email": email
        })
        print(f"Name: {name} | Email: {email}")

    return {"leads": leads}

# This will execute when the script is run directly
if __name__ == "__main__":
    results = scrape_leads()
    print("Scraped data:", results)

# uvicorn lead_generator:app --reload