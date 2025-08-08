// Dynamic field configuration examples for DOM lead extraction

// Example 1: Basic dynamic field configuration for divs
export const createDynamicDivConfig = (customFields: Record<string, any>) => {
  return {
    element_name: "div",
    element_class: "business-entry",
    multiple_elements: ["div", "span", "p"],
    multiple_source_elements: ["h1", "h2", "h3", "p", "span"],
    dynamic_fields: customFields
  }
}

// Example 2: Dynamic field configuration for paragraphs with regex patterns
export const createDynamicParagraphConfig = (customPatterns: Record<string, string>) => {
  return {
    element_name: "p",
    element_class: "contact-info",
    multiple_elements: ["p", "div", "span"],
    multiple_source_elements: ["h1", "h2", "h3", "p", "div"],
    patterns: customPatterns,
    dynamic_fields: Object.fromEntries(
      Object.entries(customPatterns).map(([key, pattern]) => [
        key, 
        { regex: pattern }
      ])
    )
  }
}

// Example 3: Dynamic field configuration for images
export const createDynamicImageConfig = (customFields: Record<string, any>) => {
  return {
    element_name: "figure",
    element_class: "team-photo",
    image_element: "img",
    caption_element: "figcaption",
    multiple_elements: ["figure", "div", "img"],
    multiple_source_elements: ["img", "figcaption", "div", "span"],
    dynamic_fields: customFields
  }
}

// Example 4: Dynamic field configuration for data attributes
export const createDynamicDataAttrConfig = (customFields: Record<string, string>) => {
  return {
    element_name: "div",
    element_class: "employee-card",
    multiple_elements: ["div", "span", "p"],
    multiple_source_elements: ["div", "span", "p"],
    required_attrs: Object.values(customFields),
    attributes: customFields,
    dynamic_fields: customFields
  }
}

// Example 5: Dynamic field configuration for tables
export const createDynamicTableConfig = (customFields: string[]) => {
  return {
    element_name: "table",
    element_class: "contact-table",
    row_element: "tr",
    cell_element: "td",
    header_rows: 1,
    multiple_elements: ["table", "div"],
    multiple_source_elements: ["tr", "div"],
    fields: customFields
  }
}

// Example usage functions
export const scrapeWithCustomDivFields = async (url: string, customFields: Record<string, any>) => {
  const config = createDynamicDivConfig(customFields)
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/divs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Custom div fields response', data)
    return data
  } catch(error) {
    console.log(`Failed to scrape with custom div fields: ${error}`)
    return null
  }
}

export const scrapeWithCustomParagraphPatterns = async (url: string, customPatterns: Record<string, string>) => {
  const config = createDynamicParagraphConfig(customPatterns)
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/paragraphs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Custom paragraph patterns response', data)
    return data
  } catch(error) {
    console.log(`Failed to scrape with custom paragraph patterns: ${error}`)
    return null
  }
}

export const scrapeWithCustomImageFields = async (url: string, customFields: Record<string, any>) => {
  const config = createDynamicImageConfig(customFields)
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Custom image fields response', data)
    return data
  } catch(error) {
    console.log(`Failed to scrape with custom image fields: ${error}`)
    return null
  }
}

export const scrapeWithCustomDataAttrs = async (url: string, customFields: Record<string, string>) => {
  const config = createDynamicDataAttrConfig(customFields)
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_data_attrs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Custom data attributes response', data)
    return data
  } catch(error) {
    console.log(`Failed to scrape with custom data attributes: ${error}`)
    return null
  }
}

export const scrapeWithCustomTableFields = async (url: string, customFields: string[]) => {
  const config = createDynamicTableConfig(customFields)
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/DOMLeads/extract_from_table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, config })
    })
    const data = await response.json()
    console.log('Custom table fields response', data)
    return data
  } catch(error) {
    console.log(`Failed to scrape with custom table fields: ${error}`)
    return null
  }
}

// Example usage scenarios
export const exampleUsage = async () => {
  const url = 'http://localhost:3000/page1'
  
  // Example 1: Custom div fields
  const customDivFields = {
    "name": {"element": "span", "class": "name"},
    "email": {"element": "span", "class": "email"},
    "phone": {"element": "span", "class": "phone"},
    "role": {"element": "span", "class": "role"},
    "company": {"element": "span", "class": "company"},
    "website": {"element": "a", "attribute": "href"},
    "linkedin": {"element": "a", "attribute": "href", "regex": "linkedin\\.com"},
    "twitter": {"element": "a", "attribute": "href", "regex": "twitter\\.com"},
    "github": {"element": "a", "attribute": "href", "regex": "github\\.com"}
  }
  
  // Example 2: Custom paragraph patterns
  const customParagraphPatterns = {
    "name": "Name:\\s*([^,]+)",
    "email": "Email:\\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
    "phone": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)",
    "role": "Role:\\s*([^,]+)",
    "company": "Company:\\s*([^,]+)",
    "address": "Address:\\s*([^,]+)",
    "website": "Website:\\s*([^,]+)",
    "linkedin": "LinkedIn:\\s*([^,]+)",
    "twitter": "Twitter:\\s*([^,]+)",
    "github": "GitHub:\\s*([^,]+)"
  }
  
  // Example 3: Custom image fields
  const customImageFields = {
    "name": {"element": "img", "attribute": "alt"},
    "role": {"element": "figcaption", "regex": "Role:\\s*([^,]+)"},
    "email": {"element": "figcaption", "regex": "([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})"},
    "phone": {"element": "figcaption", "regex": "Phone:\\s*([\\d\\s\\(\\)\\-\\+]+)"},
    "department": {"element": "figcaption", "regex": "Department:\\s*([^,]+)"},
    "linkedin": {"element": "figcaption", "regex": "LinkedIn:\\s*([^,]+)"},
    "twitter": {"element": "figcaption", "regex": "Twitter:\\s*([^,]+)"},
    "github": {"element": "figcaption", "regex": "GitHub:\\s*([^,]+)"}
  }
  
  // Example 4: Custom data attributes
  const customDataAttrs = {
    "name": "data-name",
    "email": "data-email",
    "position": "data-position",
    "phone": "data-phone",
    "department": "data-department",
    "linkedin": "data-linkedin",
    "twitter": "data-twitter",
    "website": "data-website",
    "github": "data-github"
  }
  
  // Example 5: Custom table fields
  const customTableFields = ["name", "email", "phone", "role", "department", "company", "linkedin", "twitter", "github"]
  
  // Execute examples
  console.log("Running dynamic field examples...")
  
  await scrapeWithCustomDivFields(url, customDivFields)
  await scrapeWithCustomParagraphPatterns(url, customParagraphPatterns)
  await scrapeWithCustomImageFields(url, customImageFields)
  await scrapeWithCustomDataAttrs(url, customDataAttrs)
  await scrapeWithCustomTableFields(url, customTableFields)
} 