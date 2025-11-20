"use client";
import React from "react";
import Button from "../navbar/navbtn/button"; 

interface CTAcardProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
}

export default function CTAcard({ title, subtitle, buttonText, onClick }: CTAcardProps) {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="max-w-3xl w-full bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-6 sm:p-8 border border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              {title ?? "Ready to Grow Your Business?"}
            </h3>

            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              {subtitle ??
                "Launch your website, branding or full business platform with GT Web & Design."}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="text-lg px-6 py-3">
              <Button
                onClick={onClick}
                label={buttonText ?? "Book a Free Consultation"}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
