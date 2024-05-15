import Image from "../../node_modules/next/image";

import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';




// Then use `backgroundImage` in your JSX as the source for the background image

import { Transition } from '@headlessui/react';
const countryOptions = [
  { value: '+1', label: '+1 (United States)', flag: '🇺🇸' },
  { value: '+44', label: '+44 (United Kingdom)', flag: '🇬🇧' },
  // Add more countries as needed
];

const ThankYouPopup = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isOpen, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg">
        <div className="bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-700">Your form has been successfully submitted.</p>
          <p className="text-gray-700">This popup will close in {countdown} seconds.</p>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServicesOptions, setShowServicesOptions] = useState(false);
  const timeoutRef = useRef(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const showContactOptions = () => {
    setShowContactInfo(true);
    setShowCallbackForm(false);
  };

  const showCallbackOptions = () => {
    setShowCallbackForm(true);
    setShowContactInfo(false);
  };

  const [callbackFormData, setCallbackFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    preferredTime: '',
    comment: ''
  });

  const [callbackFormErrors, setCallbackFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    preferredTime: '',
    comment: ''
  });

  const handleCallbackInputChange = (e) => {
    const { name, value } = e.target;
    setCallbackFormData({
      ...callbackFormData,
      [name]: value
    });
  };

  const validateCallbackForm = () => {
    let valid = true;
    const errors = {};

    // Name validation
    if (!callbackFormData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!callbackFormData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(callbackFormData.email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    // Phone number validationy
    if (!callbackFormData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(callbackFormData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
      valid = false;
    }

   

    setCallbackFormErrors(errors);
    return valid;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    comment: '',
    country_phone_code: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    contact: '',
    comment: '',
    country_phone_code: ''
  });
  

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleServicesOptions = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowServicesOptions(true);
  };

  const closeOptions = () => {
    timeoutRef.current = setTimeout(() => {
      setShowServicesOptions(false);
    }, 100); // delay in ms
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    // Contact validation
    if (!formData.contact.trim()) {
      errors.contact = 'Contact number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = 'Invalid contact number';
      valid = false;
    }

    // Comment validation
    if (!formData.comment.trim()) {
      errors.comment = 'Comment is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/submitForm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Form submitted successfully
        console.log('Form submitted successfully');
        setShowThankYouPopup(true);
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          contact: '',
          comment: '',
          country_phone_code: ''
        });
        // Clear form errors
        setFormErrors({
          name: '',
          email: '',
          contact: '',
          comment: '',
          country_phone_code: ''
        });
        // Reset selected country dropdown
        setSelectedCountry(null);
      } else {
        // Handle error response
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const closeThankYouPopup = () => {
    setShowThankYouPopup(false);
  };
  
  

  return (
    <>
      <nav className="bg-gray-800" id="navbarsection" onMouseLeave={closeOptions}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
  <a href="/"> {/* Replace "/home" with the actual URL of your home page */}
    <img src="/Medeazelogo.svg" alt="Medeaze Logo" id="logoonnavbar" />
  </a>
</div>


            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" id="NavBarContent">Home</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" id="NavBarContent">About</a>
                <div className="relative" onMouseEnter={toggleServicesOptions} onMouseLeave={closeOptions}>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" id="NavBarContent">Services</a>
                  {showServicesOptions && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-white ring-opacity-5 focus:outline-none" id="Optionmenudiv" onMouseEnter={toggleServicesOptions} onMouseLeave={closeOptions}>
                      <div className="py-1" role="none">
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 text-sm" id="optionsinService">Marketing</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 text-sm" id="optionsinService">Website Development</a>
                      </div>
                    </div>
                  )}
                </div>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"id="NavBarContent">Contact</a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
                <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
            <div className="relative" onMouseEnter={toggleServicesOptions} onMouseLeave={closeOptions}>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
              {showServicesOptions && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" onMouseEnter={toggleServicesOptions} onMouseLeave={closeOptions}>
                  <div className="py-1" role="none">
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 text-sm">Marketing</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 text-sm">Website Development</a>
                  </div>
                </div>
              )}
            </div>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Section for Home Pages */}
      {/* Section for Home Pages */}
      <section className="bg-gray-100 py-16 flex items-center justify-center" id="FirstbannerofHomepage">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center"
    >
      <h2 className="text-6xl lg:text-4xl font-extrabold text-gray-900">
        <span className="MedeazeColor">Medeaze: </span>Where Medical Expertise Meets Digital Excellence
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 text-lg text-black-500"
      >
        Delve into the realm of growth and let your practice shine.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="SuccessStory"
      >
        <a href="#contactUsForm" className="cta-button">
          Begin Your Success Story
        </a>
      </motion.div>
    </motion.div>
  </div>
</section>;


 {/* About Us Section */}
 <section className="bg-gray-100 py-16" id="AboutusSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h2>
          <motion.h3
            className="text-4xl lg:text-5xl font-extrabold text-gray-900"
            id="AboutusHeading3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Understanding Dentistry Like No Other
          </motion.h3>
          <motion.p
            className="mt-4 text-lg text-gray-500"
            id="aboutusPara"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            At Medeaze, we blend dental proficiency with marketing acumen to offer you strategies that are not just effective but empathetic to the core of dental care.
          </motion.p>
          {/* Read More Button */}
          <motion.button
            className="mt-8 bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-700 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Read More
          </motion.button>
        </div>
      </div>
    </section>



      <section className="local-seo-section">
        <h1>Services</h1>
            <div className="container">
                <h2>Local SEO Mastery</h2>
                <div className="local-seo-content">
                    <div className="seo-item">
                        <h3>Keyword Optimization</h3>
                        <p>We conduct in-depth keyword research to identify the most relevant and high-traffic keywords for your clinic's services, ensuring that your website ranks well in local search results.</p>
                    </div>
                    <div className="seo-item">
                        <h3>Google My Business Optimization</h3>
                        <p>We optimize your Google My Business profile to improve your visibility in local searches, including accurate business information, enticing descriptions, and compelling images.</p>
                    </div>
                    <div className="seo-item">
                        <h3>Local Directory Listings</h3>
                        <p>We ensure your clinic is listed accurately and consistently across various online directories and platforms, enhancing your local search presence and credibility.</p>
                    </div>
                    <div className="seo-item">
                        <h3>Localized Content Creation</h3>
                        <p>We create localized content, such as blog posts, articles, and landing pages, targeting specific geographical areas and addressing the unique needs of your local audience.</p>
                    </div>
                    <div className="seo-item">
                        <h3>Review Management</h3>
                        <p>We help you manage and respond to customer reviews on platforms like Google, Yelp, and Healthgrades, cultivating a positive online reputation and building trust with potential patients.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="engaging-patient-section">
            <div className="container">
                <h2>Engaging Patient Journeys</h2>
                <div className="engaging-patient-content">
                    <div className="patient-item">
                        <h3>User-Friendly Website Design</h3>
                        <p>We design your clinic's website with a focus on user experience, ensuring intuitive navigation, fast loading times, and mobile responsiveness to provide a seamless browsing experience for visitors.</p>
                    </div>
                    <div className="patient-item">
                        <h3>Compelling Content Creation</h3>
                        <p>We develop engaging content for your website, including informative articles, interactive infographics, and captivating videos, to educate and engage your audience throughout their patient journey.</p>
                    </div>
                    <div className="patient-item">
                        <h3>Appointment Scheduling Integration</h3>
                        <p>We integrate convenient appointment scheduling tools into your website, allowing patients to easily book appointments online and reducing administrative burdens for your clinic staff.</p>
                    </div>
                    <div className="patient-item">
                        <h3>Personalized Email Campaigns</h3>
                        <p>We implement personalized email marketing campaigns to nurture leads and encourage patient loyalty, delivering relevant content, appointment reminders, and special offers tailored to each recipient's preferences.</p>
                    </div>
                    <div className="patient-item">
                        <h3>Social Media Engagement</h3>
                        <p>We leverage social media platforms to interact with your audience, share valuable content, and foster meaningful relationships, humanizing your brand and increasing patient engagement.</p>
                    </div>
                </div>
            </div>
        </section>


        <section id="why-us" className="medeaze-edge-section">
            <div className="container">
                <h2>The Medeaze Edge</h2>
                <p>Our founder's dental roots give us the edge in understanding the nuances of your practice, ensuring strategies that resonate with both the heart and science of dentistry. With Medeaze, you'll experience:</p>
                <ul>
                    <li><strong>Customized Solutions:</strong> Tailored strategies that address the unique challenges and goals of your dental practice.</li>
                    <li><strong>Proven Expertise:</strong> Decades of combined experience in dental marketing and practice management.</li>
                    <li><strong>Comprehensive Support:</strong> From website design to patient acquisition, we provide end-to-end solutions to elevate your practice.</li>
                    <li><strong>Data-Driven Insights:</strong> Analytics-driven approach to track performance and optimize marketing efforts for maximum ROI.</li>
                    <li><strong>Exceptional Service:</strong> Dedicated account managers committed to your success and satisfaction.</li>
                </ul>
            </div>
        </section>









         {/* Contact Form */}
         <div className="flex justify-center mt-8">
  <button
    onClick={showContactOptions}
    className={`mr-4 px-6 py-3 rounded-md ${
      showContactInfo ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'
    } ${
      showContactInfo ? '' : 'hover:bg-gray-700 hover:text-white'
    } transition duration-300`}
  >
    Contact
  </button>
  <button
    onClick={showCallbackOptions}
    className={`px-6 py-3 rounded-md ${
      showCallbackForm ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'
    } ${
      showCallbackForm ? '' : 'hover:bg-gray-700 hover:text-white'
    } transition duration-300`}
  >
    Call Back
  </button>
</div>


      {/* Contact information */}
      {showContactInfo && (
     <section className="bg-gray-200 py-16">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="max-w-xl mx-auto">
         <h2 className="text-3xl font-semibold text-gray-900 mb-8">Contact Information</h2>
         <p className="text-lg text-gray-800">
  Phone: <a href="tel:+917302587878">+91 7302587878</a>
</p>

         <p className="text-lg text-gray-800">
           Email: <a href="mailto:info@medeaze.com">info@medeaze.com</a>
         </p>
         {/* Add more contact information here */}
       </div>
     </div>
   </section>
   
      )}



       {/* Contact Form */}
       {showCallbackForm && (
       <section className="bg-gray-200 py-16" id="contactUsForm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-800 font-semibold">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                {formErrors.name && <p className="text-red-500 mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-800 font-semibold">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                {formErrors.email && <p className="text-red-500 mt-1">{formErrors.email}</p>}
              </div>
              <div className="mb-4">
                  <label htmlFor="callback-country" className="block text-gray-800 font-semibold">Country</label>
                  <Select
  id="callback-country"
  value={selectedCountry}
  onChange={(selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData({
      ...formData,
      country_phone_code: selectedOption.value // Update the country code in formData
    });
  }}
  options={countryOptions}
  placeholder="Select country..."
  classNamePrefix="country-select"
/>

                </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-gray-800 font-semibold">Contact Number</label>
                <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                {formErrors.contact && <p className="text-red-500 mt-1">{formErrors.contact}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-800 font-semibold">Comment</label>
                <textarea id="comment" name="comment" value={formData.comment} onChange={handleInputChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                {formErrors.comment && <p className="text-red-500 mt-1">{formErrors.comment}</p>}
              </div>
              <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">Submit</button>
            </form>
          </div>
        </div>
      </section>
      )}
      {/* Thank You Popup */}
     {/* Thank You Popup */}
     <ThankYouPopup isOpen={showThankYouPopup} onClose={closeThankYouPopup} />

     {/* Footer Section */}
      {/* Footer Section */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          {/* Terms & Conditions Link */}
          <a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 lg:mt-0">
            {/* Replace the below links with your actual social media links */}
            <a href="#" className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Insert your social media icon SVG here */}
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Insert your social media icon SVG here */}
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Insert your social media icon SVG here */}
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Insert your social media icon SVG here */}
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Insert your social media icon SVG here */}
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-300 mt-4 lg:mt-0">
            © 2024 Medeaze - Pioneering Dental Clinic Growth in Delhi.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
























// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
//     >
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/pages/index.js</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Discover and deploy boilerplate example Next.js&nbsp;projects.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
