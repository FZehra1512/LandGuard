"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const CreatePostSection = () => {
  return (
    <section className="w-full relative isolate bg-[url('/plant-bg.svg')] bg-cover bg-center py-24 px-6 sm:px-12 xl:px-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEF7EC]/70 to-[#8CD29D]/40 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="md:w-2/3 space-y-6 text-foreground">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Make Karachi Greener 🌱
          </h2>
          <p className="text-lg md:text-xl text-[#2E3A2C] text-muted-foreground max-w-xl">
            Discover plantation spots shared by the community. Adopt a land, plant a tree, and take a step toward a cleaner, greener city.
          </p>
        </div>

        {/* CTA Button */}
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <Link to="/social">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl transition duration-300"
            >
              <Leaf className="mr-3 w-6 h-6" />
              Browse Lands
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CreatePostSection;