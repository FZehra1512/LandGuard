"use client";

import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CreatePostSection = () => {
  return (
    <section className="w-full py-10 bg-green-50 shadow-md mt-10">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
        Have Land to Offer for Plantation?
        </h2>
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
