// app/components/ContactForm.tsx
"use client";

import React, { useState } from "react";
import Button from "../components/navbar/navbtn/button"; // ensure this Button accepts `type`, `disabled`, `className`

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Please fill Name, Email and Message." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");

      setStatus({ type: "success", message: "Message sent — we will reach out soon!" });
      setForm({ name: "", email: "", company: "", phone: "", budget: "", message: "" });
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
        className="w-full h-14 rounded-full border border-white/10 px-5 bg-white/3 text-white placeholder-white/40 outline-none transition"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className="w-full h-14 rounded-full border border-white/10 px-5 bg-white/3 text-white placeholder-white/40 outline-none transition"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          type="text"
          placeholder="Company name"
          className="w-full h-14 rounded-full border border-white/10 px-5 bg-white/3 text-white placeholder-white/40 outline-none transition"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Phone"
          className="w-full h-14 rounded-full border border-white/10 px-5 bg-white/3 text-white placeholder-white/40 outline-none transition"
        />
      </div>

      <select
        name="budget"
        value={form.budget}
        onChange={handleChange}
        className="w-full h-14 rounded-full border border-white/10 px-5 bg-black text-white outline-none transition appearance-none"
      >
        <option value="">Select a budget</option>
        <option value="10k-25k">₹10,000 - ₹25,000</option>
        <option value="25k-50k">₹25,000 - ₹50,000</option>
        <option value="50k-100k">₹50,000 - ₹1,00,000</option>
        <option value="100k+">Above ₹1,00,000</option>
      </select>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="What can we help you with?"
        className="w-full rounded-xl border border-white/10 px-5 py-4 h-40 bg-white/3 text-white outline-none transition resize-none"
      />

      {/* Submit button — ✅ no nested buttons */}
      <div className="mt-2 w-full">
        <Button
          label={loading ? "Sending..." : "Send Message"}
          variant="primary"
          type="submit"              // makes Button submit the form
          disabled={loading}         // disables while sending
          className="w-full justify-center"
        />
      </div>

      {/* Feedback messages */}
      {status.type === "success" && (
        <p className="text-green-400 text-sm mt-2">{status.message}</p>
      )}
      {status.type === "error" && (
        <p className="text-red-400 text-sm mt-2">{status.message}</p>
      )}
    </form>
  );
}
