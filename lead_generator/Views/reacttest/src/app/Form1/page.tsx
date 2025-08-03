'use client';

import React, { useState } from 'react';

export default function TestFormInjectorPage() {
  const [loginResult, setLoginResult] = useState<string | null>(null);
  const [registrationResult, setRegistrationResult] = useState<string | null>(null);
  const [contactResult, setContactResult] = useState<string | null>(null);
  const [checkoutResult, setCheckoutResult] = useState<string | null>(null);
  const [surveyResult, setSurveyResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('login');
  
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoginResult(`Login attempted with email: ${formData.get('email')}`);
  };
  
  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setRegistrationResult(`Registration attempted for: ${formData.get('firstName')} ${formData.get('lastName')}`);
  };
  
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setContactResult(`Contact form submitted by: ${formData.get('name')}`);
  };
  
  const handleCheckoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setCheckoutResult(`Checkout completed for: ${formData.get('fullName')}`);
  };
  
  const handleSurveySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSurveyResult(`Survey submitted with satisfaction level: ${formData.get('satisfaction')}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Form Injector Test Page</h1>
      
      <div className="mb-6">
        <ul className="flex flex-wrap border-b border-gray-200">
          <li className="mr-2">
            <button
              className={`inline-block p-4 ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 ${activeTab === 'registration' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('registration')}
            >
              Registration
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 ${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 ${activeTab === 'checkout' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('checkout')}
            >
              Checkout
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 ${activeTab === 'survey' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('survey')}
            >
              Survey
            </button>
          </li>
        </ul>
      </div>
      
      {/* Login Form */}
      {activeTab === 'login' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Login Form</h2>
          <p className="text-gray-600 mb-4">Enter your credentials to access your account</p>
          
          <form id="loginForm" className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                placeholder="your@email.com" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required 
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                name="remember" 
                className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            </div>
            
            <div className="flex justify-between text-sm">
              <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
              <a href="#" className="text-blue-600 hover:underline">Create Account</a>
            </div>
          </form>
          
          {loginResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              {loginResult}
            </div>
          )}
        </div>
      )}
      
      {/* Registration Form */}
      {activeTab === 'registration' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Create an Account</h2>
          <p className="text-gray-600 mb-4">Fill out this form to register a new account</p>
          
          <form id="registrationForm" className="space-y-4" onSubmit={handleRegistrationSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="regEmail" 
                name="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                placeholder="your@email.com" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  id="regPassword" 
                  name="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                placeholder="(555) 123-4567" 
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms" 
                className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                required 
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the Terms and Conditions
              </label>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </form>
          
          {registrationResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              {registrationResult}
            </div>
          )}
        </div>
      )}
      
      {/* Contact Form */}
      {activeTab === 'contact' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-4">We would love to hear from you</p>
          
          <form id="contactForm" className="space-y-4" onSubmit={handleContactSubmit}>
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="contactName" 
                name="name" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="contactEmail" 
                name="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select 
                id="subject" 
                name="subject" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="newsletter" 
                name="newsletter" 
                className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
              />
              <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                Subscribe to newsletter
              </label>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </form>
          
          {contactResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              {contactResult}
            </div>
          )}
        </div>
      )}
      
      {/* Checkout Form */}
      {activeTab === 'checkout' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Checkout</h2>
          <p className="text-gray-600 mb-4">Complete your purchase</p>
          
          <form id="checkoutForm" className="space-y-4" onSubmit={handleCheckoutSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="checkoutEmail" 
                name="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                <input 
                  type="text" 
                  id="zip" 
                  name="zip" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                name="cardNumber" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                placeholder="XXXX XXXX XXXX XXXX" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input 
                  type="text" 
                  id="expiration" 
                  name="expiration" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  placeholder="MM/YY" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  name="cvv" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                  placeholder="123" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Complete Purchase
              </button>
            </div>
          </form>
          
          {checkoutResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              {checkoutResult}
            </div>
          )}
        </div>
      )}
      
      {/* Survey Form */}
      {activeTab === 'survey' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Customer Satisfaction Survey</h2>
          <p className="text-gray-600 mb-4">Please provide your feedback</p>
          
          <form id="surveyForm" className="space-y-4" onSubmit={handleSurveySubmit}>
            <div>
              <label htmlFor="surveyName" className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
              <input 
                type="text" 
                id="surveyName" 
                name="surveyName" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
              />
            </div>
            
            <div>
              <label htmlFor="surveyEmail" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input 
                type="email" 
                id="surveyEmail" 
                name="surveyEmail" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
              />
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">How satisfied are you with our service?</p>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input type="radio" name="satisfaction" value="very_satisfied" className="h-4 w-4 text-blue-600" required />
                  <span className="ml-2">Very Satisfied</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="satisfaction" value="satisfied" className="h-4 w-4 text-blue-600" />
                  <span className="ml-2">Satisfied</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="satisfaction" value="neutral" className="h-4 w-4 text-blue-600" />
                  <span className="ml-2">Neutral</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="satisfaction" value="dissatisfied" className="h-4 w-4 text-blue-600" />
                  <span className="ml-2">Dissatisfied</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="satisfaction" value="very_dissatisfied" className="h-4 w-4 text-blue-600" />
                  <span className="ml-2">Very Dissatisfied</span>
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="productUsed" className="block text-sm font-medium text-gray-700 mb-1">Which product did you use?</label>
              <select 
                id="productUsed" 
                name="productUsed" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Please select</option>
                <option value="product_a">Product A</option>
                <option value="product_b">Product B</option>
                <option value="product_c">Product C</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">What features do you value most?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" name="features" value="usability" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2">Usability</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="features" value="performance" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2">Performance</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="features" value="design" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2">Design</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="features" value="support" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2">Customer Support</span>
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
              <textarea 
                id="comments" 
                name="comments" 
                rows={4} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Submit Survey
              </button>
            </div>
          </form>
          
          {surveyResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              {surveyResult}
            </div>
          )}
        </div>
      )}
    </div>
  );
}