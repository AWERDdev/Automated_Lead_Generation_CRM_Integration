import React from 'react';
import {
  scrapeWithConfigPage2 as scrapeWithConfig,
  scrapeDivsPage2 as scrapeDivs,
  scrapeParagraphsPage2 as scrapeParagraphs,
  scrapeListItemsPage2 as scrapeListItems,
  scrapeImagesPage2 as scrapeImages,
  scrapeDataAttributesPage2 as scrapeDataAttributes,
  scrapeJsonLdPage2 as scrapeJsonLd,
  scrapeAddressPage2 as scrapeAddress,
  scrapeTablesPage2 as scrapeTables
} from '../utils/scrapingFunctionsPage2';

export default function TestDOMExtractorAdvancedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">DOM Lead Extractor - Page 2</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Nested Contact Information</h2>
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="departments-list">
              <div className="department">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Department</h3>
                <div className="team-lead">
                  <div className="info-card p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">Team Lead:</p>
                    <div className="ml-4 space-y-1">
                      <p className="text-gray-700">Jennifer Martinez</p>
                      <p className="text-sm text-blue-600">j.martinez@example.com</p>
                      <p className="text-sm text-gray-600">(555) 222-3333</p>
                    </div>
                  </div>
                </div>
                <div className="team-members mt-4">
                  <p className="font-medium text-gray-900 mb-2">Team Members:</p>
                  <ul className="ml-4 space-y-2">
                    <li className="text-gray-700">
                      <span className="member-name font-medium">Carlos Rodriguez</span> - 
                      <span className="member-email text-blue-600 ml-1">c.rodriguez@example.com</span>
                    </li>
                    <li className="text-gray-700">
                      <span className="member-name font-medium">Anna Johnson</span> - 
                      <span className="member-email text-blue-600 ml-1">a.johnson@example.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Custom Formatted Contacts</h2>
          <div className="grid gap-6">
            <div className="contact-block p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
              <div className="contact-header flex justify-between items-center mb-4">
                <h3 className="contact-name text-lg font-bold text-gray-900">Andrew Wilson</h3>
                <span className="contact-role px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">CEO</span>
              </div>
              <div className="contact-details">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="detail-label text-gray-600 font-medium">Email:</div>
                    <div className="detail-value text-blue-600">andrew@techcorp.com</div>
                  </div>
                  <div className="space-y-2">
                    <div className="detail-label text-gray-600 font-medium">Phone:</div>
                    <div className="detail-value text-gray-700">(555) 987-6543</div>
                  </div>
                  <div className="space-y-2">
                    <div className="detail-label text-gray-600 font-medium">Office:</div>
                    <div className="detail-value text-gray-700">New York</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-block p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              <div className="contact-header flex justify-between items-center mb-4">
                <h3 className="contact-name text-lg font-bold text-gray-900">Stephanie Brooks</h3>
                <span className="contact-role px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">CTO</span>
              </div>
              <div className="contact-details">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="detail-label text-gray-600 font-medium">Email:</div>
                    <div className="detail-value text-blue-600">stephanie@techcorp.com</div>
                  </div>
                  <div className="space-y-2">
                    <div className="detail-label text-gray-600 font-medium">Phone:</div>
                    <div className="detail-value text-gray-700">(555) 123-4567</div>
                  </div>
                  <div className="space-y-2">
                    <div className="detail-label text-gray-600 font-medium">Office:</div>
                    <div className="detail-value text-gray-700">San Francisco</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments with Email Information</h2>
          <div className="comments-section bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="comment p-4 border-b border-gray-200 last:border-b-0">
              <div className="comment-header flex justify-between mb-3">
                <span className="comment-author font-medium text-gray-900">Michael Brown</span>
                <span className="comment-date text-sm text-gray-500">2023-05-15</span>
              </div>
              <p className="comment-text text-gray-700">
                Great article! I would love to discuss this further. You can reach me at <span className="text-blue-600">michael.brown@gmail.com</span>.
              </p>
            </div>
            
            <div className="comment p-4 border-b border-gray-200 last:border-b-0">
              <div className="comment-header flex justify-between mb-3">
                <span className="comment-author font-medium text-gray-900">Sarah Williams</span>
                <span className="comment-date text-sm text-gray-500">2023-05-14</span>
              </div>
              <p className="comment-text text-gray-700">
                I disagree with point #3. Lets connect to discuss - my contact is <span className="text-blue-600">sarah.w@outlook.com</span> or call me at <span className="text-gray-600">555-789-1234</span>.
              </p>
            </div>
            
            <div className="comment p-4">
              <div className="comment-header flex justify-between mb-3">
                <span className="comment-author font-medium text-gray-900">David Chen</span>
                <span className="comment-date text-sm text-gray-500">2023-05-13</span>
              </div>
              <p className="comment-text text-gray-700">
                I am implementing something similar at my company. Feel free to email me at <span className="text-blue-600">d.chen@company.org</span> for collaboration.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">SVG Contact Cards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="svg-card p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <rect width="300" height="100" fill="#f8f9fa" rx="10" ry="10" />
                <text x="20" y="30" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#1f2937">Jessica Thompson</text>
                <text x="20" y="55" fontFamily="Arial" fontSize="14" fill="#6b7280">Marketing Specialist</text>
                <text x="20" y="80" fontFamily="Arial" fontSize="14" fill="#2563eb">jessica.t@example.com</text>
              </svg>
              <div className="visually-hidden">
                Contact: Jessica Thompson, jessica.t@example.com
              </div>
            </div>
            
            <div className="svg-card p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <rect width="300" height="100" fill="#f8f9fa" rx="10" ry="10" />
                <text x="20" y="30" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#1f2937">Marcus Johnson</text>
                <text x="20" y="55" fontFamily="Arial" fontSize="14" fill="#6b7280">Sales Director</text>
                <text x="20" y="80" fontFamily="Arial" fontSize="14" fill="#2563eb">m.johnson@example.com</text>
              </svg>
              <div className="visually-hidden">
                Contact: Marcus Johnson, m.johnson@example.com
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Staff Directory</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <dl className="staff-directory grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="staff-entry p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <dt className="font-semibold text-gray-900 mb-2">Engineering</dt>
                <dd className="ml-4 space-y-1">
                  <span className="staff-name block text-gray-700 font-medium">Richard Lee</span>
                  <span className="staff-title text-sm text-gray-600 block">Lead Engineer</span>
                  <span className="staff-email text-sm text-blue-600 block">richard.lee@example.com</span>
                </dd>
              </div>
              
              <div className="staff-entry p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <dt className="font-semibold text-gray-900 mb-2">Human Resources</dt>
                <dd className="ml-4 space-y-1">
                  <span className="staff-name block text-gray-700 font-medium">Patricia Garcia</span>
                  <span className="staff-title text-sm text-gray-600 block">HR Director</span>
                  <span className="staff-email text-sm text-blue-600 block">p.garcia@example.com</span>
                </dd>
              </div>
              
              <div className="staff-entry p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <dt className="font-semibold text-gray-900 mb-2">Finance</dt>
                <dd className="ml-4 space-y-1">
                  <span className="staff-name block text-gray-700 font-medium">Robert Taylor</span>
                  <span className="staff-title text-sm text-gray-600 block">Finance Manager</span>
                  <span className="staff-email text-sm text-blue-600 block">robert.t@example.com</span>
                </dd>
              </div>
              
              <div className="staff-entry p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <dt className="font-semibold text-gray-900 mb-2">Customer Support</dt>
                <dd className="ml-4 space-y-1">
                  <span className="staff-name block text-gray-700 font-medium">Karen Wilson</span>
                  <span className="staff-title text-sm text-gray-600 block">Support Lead</span>
                  <span className="staff-email text-sm text-blue-600 block">karen.w@example.com</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        
        <section className='mb-8'>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Scraping Controls</h2>
          <div className='flex flex-wrap justify-center gap-3'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors' onClick={scrapeWithConfig}>General Config</button>
            <button className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors' onClick={scrapeDivs}>Divs</button>
            <button className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors' onClick={scrapeParagraphs}>Paragraphs</button>
            <button className='bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors' onClick={scrapeListItems}>List Items</button>
            <button className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors' onClick={scrapeImages}>Images</button>
            <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors' onClick={scrapeDataAttributes}>Data Attributes</button>
            <button className='bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors' onClick={scrapeJsonLd}>JSON-LD</button>
            <button className='bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors' onClick={scrapeAddress}>Address</button>
            <button className='bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors' onClick={scrapeTables}>Tables</button>
          </div>
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
      </div>
    </div>
  );
}