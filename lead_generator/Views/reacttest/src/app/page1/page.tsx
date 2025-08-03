'use client'
import React from 'react';
// import Image from 'next/image';

export default function TestDOMExtractorPage() {
  const scrapeData = async () =>{
    console.log("scraping data")
   const url = 'http://localhost:3000/page1'
    try {
      const response = await fetch(`http://127.0.0.1:8000/DOMLeads/Divs?url=${url}`,)
      const data  = await response.json()
      console.log('Python API response', data)
    }
    catch(error){
      console.log(`Failed to scrape data ${error}`)
    }

  }

  // Function for general config route
  const scrapeWithConfig = async () => {
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

  // Function for divs route
  const scrapeDivs = async () => {
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

  // Function for paragraphs route
  const scrapeParagraphs = async () => {
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

  // Function for list items route
  const scrapeListItems = async () => {
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

  // Function for images route
  const scrapeImages = async () => {
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

  // Function for data attributes route
  const scrapeDataAttributes = async () => {
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

  // Function for JSON-LD route
  const scrapeJsonLd = async () => {
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

  // Function for address route
  const scrapeAddress = async () => {
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

  // Function for tables route
  const scrapeTables = async () => {
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

  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Business Entries</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="business-entry p-4 border rounded bg-white">
            <h3 className="text-lg font-semibold">Acme Corporation</h3>
            <p>Industry: Technology</p>
            <div className="mt-2">
              <span className="name block">Contact: John Doe</span>
              <span className="email block">Email: john.doe@acme.com</span>
              <span className="phone block">Phone: (555) 123-4567</span>
            </div>
          </div>
          
          <div className="business-entry p-4 border rounded bg-white">
            <h3 className="text-lg font-semibold">Globex Industries</h3>
            <p>Industry: Manufacturing</p>
            <div className="mt-2">
              <span className="name block">Contact: Jane Smith</span>
              <span className="email block">Email: jane.smith@globex.com</span>
              <span className="phone block">Phone: (555) 987-6543</span>
            </div>
          </div>
          
          <div className="business-entry p-4 border rounded bg-white">
            <h3 className="text-lg font-semibold">Initech LLC</h3>
            <p>Industry: Software</p>
            <div className="mt-2">
              <span className="name block">Contact: Michael Bolton</span>
              <span className="email block">Email: michael.bolton@initech.com</span>
              <span className="phone block">Phone: (555) 867-5309</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Table</h2>
        <div className="overflow-x-auto">
          <table className="contact-table w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Robert Johnson</td>
                <td className="border p-2">robert.johnson@example.com</td>
                <td className="border p-2">(555) 234-5678</td>
                <td className="border p-2">Sales</td>
              </tr>
              <tr>
                <td className="border p-2">Lisa Wong</td>
                <td className="border p-2">lisa.wong@example.com</td>
                <td className="border p-2">(555) 345-6789</td>
                <td className="border p-2">Marketing</td>
              </tr>
              <tr>
                <td className="border p-2">David Miller</td>
                <td className="border p-2">david.miller@example.com</td>
                <td className="border p-2">(555) 456-7890</td>
                <td className="border p-2">Engineering</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Paragraphs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded">
            <h3 className="font-semibold">Sales Department</h3>
            <p className="contact-info mt-2">
              Name: Sarah Johnson<br />
              Email: sales@example.com<br />
              Phone: (555) 123-7890<br />
              Hours: 9am - 5pm EST
            </p>
          </div>
          
          <div className="bg-white p-4 border rounded">
            <h3 className="font-semibold">Support Team</h3>
            <p className="contact-info mt-2">
              Name: Tech Support Team<br />
              Email: support@example.com<br />
              Phone: (555) 999-8888<br />
              Hours: 24/7
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Team Members</h2>
        <ul className="team-members grid md:grid-cols-3 gap-4">
          <li className="bg-white p-4 border rounded">
            <strong>Alex Chen</strong>
            <div className="mt-1">CEO</div>
            <a href="mailto:alex.chen@example.com">alex.chen@example.com</a>
          </li>
          <li className="bg-white p-4 border rounded">
            <strong>Maria Rodriguez</strong>
            <div className="mt-1">CTO</div>
            <a href="mailto:maria.rodriguez@example.com">maria.rodriguez@example.com</a>
          </li>
          <li className="bg-white p-4 border rounded">
            <strong>James Wilson</strong>
            <div className="mt-1">CFO</div>
            <a href="mailto:james.wilson@example.com">james.wilson@example.com</a>
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Team Photos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <figure className="team-photo bg-white p-2 border rounded text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Emily Davis" 
              className="mx-auto rounded-full"  
            />
            <figcaption className="mt-2">
              Emily Davis - Head of Design<br />
              emily.davis@example.com
            </figcaption>
          </figure>
          <figure className="team-photo bg-white p-2 border rounded text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Kevin Taylor" 
              className="mx-auto rounded-full"
            />
            <figcaption className="mt-2">
              Kevin Taylor - Lead Developer<br />
              kevin.taylor@example.com
            </figcaption>
          </figure>
          <figure className="team-photo bg-white p-2 border rounded text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Sophia Lee" 
              className="mx-auto rounded-full"
            />
            <figcaption className="mt-2">
              Sophia Lee - Marketing Director<br />
              sophia.lee@example.com
            </figcaption>
          </figure>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Employee Cards with Data Attributes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div 
            className="employee-card bg-white p-4 border rounded"
            data-name="Daniel Brown"
            data-email="daniel.brown@example.com"
            data-position="Software Engineer"
          >
            <h3 className="font-semibold">Daniel Brown</h3>
            <p>Software Engineer</p>
            <p className="text-blue-500">daniel.brown@example.com</p>
          </div>
          <div 
            className="employee-card bg-white p-4 border rounded"
            data-name="Michelle Park"
            data-email="michelle.park@example.com"
            data-position="Product Manager"
          >
            <h3 className="font-semibold">Michelle Park</h3>
            <p>Product Manager</p>
            <p className="text-blue-500">michelle.park@example.com</p>
          </div>
          <div 
            className="employee-card bg-white p-4 border rounded"
            data-name="Chris Johnson"
            data-email="chris.johnson@example.com"
            data-position="UX Designer"
          >
            <h3 className="font-semibold">Chris Johnson</h3>
            <p>UX Designer</p>
            <p className="text-blue-500">chris.johnson@example.com</p>
          </div>
        </div>
      </section>
      
      <section className="mb-3">
        <h2 className="text-2xl font-bold mb-4">Contact Address</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded">
            <h3 className="font-semibold">Headquarters</h3>
            <address className="mt-2 not-italic">
              123 Business Ave, Suite 100<br />
              San Francisco, CA 94107<br />
              United States<br /><br />
              Contact: info@example.com<br />
              Phone: (555) 123-4567
            </address>
          </div>
          <div className="bg-white p-4 border rounded">
            <h3 className="font-semibold">European Office</h3>
            <address className="mt-2 not-italic">
              45 Market Street<br />
              London, EC1Y 8QT<br />
              United Kingdom<br /><br />
              Contact: europe@example.com<br />
              Phone: +44 20 1234 5678
            </address>
          </div>
        </div>
      </section>
      <section className='mb-5 flex flex-wrap justify-center gap-2'>
        <button className='bg-black text-white p-3 rounded-md cursor-pointer' onClick={scrapeData}>Scrape Divs</button>
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
          "name": "John Smith",
          "email": "john.smith@example.com",
          "telephone": "(555) 111-2222",
          "url": "https://example.com/john-smith"
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Acme Corporation",
          "url": "https://acme.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "(555) 123-4567",
            "contactType": "customer service",
            "email": "info@acme.com"
          }
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Globex Industries",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Business Ave, Suite 100",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94107",
            "addressCountry": "US"
          },
          "telephone": "(555) 987-6543",
          "email": "contact@globex.com"
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Emily Davis",
          "jobTitle": "Head of Design",
          "email": "emily.davis@example.com",
          "telephone": "(555) 333-4444",
          "worksFor": {
            "@type": "Organization",
            "name": "Design Studio Inc"
          }
        }
      `}} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Daniel Brown",
          "jobTitle": "Software Engineer",
          "email": "daniel.brown@example.com",
          "telephone": "(555) 555-6666",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "456 Tech Street",
            "addressLocality": "San Jose",
            "addressRegion": "CA"
          }
        }
      `}} />
      </>
  );
}