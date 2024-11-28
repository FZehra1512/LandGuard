import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-600">
          Ask a Question or Book an Appointment Below.
        </h1>
        <p className="text-gray-600 mt-2">
          Use our contact information or the form below to book an appointment
          or get answers to your questions. We will respond quickly to your
          email.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center bg-white p-8 shadow-lg rounded-lg w-10/12 max-w-6xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://via.placeholder.com/500"
            alt="Contact"
            className="rounded-lg object-cover"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 md:pl-6">
          <form className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              className="col-span-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              className="col-span-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              className="col-span-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
            {/* Phone */}
            <input
              type="text"
              placeholder="Your Phone"
              className="col-span-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
            {/* Message */}
            <textarea
              placeholder="Type your message here!"
              rows="4"
              className="col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
            {/* Button */}
            <button
              type="submit"
              className="col-span-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
            >
              LEARN MORE!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
