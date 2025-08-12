'use client'
import Image from 'next/image';
import {
  ScrapeDivs,
  ScrapeParagraphs,
  ScrapeListItems,
  ScrapeImages,
  ScrapeDataAttributes,
  ScrapeJsonLd,
  ScrapeAddress,
  ScrapeTables
} from '../utils/scrapingFunctions';

export default function TestDOMExtractorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">DOM Lead Extractor - Page 1</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Business Entries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="business-entry p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Acme Corporation</h3>
              <p className="text-gray-600 mb-3">Industry: Technology</p>
              <div className="space-y-2">
                <span className="name block text-gray-700"><strong>Contact:</strong> John Doe</span>
                <span className="email block text-blue-600"><strong>Email:</strong> john.doe@acme.com</span>
                <span className="phone block text-gray-700"><strong>Phone:</strong> (555) 123-4567</span>
              </div>
            </div>
            
            <div className="business-entry p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Globex Industries</h3>
              <p className="text-gray-600 mb-3">Industry: Manufacturing</p>
              <div className="space-y-2">
                <span className="name block text-gray-700"><strong>Contact:</strong> Jane Smith</span>
                <span className="email block text-blue-600"><strong>Email:</strong> jane.smith@globex.com</span>
                <span className="phone block text-gray-700"><strong>Phone:</strong> (555) 987-6543</span>
              </div>
            </div>
            
            <div className="business-entry p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Initech LLC</h3>
              <p className="text-gray-600 mb-3">Industry: Software</p>
              <div className="space-y-2">
                <span className="name block text-gray-700"><strong>Contact:</strong> Michael Bolton</span>
                <span className="email block text-blue-600"><strong>Email:</strong> michael.bolton@initech.com</span>
                <span className="phone block text-gray-700"><strong>Phone:</strong> (555) 867-5309</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Table</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="contact-table w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-700">Phone</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-700">Department</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 text-gray-700">Robert Johnson</td>
                  <td className="border border-gray-200 p-3 text-blue-600">robert.johnson@example.com</td>
                  <td className="border border-gray-200 p-3 text-gray-700">(555) 234-5678</td>
                  <td className="border border-gray-200 p-3 text-gray-700">Sales</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 text-gray-700">Lisa Wong</td>
                  <td className="border border-gray-200 p-3 text-blue-600">lisa.wong@example.com</td>
                  <td className="border border-gray-200 p-3 text-gray-700">(555) 345-6789</td>
                  <td className="border border-gray-200 p-3 text-gray-700">Marketing</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 text-gray-700">David Miller</td>
                  <td className="border border-gray-200 p-3 text-blue-600">david.miller@example.com</td>
                  <td className="border border-gray-200 p-3 text-gray-700">(555) 456-7890</td>
                  <td className="border border-gray-200 p-3 text-gray-700">Engineering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Paragraphs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Sales Department</h3>
              <p className="contact-info text-gray-700 space-y-1">
                <span className="block"><strong>Name:</strong> Sarah Johnson</span>
                <span className="block text-blue-600"><strong>Email:</strong> sales@example.com</span>
                <span className="block"><strong>Phone:</strong> (555) 123-7890</span>
                <span className="block"><strong>Hours:</strong> 9am - 5pm EST</span>
              </p>
            </div>
            
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Support Team</h3>
              <p className="contact-info text-gray-700 space-y-1">
                <span className="block"><strong>Name:</strong> Tech Support Team</span>
                <span className="block text-blue-600"><strong>Email:</strong> support@example.com</span>
                <span className="block"><strong>Phone:</strong> (555) 999-8888</span>
                <span className="block"><strong>Hours:</strong> 24/7</span>
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Members</h2>
          <ul className="team-members grid md:grid-cols-3 gap-6">
            <li className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <strong className="text-lg text-gray-900 block mb-2">Alex Chen</strong>
              <div className="text-gray-600 mb-3">CEO</div>
              <a href="mailto:alex.chen@example.com" className="text-blue-600 hover:text-blue-800">alex.chen@example.com</a>
            </li>
            <li className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <strong className="text-lg text-gray-900 block mb-2">Maria Rodriguez</strong>
              <div className="text-gray-600 mb-3">CTO</div>
              <a href="mailto:maria.rodriguez@example.com" className="text-blue-600 hover:text-blue-800">maria.rodriguez@example.com</a>
            </li>
            <li className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <strong className="text-lg text-gray-900 block mb-2">James Wilson</strong>
              <div className="text-gray-600 mb-3">CFO</div>
              <a href="mailto:james.wilson@example.com" className="text-blue-600 hover:text-blue-800">james.wilson@example.com</a>
            </li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Photos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <figure className="team-photo bg-white p-4 border border-gray-200 rounded-lg shadow-sm text-center">
              <Image 
                src="https://via.placeholder.com/150" 
                alt="Emily Davis" 
                width={150}
                height={150}
                className="mx-auto rounded-full mb-3"  
              />
              <figcaption className="text-gray-700">
                <div className="font-semibold text-gray-900">Emily Davis</div>
                <div className="text-gray-600">Head of Design</div>
                <div className="text-blue-600">emily.davis@example.com</div>
              </figcaption>
            </figure>
            <figure className="team-photo bg-white p-4 border border-gray-200 rounded-lg shadow-sm text-center">
              <Image 
                src="https://via.placeholder.com/150" 
                alt="Kevin Taylor" 
                width={150}
                height={150}
                className="mx-auto rounded-full mb-3"
              />
              <figcaption className="text-gray-700">
                <div className="font-semibold text-gray-900">Kevin Taylor</div>
                <div className="text-gray-600">Lead Developer</div>
                <div className="text-blue-600">kevin.taylor@example.com</div>
              </figcaption>
            </figure>
            <figure className="team-photo bg-white p-4 border border-gray-200 rounded-lg shadow-sm text-center">
              <Image 
                src="https://via.placeholder.com/150" 
                alt="Sophia Lee" 
                width={150}
                height={150}
                className="mx-auto rounded-full mb-3"
              />
              <figcaption className="text-gray-700">
                <div className="font-semibold text-gray-900">Sophia Lee</div>
                <div className="text-gray-600">Marketing Director</div>
                <div className="text-blue-600">sophia.lee@example.com</div>
              </figcaption>
            </figure>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Cards with Data Attributes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="employee-card bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              data-name="Daniel Brown"
              data-email="daniel.brown@example.com"
              data-position="Software Engineer"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Daniel Brown</h3>
              <p className="text-gray-600 mb-3">Software Engineer</p>
              <p className="text-blue-600">daniel.brown@example.com</p>
            </div>
            <div 
              className="employee-card bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              data-name="Michelle Park"
              data-email="michelle.park@example.com"
              data-position="Product Manager"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Michelle Park</h3>
              <p className="text-gray-600 mb-3">Product Manager</p>
              <p className="text-blue-600">michelle.park@example.com</p>
            </div>
            <div 
              className="employee-card bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              data-name="Chris Johnson"
              data-email="chris.johnson@example.com"
              data-position="UX Designer"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Chris Johnson</h3>
              <p className="text-gray-600 mb-3">UX Designer</p>
              <p className="text-blue-600">chris.johnson@example.com</p>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Address</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Headquarters</h3>
              <address className="text-gray-700 not-italic">
                <div className="mb-2">123 Business Ave, Suite 100</div>
                <div className="mb-2">San Francisco, CA 94107</div>
                <div className="mb-4">United States</div>
                <div className="text-blue-600">Contact: info@example.com</div>
                <div>Phone: (555) 123-4567</div>
              </address>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">European Office</h3>
              <address className="text-gray-700 not-italic">
                <div className="mb-2">45 Market Street</div>
                <div className="mb-2">London, EC1Y 8QT</div>
                <div className="mb-4">United Kingdom</div>
                <div className="text-blue-600">Contact: europe@example.com</div>
                <div>Phone: +44 20 1234 5678</div>
              </address>
            </div>
          </div>
        </section>
        
        <section className='mb-8'>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Scraping Controls</h2>
          <div className='flex flex-wrap justify-center gap-3'>
            <button className='bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer' onClick={ScrapeDivs}>Scrape Divs</button>
            <button className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer' onClick={ScrapeParagraphs}>Paragraphs</button>
            <button className='bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer' onClick={ScrapeListItems}>List Items</button>
            <button className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer' onClick={ScrapeImages}>Images</button>
            <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer' onClick={ScrapeDataAttributes}>Data Attributes</button>
            <button className='bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors cursor-pointer' onClick={ScrapeJsonLd}>JSON-LD</button>
            <button className='bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer' onClick={ScrapeAddress}>Address</button>
            <button className='bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer' onClick={ScrapeTables}>Tables</button>
          </div>
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
      </div>
    </div>
  );
}