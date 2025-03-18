import React from 'react'
import Header from './Header'
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import Tooltip from './Tooltip'
import {contactinfo} from '../../Services/Handleservices';
import Toast from './Toast'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    try{
      const response = await contactinfo(formData);
      const data = response.data
      console.log(data.msg)
      setToastMessage("Request form submitted successfully!!!");
      setToastType("success");
      setShowToast(true);
    }
    catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <>
    <Header/>    
    <Toast
        message={toastMessage}
        type={toastType}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    <div className="max-w-6xl relative font-pop mx-auto px-4 py-12 pt-24 md:py-20">
      <div className="space-y-8">
        <div className="space-y-4">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            Get in touch with us.
            <br />
            We're here to assist you.
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Name Input */}
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-b border-gray-300 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border-b border-gray-300 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className="w-full border-b border-gray-300 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="w-full border-b border-gray-300 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Leave us a Message
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
    <Tooltip/>
    </>

  )
}

