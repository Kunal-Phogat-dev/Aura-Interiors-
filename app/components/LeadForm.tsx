"use client";

import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    requirement: "Residential Home"
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-md w-full p-8 bg-[#111111] border border-[#333333] flex flex-col items-center justify-center text-center mx-auto">
        <p className="text-[#C9A84C] text-lg font-serif mb-2">Request Received. Thank you.</p>
        <p className="text-[#F5F0E8] text-sm leading-relaxed">We will call you within 2 hours to discuss your space.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-[#111111] border border-[#333333] p-8 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[#888888] text-xs uppercase tracking-[0.15em]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#333333] pb-2 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-[#888888] text-xs uppercase tracking-[0.15em]">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+91"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#333333] pb-2 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
        </div>

        {/* What are you looking to design? */}
        <div className="flex flex-col gap-2">
          <label htmlFor="requirement" className="text-[#888888] text-xs uppercase tracking-[0.15em]">
            What are you looking to design?
          </label>
          <select
            id="requirement"
            name="requirement"
            required
            value={formData.requirement}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#333333] pb-2 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none cursor-pointer"
          >
            <option value="Residential Home" className="bg-[#111111]">Residential Home</option>
            <option value="Commercial Space" className="bg-[#111111]">Commercial Space</option>
            <option value="Single Room" className="bg-[#111111]">Single Room</option>
            <option value="Office" className="bg-[#111111]">Office</option>
            <option value="Other" className="bg-[#111111]">Other</option>
          </select>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-xs">An error occurred. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-4 w-full py-4 bg-[#C9A84C] text-[#0A0A0A] uppercase tracking-widest text-xs font-bold hover:bg-[#b0923f] transition-colors disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Book My Free Consultation"}
        </button>

      </form>
    </div>
  );
}
