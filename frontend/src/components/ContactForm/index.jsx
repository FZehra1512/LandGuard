import React from "react";
import sideImage from "../../assets/images/contact_page_img.png"
import patternImage from "../../assets/images/wavepattern.svg";
import { Button } from "../ui/button";

const ContactPage = () => {
  return (
    <main className="relative max-h-fit pt-12 pb-20 flex flex-col items-center justify-center bg-white">
      {/* <img src={patternImage} alt="Contact" className="absolute -z-10 -top-32 sm:-top-52 md:-top-64 lg:-top-96 xl:-top-[29.5rem] left-0 w-full object-cover" />*/}
      <div className="text-center mb-8 w-full">
        <h2 className="text-5xl">Have Questions? Contact Us Below.</h2>
        <p className="text-xl mt-8">
          Use the form below to get answers to your questions. We will respond
          quickly to your email.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center bg-lightColor p-8 shadow-lg rounded-2xl w-10/12 max-w-6xl">
        {/* Image Section */}
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <img
            src={sideImage}
            alt="Contact"
            className="rounded-xl object-cover"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-3/5 md:pl-6">
          <form className="grid grid-cols-2 gap-8 text-darkColor">
            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              className="col-span-1 placeholder-slate-500 p-4 bg-transparent border-2 border-darkColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              className="col-span-1 placeholder-slate-500 p-4 bg-transparent border-2 border-darkColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              className="col-span-1 placeholder-slate-500 p-4 bg-transparent border-2 border-darkColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
            {/* Phone */}
            <input
              type="text"
              placeholder="Your Phone"
              className="col-span-1 placeholder-slate-500 p-4 bg-transparent border-2 border-darkColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
            {/* Message */}
            <textarea
              placeholder="Type your message here!"
              rows="5"
              className="col-span-2 placeholder-slate-500 p-4 bg-transparent border-2 border-darkColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            />
            {/* Button */}
            <div className="mt-4 col-span-2 text-center">
              <Button type="submit" size="lg">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
