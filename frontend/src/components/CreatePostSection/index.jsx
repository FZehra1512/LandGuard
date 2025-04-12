"use client";

import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CreatePostSection = () => {
  return (
    <section className="w-full py-16 bg-green-50 shadow-md mt-10">
      <div className="container mx-auto text-center px-4">
        <h1 className="font-bold text-green-800 mb-4">
        Have Land to Offer for Plantation?
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
        Share your land or property details for others to join your plantation mission.
        </p>
        <Link to="/create-post">
          <Button size="lg">
            Add Your Land
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CreatePostSection;
