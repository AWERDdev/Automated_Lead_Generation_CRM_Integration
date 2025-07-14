from bs4 import BeautifulSoup
import csv

# Open the local HTML file directly
with open("test.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

leads = []
for entry in soup.select(".business-entry"):
    name_elem = entry.select_one(".name")
    email_elem = entry.select_one(".email")
    name = name_elem.text if name_elem else ""
    email = email_elem.text if email_elem else ""
    leads.append({"name": name, "email": email})

with open("leads.csv", "w", newline="") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["name", "email"])
    writer.writeheader()
    writer.writerows(leads)

print("Leads saved to leads.csv")