"use client";

import React from "react";
import Footer from "../components/Footer/page";

// Import new components
import ContactLeft from "./ContactLeft";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen w-full bg-black text-white 
      px-6 md:px-12 lg:px-20 py-20 pt-32"
    >
      <div className="mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ContactLeft />
          <ContactForm />
        </div>

        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
