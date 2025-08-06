// Scraping functions for DOM lead extraction - Page 2

export const scrapeWithConfigPage2 = async () => {
  console.log("scraping with general config")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_class: "contact-block",
    source_element: "div",
    source_class: "contact-details",
    element_name: "div",
    fields: "name,email,phone,role"
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/config/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('General config response', data)
  } catch(error) {
    console.log(`Failed to scrape with config: ${error}`)
  }
}

export const scrapeDivsPage2 = async () => {
  console.log("scraping divs")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "div",
    element_class: "contact-block",
    source_element: "div",
    source_class: "contact-details"
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/divs/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('Divs response', data)
  } catch(error) {
    console.log(`Failed to scrape divs: ${error}`)
  }
}

export const scrapeParagraphsPage2 = async () => {
  console.log("scraping paragraphs")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "p",
    element_class: "comment-text mt-2",
    patterns: ["Email:", "Phone:", "Contact:", "reach me at", "my contact is", "email me at"],
    fields: ["name", "email", "phone"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/paragraphs/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('Paragraphs response', data)
  } catch(error) {
    console.log(`Failed to scrape paragraphs: ${error}`)
  }
}

export const scrapeListItemsPage2 = async () => {
  console.log("scraping list items")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "ul",
    element_class: "ml-4 mt-1 space-y-2",
    item_element: "li",
    fields: ["name", "email"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/list_items/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('List items response', data)
  } catch(error) {
    console.log(`Failed to scrape list items: ${error}`)
  }
}

export const scrapeImagesPage2 = async () => {
  console.log("scraping images")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "div",
    element_class: "svg-card p-3 bg-white border rounded",
    image_element: "svg",
    caption_element: "div",
    fields: ["name", "role", "email"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/images/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('Images response', data)
  } catch(error) {
    console.log(`Failed to scrape images: ${error}`)
  }
}

export const scrapeDataAttributesPage2 = async () => {
  console.log("scraping data attributes")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "div",
    element_class: "staff-entry p-3 bg-white border rounded",
    required_attrs: ["data-name", "data-email", "data-title"],
    attributes: ["data-name", "data-email", "data-title"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_data_attrs/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('Data attributes response', data)
  } catch(error) {
    console.log(`Failed to scrape data attributes: ${error}`)
  }
}

export const scrapeJsonLdPage2 = async () => {
  console.log("scraping JSON-LD")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "script",
    type_attr: "application/ld+json",
    schema_type: "Person",
    fields: ["name", "email", "telephone"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_json_ld/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('JSON-LD response', data)
  } catch(error) {
    console.log(`Failed to scrape JSON-LD: ${error}`)
  }
}

export const scrapeAddressPage2 = async () => {
  console.log("scraping address")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "address",
    element_class: "contact-address",
    source_element: "div",
    source_class: "address-container",
    patterns: ["Street:", "City:", "Phone:"],
    fields: ["street", "city", "phone"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_address/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('Address response', data)
  } catch(error) {
    console.log(`Failed to scrape address: ${error}`)
  }
}

export const scrapeTablesPage2 = async () => {
  console.log("scraping tables")
  const url = 'http://localhost:3000/page2'
  const config = {
    element_name: "dl",
    element_class: "staff-directory grid grid-cols-1 md:grid-cols-2 gap-4",
    row_element: "div",
    cell_element: "dd",
    header_rows: 0
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_table/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    const data = await response.json()
    console.log('Tables response', data)
  } catch(error) {
    console.log(`Failed to scrape tables: ${error}`)
  }
} 