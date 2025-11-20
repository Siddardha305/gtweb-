"use client";

import React from "react";
import Button from "../components/navbar/navbtn/button";

export default function ContactLeft() {
  return (
    <div className="pr-6 lg:pr-12">
      <p className="text-white/60 text-sm mb-2">lets connect us</p>

      <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-4">
        Let’s Collaborate
      </h1>

      <p className="text-white/60 max-w-lg mb-8">
        Reach out and let's explore how we can bring your ideas to life.
        Whether you're ready to begin or just have questions.
      </p>

      {/* Contact details */}
      <div className="space-y-2 mb-8">
        <p className="text-lg font-medium">+91 8555082662</p>
        <p className="text-2xl font-semibold">Plugintech4u@gmail.com</p>
        <p className="text-white/60 max-w-md mt-2">
          Reach out to us via email or give us a call — we are happy to assist you!
        </p>
      </div>

      {/* Socials */}
      <div className="flex flex-col gap-3 text-sm text-white/90">
        <a className="flex items-center gap-2 hover:text-[#05d5fe] transition" href="#">
          <span>↗</span> Instagram
        </a>
        <a className="flex items-center gap-2 hover:text-[#05d5fe] transition" href="#">
          <span>↗</span> LinkedIn
        </a>
      </div>
    </div>
  );
}
