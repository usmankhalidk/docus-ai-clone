import React from "react";

export const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 px-5 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center m-4 sm:mb-8">Contact us</h1>
        <p className="text-gray-600 text-center text-base md:text-lg mb-12">
          Our customer support team is available to assist you with any questions or concerns.
        </p>
        {/* Social Icons */}
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Let’s get in touch</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-700 focus:border-gray-700 hover:border-gray-700 transition active:outline-1"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-700 focus:border-gray-700 hover:border-gray-700 transition"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message *
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-500 transition"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              By submitting this, you agree to our{" "}
              <a href="#" className="text-teal-500 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-500 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-theme_color text-white font-medium py-2 px-4 rounded-md hover:bg-theme_color_onHover mt-4"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <p className="text-gray-600 text-sm">
          +1 302-600-1289 | <a href="mailto:info@docus.ai" className="text-teal-500 hover:underline">info@docus.ai</a>
        </p>
        <p className="text-gray-600 text-sm">
          2810 N Church Street, Wilmington, DE 19802 United States
        </p>
      </div>
    </div>
  )
}