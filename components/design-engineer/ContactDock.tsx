"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  ArrowLeft,
  Check,
  RotateCcw,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/data/resume";
import Image from "next/image";

interface ContactDockProps {
  placement?: "dock" | "header";
  align?: "start" | "end";
}

export function ContactDock({ placement = "dock", align = "start" }: ContactDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [step, setStep] = useState<"intro" | "form">("intro");

  useEffect(() => {
    setMounted(true);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = "Your name is required";
    if (!email.trim()) {
      errs.email = "Your email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email";
    }
    if (!message.trim()) errs.message = "Please write a message";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detection
    if (!validate()) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrors({});
    setStep("intro");
  };

  return (
    <div
      className={cn(
        "relative",
        placement === "dock" ? "size-10" : "size-10"
      )}
    >
      {/* Avatar Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setStep("intro");
        }}
        aria-label="Contact Faiz"
        aria-expanded={isOpen}
        className="relative block size-10 rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fg)]"
      >
        <span
          className="block size-10 rounded-xl bg-[url(/profiless.png)] bg-cover bg-center outline-1 -outline-offset-[0.5px] outline-[var(--color-border)]"
        />
        <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full bg-[#28c840] ring-2 ring-[var(--color-bg)]" />
      </button>

      {/* Contact Card Modal / Popover */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 rounded-[22px] bg-[var(--color-bg)] p-4 shadow-[var(--shadow-dialog)] border border-[var(--color-border)] transition-all duration-200",
            placement === "dock"
              ? "bottom-[56px] left-0 w-[320px]"
              : align === "end"
              ? "top-[52px] right-0 w-[min(320px,calc(100vw-40px))]"
              : "top-[52px] left-0 w-[min(320px,calc(100vw-40px))]"
          )}
          role="dialog"
          aria-label={`Contact ${DATA.name.split(" ")[0]}`}
        >
          {step === "intro" ? (
            <div className="flex flex-col gap-3.5">
              {/* Header profile info */}
              <div className="flex items-center gap-3">
                <div className="relative size-11 shrink-0 rounded-[13px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                  <Image
                    src={DATA.avatarUrl}
                    alt={DATA.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-[var(--color-fg)]">
                    {DATA.name}
                  </span>
                  <span className="text-[13px] text-[var(--color-fg-secondary)]">
                    {DATA.description} · {DATA.location}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex w-fit items-center gap-1.5 rounded-full bg-[#28c840]/10 px-2.5 py-[5px] text-[13px] font-medium text-[#1a7f2b]">
                <span className="size-[7px] rounded-full bg-[#28c840]" />
                Available for new work
              </div>

              {/* Primary Action Button */}
              <Button
                type="button"
                onClick={() => setStep("form")}
                className="w-full h-11 rounded-full gap-2 text-[14px]"
              >
                <Send className="size-4" />
                Write a message
              </Button>

              <p className="text-center text-[13px] text-[var(--color-fg-secondary)]">
                or email{" "}
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="text-[var(--color-fg)] underline decoration-[var(--color-fg)]/30 underline-offset-[3px] hover:decoration-[var(--color-fg)]"
                >
                  {DATA.contact.email}
                </a>
              </p>

              <div className="h-px bg-[var(--color-border-subtle)]" />

              {/* Social icons row */}
              <div className="flex h-10 items-center justify-between p-0.5">
                <a
                  href={`mailto:${DATA.contact.email}`}
                  aria-label="Email"
                  title="Email"
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <Mail className="size-4" />
                </a>
                <a
                  href="https://wa.me/6282115974856"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  </svg>
                </a>
                <a
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href={DATA.contact.social.GitHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                {mounted && (
                  <button
                    type="button"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    title="Toggle theme"
                    className="flex size-9 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors cursor-pointer"
                  >
                    {theme === "dark" ? (
                      <Sun className="size-4 text-amber-400" />
                    ) : (
                      <Moon className="size-4" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close contact card"
                  title="Close"
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep("intro")}
                  aria-label="Back to contact card"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <div className="relative size-7 shrink-0 rounded-[9px] overflow-hidden border border-[var(--color-border)]">
                  <Image
                    src={DATA.avatarUrl}
                    alt={DATA.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-medium text-[var(--color-fg)]">
                  Message {DATA.name.split(" ")[0]}
                </h3>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#28c840]/10 px-4 py-6 text-center">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#28c840] text-white">
                    <Check className="size-5" />
                  </span>
                  <p className="text-[16px] font-medium text-[var(--color-fg)]">
                    Message sent successfully
                  </p>
                  <p className="text-[13px] text-[var(--color-fg-secondary)]">
                    Thank you! I will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 text-[14px] text-[var(--color-fg-secondary)] underline decoration-[var(--color-fg)]/30 underline-offset-[3px] hover:text-[var(--color-fg)] cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-name" className="text-[13px] text-[var(--color-fg-secondary)]">
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && (
                      <span className="text-[12px] text-[#b42318]">{errors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-email" className="text-[13px] text-[var(--color-fg-secondary)]">
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <span className="text-[12px] text-[#b42318]">{errors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-message" className="text-[13px] text-[var(--color-fg-secondary)]">
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you working on?"
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && (
                      <span className="text-[12px] text-[#b42318]">{errors.message}</span>
                    )}
                  </div>

                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full h-11 rounded-full gap-2 text-[14px] mt-1"
                  >
                    {status === "sending" ? (
                      <>
                        <RotateCcw className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
