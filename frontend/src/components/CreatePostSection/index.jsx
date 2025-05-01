"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const CreatePostSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-green-100 to-green-50 relative overflow-hidden shadow-lg mt-16">
      <div className="absolute inset-0 opacity-10 bg-[url('/plant-bg.svg')] bg-cover bg-center pointer-events-none" />
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16 relative z-10">
        
        <div className="mb-10 md:mb-0 md:w-2/3 text-left">
          <h2 className="text-3xl font-bold text-green-900 mb-4 leading-snug">
            Explore Plantation Opportunities Around You 🌱
          </h2>
          <p className="text-lg text-gray-700">
            Discover available lands offered by others and be part of the mission to make Karachi greener. Find a place and start planting today.
          </p>
        </div>

        <div className="md:w-1/3 flex justify-center md:justify-end">
          <Link to="/social">
            <Button size="lg" className="px-8 py-6 text-lg rounded-xl shadow-md transition duration-300">
              <Leaf className="mr-2 w-5 h-5" />
              Browse Lands
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatePostSection;