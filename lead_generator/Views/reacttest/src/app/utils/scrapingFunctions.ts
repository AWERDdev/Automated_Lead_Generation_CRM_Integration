// Scraping functions for DOM lead extraction

export const scrapeWithConfig = async () => {
  console.log("scraping with general config")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_class: "business-entry",
    source_element: "div",
    source_class: "mt-2",
    element_name: "div",
    fields: "name,email,phone"
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

export const scrapeDivs = async () => {
  console.log("scraping divs")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "div",
    element_class: "business-entry",
    source_element: "span",
    source_class: "name,email,phone"
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

export const scrapeParagraphs = async () => {
  console.log("scraping paragraphs")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "p",
    element_class: "contact-info",
    patterns: ["Name:", "Email:", "Phone:", "Hours:"],
    fields: ["name", "email", "phone", "hours"]
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

export const scrapeListItems = async () => {
  console.log("scraping list items")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "ul",
    element_class: "team-members",
    item_element: "li",
    fields: ["name", "role", "email"]
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

export const scrapeImages = async () => {
  console.log("scraping images")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "figure",
    element_class: "team-photo",
    image_element: "img",
    caption_element: "figcaption",
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

export const scrapeDataAttributes = async () => {
  console.log("scraping data attributes")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "div",
    element_class: "employee-card",
    required_attrs: ["data-name", "data-email", "data-position"],
    attributes: ["data-name", "data-email", "data-position"]
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

export const scrapeJsonLd = async () => {
  console.log("scraping JSON-LD")
  const url = 'http://localhost:3000/page1'
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

export const scrapeAddress = async () => {
  console.log("scraping address")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "address",
    element_class: "mt-2 not-italic",
    source_element: "div",
    source_class: "bg-white p-4 border rounded",
    patterns: ["Contact:", "Phone:"],
    fields: ["street", "city", "country", "contact", "phone"]
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

export const scrapeTables = async () => {
  console.log("scraping tables")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "table",
    element_class: "contact-table w-full border-collapse border",
    row_element: "tr",
    cell_element: "td",
    header_rows: 1
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