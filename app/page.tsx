"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [message2, setMessage2] = useState("");
  const [messageType2, setMessageType2] = useState<"success" | "error" | "">("");

  const handleSubmit = async (
    e: React.FormEvent,
    emailValue: string,
    setEmailFn: (v: string) => void,
    setLoadingFn: (v: boolean) => void,
    setMessageFn: (v: string) => void,
    setMessageTypeFn: (v: "success" | "error" | "") => void
  ) => {
    e.preventDefault();
    setMessageFn("");
    setMessageTypeFn("");

    if (!emailValue || !emailValue.includes("@") || !emailValue.includes(".")) {
      setMessageFn("Please enter a valid email address.");
      setMessageTypeFn("error");
      return;
    }

    setLoadingFn(true);

    try {
      const { error } = await supabase
        .from("signups")
        .insert({ email: emailValue.toLowerCase().trim(), source: "landing_page" });

      if (error) {
        if (error.code === "23505") {
          setMessageFn("You're already on the list! 🎉");
          setMessageTypeFn("success");
          setEmailFn("");
        } else {
          setMessageFn("Something went wrong. Please try again.");
          setMessageTypeFn("error");
        }
      } else {
        setMessageFn("🎉 You're on the list! We'll notify you at launch.");
        setMessageTypeFn("success");
        setEmailFn("");
      }
    } catch (err) {
      setMessageFn("Something went wrong. Please try again.");
      setMessageTypeFn("error");
    } finally {
      setLoadingFn(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient layers */}
      <div className="fixed inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at top left, rgba(232,119,34,0.14), transparent 50%), radial-gradient(ellipse at bottom right, rgba(11,110,110,0.10), transparent 50%), linear-gradient(180deg, #FFF8EE 0%, #FFEDD8 30%, #FFF8EE 70%, #FFEDD8 100%)"
      }}></div>

      {/* Floating orbs */}
      <div className="absolute top-16 -right-12 w-48 h-48 rounded-full -z-10" style={{
        background: "radial-gradient(circle, rgba(232,119,34,0.18), transparent 70%)"
      }}></div>
      <div className="absolute top-96 -left-16 w-56 h-56 rounded-full -z-10" style={{
        background: "radial-gradient(circle, rgba(11,110,110,0.14), transparent 70%)"
      }}></div>

      {/* Header */}
      <header className="px-4 md:px-12 py-4 md:py-5 flex items-center justify-between backdrop-blur-md border-b" style={{
        background: "rgba(255,248,238,0.7)",
        borderColor: "rgba(31,41,55,0.06)"
      }}>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-medium text-sm md:text-base" style={{
            background: "linear-gradient(135deg, #E87722, #F89537)",
            boxShadow: "0 4px 12px rgba(232,119,34,0.25)"
          }}>P</div>
          <div className="text-lg md:text-xl font-medium" style={{ color: "#E87722", letterSpacing: "-0.3px" }}>padosti</div>
        </div>
        <div className="flex gap-3 md:gap-5 items-center text-sm">
          <a href="#how-it-works" className="hidden md:inline text-charcoal/70 hover:text-charcoal">How it works</a>
          <a href="#categories" className="hidden md:inline text-charcoal/70 hover:text-charcoal">Categories</a>
          <a href="#join" className="text-white px-4 md:px-5 py-2 rounded-full text-xs md:text-sm" style={{
            background: "#E87722",
            boxShadow: "0 4px 12px rgba(232,119,34,0.3)"
          }}>Join waitlist</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-6 pt-8 md:pt-14 pb-4 md:pb-8 text-center relative">
        <div className="inline-block backdrop-blur-md text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-5 font-medium border" style={{
          background: "rgba(255,255,255,0.75)",
          color: "#0B6E6E",
          borderColor: "rgba(11,110,110,0.15)"
        }}>
          🪔 Launching summer 2026 · Free to join
        </div>

        <h1 className="text-3xl md:text-5xl font-medium leading-tight mb-3 md:mb-4 text-charcoal" style={{ letterSpacing: "-0.8px" }}>
          Borrow from neighbours.{" "}
          <span style={{
            background: "linear-gradient(135deg, #E87722, #F89537)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>Share what you own.</span>
        </h1>

        <p className="text-sm md:text-lg text-charcoal/75 max-w-md md:max-w-xl mx-auto mb-5 md:mb-7 leading-relaxed px-2">
          Everything you occasionally need is already on your street. <em>Borrowed, not bought.</em>
        </p>

        {/* Email Form */}
        <form
          onSubmit={(e) => handleSubmit(e, email, setEmail, setLoading, setMessage, setMessageType)}
          className="flex gap-1.5 max-w-sm md:max-w-md mx-auto mb-3 p-1.5 rounded-2xl bg-white border"
          style={{
            boxShadow: "0 10px 30px rgba(31,41,55,0.08), 0 2px 6px rgba(31,41,55,0.05)",
            borderColor: "rgba(31,41,55,0.06)"
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-transparent outline-none text-charcoal disabled:opacity-50 min-w-0"
          />
          <button
            type="submit"
            disabled={loading}
            className="text-white font-medium text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3 rounded-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #E87722, #F89537)",
              boxShadow: "0 4px 12px rgba(232,119,34,0.3)"
            }}
          >
            {loading ? "..." : "Notify me"}
          </button>
        </form>

        {message && (
          <p className={`mt-3 text-sm font-medium ${messageType === "success" ? "text-teal" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="text-xs text-charcoal/55 font-medium mt-2">
          <span style={{ color: "#E87722" }}>Pados</span> + <span style={{ color: "#0B6E6E" }}>Dosti</span> = <span className="font-semibold">Padosti</span> — your neighbourhood, your people · No spam, ever
        </p>

        {/* Mobile scroll cue */}
        <div className="md:hidden flex flex-col items-center gap-1 mt-4 mb-1 text-xs text-charcoal/55 font-medium">
          <span>See what&apos;s possible</span>
          <span className="text-lg animate-bounce" style={{ color: "#E87722" }}>↓</span>
        </div>
      </section>

      {/* Rent / Share Section */}
      <section className="px-4 md:px-6 relative -mb-8 z-10">
        <div className="bg-white rounded-t-3xl px-5 md:px-12 pt-6 md:pt-10 pb-10 md:pb-14 border border-b-0 max-w-3xl mx-auto" style={{
          boxShadow: "0 -10px 40px rgba(31,41,55,0.06)",
          borderColor: "rgba(31,41,55,0.06)"
        }}>
          <div className="text-center mb-5 md:mb-7">
            <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E87722" }}>
              ✨ Choose your vibe
            </div>
            <h2 className="text-xl md:text-3xl font-medium mt-1.5 md:mt-2" style={{ letterSpacing: "-0.5px" }}>
              Rent it · Or share for free
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Rent Card */}
            <div className="rounded-2xl p-4 md:p-6 border-2" style={{
              borderColor: "#E87722",
              background: "linear-gradient(135deg, rgba(232,119,34,0.06), rgba(248,149,55,0.03))"
            }}>
              <div className="flex md:block items-start gap-3">
                <div className="text-3xl md:text-4xl mb-0 md:mb-2">💰</div>
                <div>
                  <div className="font-semibold text-base md:text-lg text-charcoal">Rent it</div>
                  <div className="text-xs md:text-sm text-charcoal/70 mt-1 leading-relaxed">
                    Earn extra income on things you rarely use.
                  </div>
                </div>
              </div>
            </div>

            {/* Share Free Card */}
            <div className="rounded-2xl p-4 md:p-6 border-2" style={{
              borderColor: "#0B6E6E",
              background: "linear-gradient(135deg, rgba(11,110,110,0.06), rgba(11,110,110,0.03))"
            }}>
              <div className="flex md:block items-start gap-3">
                <div className="text-3xl md:text-4xl mb-0 md:mb-2">🤝</div>
                <div>
                  <div className="font-semibold text-base md:text-lg text-charcoal">Share for free</div>
                  <div className="text-xs md:text-sm text-charcoal/70 mt-1 leading-relaxed">
                    Community kindness — because what&apos;s mine is yours.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Icon Grid */}
      <section id="categories" className="px-4 md:px-6 py-10 md:py-14 pt-14 md:pt-20" style={{
        background: "linear-gradient(180deg, white 0%, #FFF8EE 100%)"
      }}>
        <div className="text-center mb-6 md:mb-8 max-w-6xl mx-auto">
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E87722" }}>
            📦 What neighbours share
          </div>
          <h2 className="text-xl md:text-3xl font-medium mt-1.5 md:mt-2" style={{ letterSpacing: "-0.5px" }}>
            From everyday to once-a-year
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
          <CategoryTile icon="🍳" title="Kitchen" />
          <CategoryTile icon="🛠️" title="Tools" />
          <CategoryTile icon="📚" title="Education" />
          <CategoryTile icon="🛋️" title="Furniture" />
          <CategoryTile icon="🎉" title="Events" />
          <CategoryTile icon="⚽" title="Sports" />
          <CategoryTile icon="👶" title="Kids" />
          <CategoryTile icon="🪔" title="Pooja" />
          <CategoryTile icon="✈️" title="Travel" />
        </div>

        <p className="text-center text-xs md:text-sm text-charcoal/55 mt-5 md:mt-7 max-w-2xl mx-auto px-4">
          From Instant Pots to mandap setups · pressure cookers to telescopes · 100s of items
        </p>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 md:px-6 py-10 md:py-14 text-white" style={{
        background: "linear-gradient(135deg, #0B6E6E 0%, #084848 100%)"
      }}>
        <div className="text-center mb-6 md:mb-10 max-w-5xl mx-auto">
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
            🔄 How it works
          </div>
          <h2 className="text-xl md:text-3xl font-medium mt-1.5 md:mt-2 text-white" style={{ letterSpacing: "-0.5px" }}>
            Three steps. Done.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
          <StepCard icon="🔍" title="Find" description="Browse items within 10 miles" />
          <StepCard icon="💬" title="Connect" description="Message owner, arrange pickup" />
          <StepCard icon="🤝" title="Borrow" description="Use, return, leave a review" />
        </div>
      </section>

      {/* Second Email Form */}
      <section id="join" className="px-4 md:px-6 py-7 md:py-10 text-center" style={{
        background: "linear-gradient(180deg, #FFF8EE 0%, #FFEDD8 100%)"
      }}>
        <h3 className="text-lg md:text-2xl font-medium mb-2" style={{ letterSpacing: "-0.5px" }}>
          Be there when we launch
        </h3>
        <p className="text-xs md:text-sm text-charcoal/70 mb-4">
          Get first-in-neighbourhood access before public launch.
        </p>

        <form
          onSubmit={(e) => handleSubmit(e, email2, setEmail2, setLoading2, setMessage2, setMessageType2)}
          className="flex gap-1.5 max-w-sm mx-auto p-1.5 rounded-2xl bg-white border"
          style={{
            boxShadow: "0 10px 30px rgba(31,41,55,0.08)",
            borderColor: "rgba(31,41,55,0.06)"
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
            disabled={loading2}
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-transparent outline-none text-charcoal disabled:opacity-50 min-w-0"
          />
          <button
            type="submit"
            disabled={loading2}
            className="text-white font-medium text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3 rounded-xl whitespace-nowrap disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #E87722, #F89537)",
              boxShadow: "0 4px 12px rgba(232,119,34,0.3)"
            }}
          >
            {loading2 ? "..." : "Join"}
          </button>
        </form>

        {message2 && (
          <p className={`mt-3 text-sm font-medium ${messageType2 === "success" ? "text-teal" : "text-red-600"}`}>
            {message2}
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-5 text-center text-xs text-charcoal/50 bg-white border-t" style={{
        borderColor: "rgba(31,41,55,0.08)"
      }}>
        🪔 padosti.com · <span style={{ color: "#E87722" }}>Pados</span> + <span style={{ color: "#0B6E6E" }}>Dosti</span> · Where neighbours become friends
      </footer>
    </main>
  );
}

function CategoryTile({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 md:p-5 border text-center hover:shadow-md transition-shadow cursor-default" style={{
      borderColor: "rgba(31,41,55,0.06)",
      boxShadow: "0 2px 8px rgba(31,41,55,0.03)"
    }}>
      <div className="text-3xl md:text-4xl mb-1.5 md:mb-2">{icon}</div>
      <div className="font-semibold text-xs md:text-sm text-charcoal">{title}</div>
    </div>
  );
}

function StepCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-2 md:mb-3 text-xl md:text-2xl border" style={{
        background: "linear-gradient(135deg, rgba(232,119,34,0.3), rgba(248,149,55,0.18))",
        borderColor: "rgba(232,119,34,0.35)",
        color: "#F89537"
      }}>
        {icon}
      </div>
      <div className="font-semibold text-xs md:text-base mb-0.5 md:mb-1 text-white">{title}</div>
      <div className="text-[10px] md:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
        {description}
      </div>
    </div>
  );
}
