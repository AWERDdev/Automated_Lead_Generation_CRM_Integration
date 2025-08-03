import React from 'react';

export default function TestDOMExtractorAdvancedPage() {
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
</>
  );
}