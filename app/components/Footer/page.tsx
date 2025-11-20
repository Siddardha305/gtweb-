"use client";

import React from "react";
import Link from "next/link";
import Logo from "../navbar/navlogo/logo";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`w-full bg-white dark:bg-zinc-950 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Column - Brand & Newsletter */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <Logo />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                GT Web Developers
              </h3>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed max-w-md">
              Strategic web design, and campaigns tailored to drive results and conversions.
            </p>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                Newsletter
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                Stay ahead with design & marketing tips and strategies that drive results.
              </p>
              <div className="flex gap-3 max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-6">
                Company
              </h4>
              <div className="space-y-3">
                {[
                  "Services", "Our Work", "Achievements", "FAQs", "Brand", "Contact"
                ].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="block text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 text-lg"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-6">
                Socials
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Email", href: "mailto:hello@gtwebdev.com" },
                  { label: "Instagram", href: "#" },
                  { label: "LinkedIn", href: "#" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="block text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 text-lg"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <p>©{new Date().getFullYear()} GT Web Developers All rights reserved</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;