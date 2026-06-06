"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    // Email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("signups")
        .insert({ email: email.toLowerCase().trim(), source: "landing_page" });

      if (error) {
        // Handle duplicate email
        if (error.code === "23505") {
          setMessage("You're already on the list! 🎉");
          setMessageType("success");
          setEmail("");
        } else {
          setMessage("Something went wrong. Please try again.");
          setMessageType("error");
        }
      } else {
        setMessage("🎉 You're on the list! We'll notify you at launch.");
        setMessageType("success");
        setEmail("");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="px-6 py-6 md:px-12">
        <h1 className="text-2xl font-bold text-marigold">Padosti</h1>
      </header>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 md:px-12 md:pt-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">
          Where neighbours
          <br />
          become friends
        </h2>
        <p className="text-lg md:text-xl text-charcoal/80 mb-10 max-w-2xl mx-auto">
          Rent household items, furniture, sports gear, party supplies and more
          — from trusted neighbours within 10 miles. Borrow what you need,
          share what you own.
        </p>

        {/* Email Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="flex-1 px-5 py-3 rounded-lg border-2 border-charcoal/20 focus:border-marigold focus:outline-none text-charcoal bg-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-marigold text-white font-semibold rounded-lg hover:bg-marigold/90 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "Signing up..." : "Notify me at launch"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              messageType === "success" ? "text-teal" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-sm italic text-charcoal/60">
          Pados (neighbour) + Dosti (friendship) = Padosti
        </p>
      </section>

      {/* What You Can Rent */}
      <section className="px-6 py-16 md:px-12 max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-12">
          What you can rent
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            icon="🏠"
            title="Household Essentials"
            description="Power tools, appliances, kitchen gadgets, cleaning equipment"
          />
          <CategoryCard
            icon="🛋️"
            title="Furniture"
            description="Folding chairs, tables, extra beds, party setups"
          />
          <CategoryCard
            icon="⚽"
            title="Sports & Outdoor"
            description="Camping gear, bicycles, sports equipment, BBQ grills"
          />
          <CategoryCard
            icon="🎉"
            title="Events & Parties"
            description="Decorations, sound systems, catering equipment, lighting"
          />
          <CategoryCard
            icon="👶"
            title="Kids & Baby"
            description="Strollers, car seats, toys, party supplies"
          />
          <CategoryCard
            icon="🪔"
            title="Cultural & Festive"
            description="Pooja items, biryani handis, Diwali decor, traditional wear"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:px-12 bg-teal/5 max-w-6xl mx-auto rounded-3xl my-12">
        <h3 className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-12">
          How Padosti works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            icon="🔍"
            title="Browse"
            description="Find items from neighbours within 10 miles"
          />
          <StepCard
            number="2"
            icon="💬"
            title="Connect"
            description="Message the owner, agree on pickup"
          />
          <StepCard
            number="3"
            icon="🤝"
            title="Borrow"
            description="Pay safely, use, return, leave a review"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 md:px-12 text-center text-charcoal/60 text-sm">
        <p>A trusted rental community for your neighbourhood</p>
        <p className="mt-2">Launching Summer 2026 · padosti.com</p>
      </footer>
    </main>
  );
}

function CategoryCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-charcoal/10 hover:border-marigold/40 hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-charcoal mb-2">{title}</h4>
      <p className="text-charcoal/70 text-sm">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-marigold font-bold mb-2">Step {number}</div>
      <h4 className="text-xl font-bold text-charcoal mb-2">{title}</h4>
      <p className="text-charcoal/70">{description}</p>
    </div>
  );
}