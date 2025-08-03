import React from 'react';

export default function TestDOMExtractorAdvancedPage() {
  // Function for general config route
  const scrapeWithConfig = async () => {
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

  // Function for divs route
  const scrapeDivs = async () => {
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

  // Function for paragraphs route
  const scrapeParagraphs = async () => {
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

  // Function for list items route
  const scrapeListItems = async () => {
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

  // Function for images route
  const scrapeImages = async () => {
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

  // Function for data attributes route
  const scrapeDataAttributes = async () => {
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

  // Function for JSON-LD route
  const scrapeJsonLd = async () => {
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

  // Function for address route
  const scrapeAddress = async () => {
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

  // Function for tables route
  const scrapeTables = async () => {
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

  return (
<>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Nested Contact Information</h2>
        <div className="bg-white p-4 border rounded">
          <div className="departments-list">
            <div className="department">
              <h3 className="text-lg font-semibold">Sales Department</h3>
              <div className="team-lead">
                <div className="info-card p-3 bg-gray-50 rounded mt-2">
                  <p className="font-medium">Team Lead:</p>
                  <div className="ml-4">
                    <p>Jennifer Martinez</p>
                    <p className="text-sm text-blue-600">j.martinez@example.com</p>
                    <p className="text-sm">(555) 222-3333</p>
                  </div>
                </div>
              </div>
              <div className="team-members mt-3">
                <p className="font-medium">Team Members:</p>
                <ul className="ml-4 mt-1 space-y-2">
                  <li>
                    <span className="member-name">Carlos Rodriguez</span> - 
                    <span className="member-email">c.rodriguez@example.com</span>
                  </li>
                  <li>
                    <span className="member-name">Anna Johnson</span> - 
                    <span className="member-email">a.johnson@example.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Custom Formatted Contacts</h2>
        <div className="grid gap-4">
          <div className="contact-block p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="contact-header flex justify-between items-center">
              <h3 className="contact-name text-lg font-bold">Andrew Wilson</h3>
              <span className="contact-role px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">CEO</span>
            </div>
            <div className="contact-details mt-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="detail-label">Email:</div>
                <div className="detail-value">andrew@techcorp.com</div>
                <div className="detail-label">Phone:</div>
                <div className="detail-value">(555) 987-6543</div>
                <div className="detail-label">Office:</div>
                <div className="detail-value">New York</div>
              </div>
            </div>
          </div>
          
          <div className="contact-block p-4 bg-green-50 border border-green-200 rounded">
            <div className="contact-header flex justify-between items-center">
              <h3 className="contact-name text-lg font-bold">Stephanie Brooks</h3>
              <span className="contact-role px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">CTO</span>
            </div>
            <div className="contact-details mt-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="detail-label">Email:</div>
                <div className="detail-value">stephanie@techcorp.com</div>
                <div className="detail-label">Phone:</div>
                <div className="detail-value">(555) 123-4567</div>
                <div className="detail-label">Office:</div>
                <div className="detail-value">San Francisco</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments with Email Information</h2>
        <div className="comments-section bg-white p-4 border rounded">
          <div className="comment p-3 border-b">
            <div className="comment-header flex justify-between">
              <span className="comment-author font-medium">Michael Brown</span>
              <span className="comment-date text-sm text-gray-500">2023-05-15</span>
            </div>
            <p className="comment-text mt-2">
              Great article! I would love to discuss this further. You can reach me at michael.brown@gmail.com.
            </p>
          </div>
          
          <div className="comment p-3 border-b">
            <div className="comment-header flex justify-between">
              <span className="comment-author font-medium">Sarah Williams</span>
              <span className="comment-date text-sm text-gray-500">2023-05-14</span>
            </div>
            <p className="comment-text mt-2">
              I disagree with point #3. Lets connect to discuss - my contact is sarah.w@outlook.com or call me at 555-789-1234.
            </p>
          </div>
          
          <div className="comment p-3">
            <div className="comment-header flex justify-between">
              <span className="comment-author font-medium">David Chen</span>
              <span className="comment-date text-sm text-gray-500">2023-05-13</span>
            </div>
            <p className="comment-text mt-2">
              I am implementing something similar at my company. Feel free to email me at d.chen@company.org for collaboration.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">SVG Contact Cards</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="svg-card p-3 bg-white border rounded">
            <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="100" fill="#f8f9fa" rx="10" ry="10" />
              <text x="20" y="30" font-family="Arial" font-size="16" font-weight="bold">Jessica Thompson</text>
              <text x="20" y="55" font-family="Arial" font-size="14">Marketing Specialist</text>
              <text x="20" y="80" font-family="Arial" font-size="14" fill="#0066cc">jessica.t@example.com</text>
            </svg>
            <div className="visually-hidden">
              Contact: Jessica Thompson, jessica.t@example.com
            </div>
          </div>
          
          <div className="svg-card p-3 bg-white border rounded">
            <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="100" fill="#f8f9fa" rx="10" ry="10" />
              <text x="20" y="30" font-family="Arial" font-size="16" font-weight="bold">Marcus Johnson</text>
              <text x="20" y="55" font-family="Arial" font-size="14">Sales Director</text>
              <text x="20" y="80" font-family="Arial" font-size="14" fill="#0066cc">m.johnson@example.com</text>
            </svg>
            <div className="visually-hidden">
              Contact: Marcus Johnson, m.johnson@example.com
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Staff Directory</h2>
        <div className="overflow-x-auto">
          <dl className="staff-directory grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="staff-entry p-3 bg-white border rounded">
              <dt className="font-semibold">Engineering</dt>
              <dd className="ml-4 mt-1">
                <span className="staff-name">Richard Lee</span><br />
                <span className="staff-title text-sm text-gray-600">Lead Engineer</span><br />
                <span className="staff-email text-sm">richard.lee@example.com</span>
              </dd>
            </div>
            
            <div className="staff-entry p-3 bg-white border rounded">
              <dt className="font-semibold">Human Resources</dt>
              <dd className="ml-4 mt-1">
                <span className="staff-name">Patricia Garcia</span><br />
                <span className="staff-title text-sm text-gray-600">HR Director</span><br />
                <span className="staff-email text-sm">p.garcia@example.com</span>
              </dd>
            </div>
            
            <div className="staff-entry p-3 bg-white border rounded">
              <dt className="font-semibold">Finance</dt>
              <dd className="ml-4 mt-1">
                <span className="staff-name">Robert Taylor</span><br />
                <span className="staff-title text-sm text-gray-600">Finance Manager</span><br />
                <span className="staff-email text-sm">robert.t@example.com</span>
              </dd>
            </div>
            
            <div className="staff-entry p-3 bg-white border rounded">
              <dt className="font-semibold">Customer Support</dt>
              <dd className="ml-4 mt-1">
                <span className="staff-name">Karen Wilson</span><br />
                <span className="staff-title text-sm text-gray-600">Support Lead</span><br />
                <span className="staff-email text-sm">karen.w@example.com</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>
      
      <section className='mb-5 flex flex-wrap justify-center gap-2'>
        <button className='bg-blue-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeWithConfig}>General Config</button>
        <button className='bg-green-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeDivs}>Divs</button>
        <button className='bg-purple-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeParagraphs}>Paragraphs</button>
        <button className='bg-orange-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeListItems}>List Items</button>
        <button className='bg-red-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeImages}>Images</button>
        <button className='bg-indigo-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeDataAttributes}>Data Attributes</button>
        <button className='bg-pink-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeJsonLd}>JSON-LD</button>
        <button className='bg-teal-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeAddress}>Address</button>
        <button className='bg-yellow-600 text-white p-3 rounded-md cursor-pointer' onClick={scrapeTables}>Tables</button>
      </section>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Andrew Wilson",
          "jobTitle": "CEO",
          "email": "andrew@techcorp.com",
          "telephone": "(555) 987-6543",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New York"
          }
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Stephanie Brooks",
          "jobTitle": "CTO",
          "email": "stephanie@techcorp.com",
          "telephone": "(555) 123-4567",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Francisco"
          }
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "TechCorp",
          "url": "https://techcorp.com",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "(555) 987-6543",
              "contactType": "customer service",
              "email": "support@techcorp.com"
            },
            {
              "@type": "ContactPoint",
              "telephone": "(555) 123-4567",
              "contactType": "technical support",
              "email": "tech@techcorp.com"
            }
          ]
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Marketing Solutions",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "789 Marketing Blvd",
            "addressLocality": "Los Angeles",
            "addressRegion": "CA",
            "postalCode": "90210"
          },
          "telephone": "(555) 777-8888",
          "email": "info@marketingsolutions.com"
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Jessica Thompson",
          "jobTitle": "Marketing Specialist",
          "email": "jessica.t@example.com",
          "telephone": "(555) 999-0000",
          "worksFor": {
            "@type": "Organization",
            "name": "Marketing Solutions"
          }
        }
      `}} />
</>
  );
}