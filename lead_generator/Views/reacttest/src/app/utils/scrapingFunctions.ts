

export const ScrapeDivs = async () => {
  console.log("scraping divs")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "div",
    element_class: "business-entry",
    source_element: "span",
    source_class: "name",
    multiple_elements: ["div", "span", "p"],
    multiple_source_elements: ["h1", "h2", "h3", "p", "span"],
    dynamic_fields: {
      "name": {"element": "span", "class": "name"},
      "email": {"element": "span", "class": "email"},
      "phone": {"element": "span", "class": "phone"},
      "role": {"element": "span", "class": "role"},
      "company": {"element": "span", "class": "company"},
      "website": {"element": "a", "attribute": "href"},
      "linkedin": {"element": "a", "attribute": "href", "regex": "linkedin\\.com"}
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/divs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Divs response', data)
  } catch(error) {
    console.log(`Failed to Scrape divs: ${error}`)
  }
}

export const ScrapeParagraphs = async () => {
  console.log("scraping paragraphs")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "p",
    element_class: "contact-info",
    multiple_elements: ["p", "div", "span"],
    multiple_source_elements: ["h1", "h2", "h3", "p", "div"],
    patterns: {
      "name": "Name:\\s*([^,]+)",
      "email": "Email:\\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
      "phone": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)",
      "hours": "Hours:\\s*([^,]+)",
      "address": "Address:\\s*([^,]+)",
      "website": "Website:\\s*([^,]+)",
      "linkedin": "LinkedIn:\\s*([^,]+)"
    },
    dynamic_fields: {
      "name": {"regex": "Name:\\s*([^,]+)"},
      "email": {"regex": "Email:\\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})"},
      "phone": {"regex": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)"},
      "role": {"regex": "Role:\\s*([^,]+)"},
      "company": {"regex": "Company:\\s*([^,]+)"}
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/paragraphs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Paragraphs response', data)
  } catch(error) {
    console.log(`Failed to Scrape paragraphs: ${error}`)
  }
}

export const ScrapeListItems = async () => {
  console.log("scraping list items")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "ul",
    element_class: "team-members",
    item_element: "li",
    multiple_elements: ["ul", "ol", "div"],
    multiple_source_elements: ["li", "div", "span", "strong"],
    dynamic_fields: {
      "name": {"element": "strong"},
      "role": {"element": "span", "class": "role"},
      "email": {"element": "a", "attribute": "href", "transform": "mailto:"},
      "phone": {"element": "span", "class": "phone"},
      "department": {"element": "span", "class": "department"},
      "linkedin": {"element": "a", "attribute": "href", "regex": "linkedin\\.com"},
      "twitter": {"element": "a", "attribute": "href", "regex": "twitter\\.com"}
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/list_items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('List items response', data)
  } catch(error) {
    console.log(`Failed to Scrape list items: ${error}`)
  }
}

export const ScrapeImages = async () => {
  console.log("scraping images")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "figure",
    element_class: "team-photo",
    image_element: "img",
    caption_element: "figcaption",
    multiple_elements: ["figure", "div", "img"],
    multiple_source_elements: ["img", "figcaption", "div", "span"],
    dynamic_fields: {
      "name": {"element": "img", "attribute": "alt"},
      "role": {"element": "figcaption", "regex": "Role:\\s*([^,]+)"},
      "email": {"element": "figcaption", "regex": "([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})"},
      "phone": {"element": "figcaption", "regex": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)"},
      "department": {"element": "figcaption", "regex": "Department:\\s*([^,]+)"},
      "linkedin": {"element": "figcaption", "regex": "LinkedIn:\\s*([^,]+)"}
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Images response', data)
  } catch(error) {
    console.log(`Failed to Scrape images: ${error}`)
  }
}

export const ScrapeDataAttributes = async () => {
  console.log("scraping data attributes")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "div",
    element_class: "employee-card",
    multiple_elements: ["div", "span", "p"],
    multiple_source_elements: ["div", "span", "p"],
    required_attrs: ["data-name", "data-email", "data-position"],
    attributes: {
      "name": "data-name",
      "email": "data-email",
      "position": "data-position"
    },
    dynamic_fields: {
      "name": "data-name",
      "email": "data-email",
      "position": "data-position",
      "phone": "data-phone",
      "department": "data-department",
      "linkedin": "data-linkedin",
      "twitter": "data-twitter",
      "website": "data-website"
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_data_attrs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Data attributes response', data)
  } catch(error) {
    console.log(`Failed to Scrape data attributes: ${error}`)
  }
}

export const ScrapeJsonLd = async () => {
  console.log("scraping JSON-LD")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "script",
    type_attr: "application/ld+json",
    schema_type: "Person",
    multiple_elements: ["script", "div"],
    multiple_source_elements: ["script", "div"],
    dynamic_fields: {
      "name": "name",
      "email": "email",
      "telephone": "telephone",
      "jobTitle": "jobTitle",
      "worksFor": "worksFor.name",
      "address": "address.streetAddress",
      "city": "address.addressLocality",
      "state": "address.addressRegion",
      "zipCode": "address.postalCode",
      "country": "address.addressCountry"
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_json_ld`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('JSON-LD response', data)
  } catch(error) {
    console.log(`Failed to Scrape JSON-LD: ${error}`)
  }
}

export const ScrapeAddress = async () => {
  console.log("scraping address")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "address",
    element_class: "mt-2 not-italic",
    source_element: "div",
    source_class: "bg-white p-4 border rounded",
    multiple_elements: ["address", "div", "p"],
    multiple_source_elements: ["h1", "h2", "h3", "p", "div"],
    patterns: {
      "contact": "Contact:\\s*([^,]+)",
      "phone": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)",
      "street": "Street:\\s*([^,]+)",
      "city": "City:\\s*([^,]+)",
      "country": "Country:\\s*([^,]+)",
      "zip": "ZIP:\\s*([^,]+)",
      "state": "State:\\s*([^,]+)"
    },
    dynamic_fields: {
      "street": {"regex": "Street:\\s*([^,]+)"},
      "city": {"regex": "City:\\s*([^,]+)"},
      "state": {"regex": "State:\\s*([^,]+)"},
      "zip": {"regex": "ZIP:\\s*([^,]+)"},
      "country": {"regex": "Country:\\s*([^,]+)"},
      "contact": {"regex": "Contact:\\s*([^,]+)"},
      "phone": {"regex": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)"}
    }
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Address response', data)
  } catch(error) {
    console.log(`Failed to Scrape address: ${error}`)
  }
}

export const ScrapeTables = async () => {
  console.log("scraping tables")
  const url = 'http://localhost:3000/page1'
  const config = {
    element_name: "table",
    element_class: "contact-table w-full border-collapse border",
    row_element: "tr",
    cell_element: "td",
    header_rows: 1,
    multiple_elements: ["table", "div"],
    multiple_source_elements: ["tr", "div"],
    fields: ["name", "email", "phone", "role", "department", "company"]
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Tables response', data)
  } catch(error) {
    console.log(`Failed to Scrape tables: ${error}`)
  }
} 