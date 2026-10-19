"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  Clock,
  Sparkles,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { Icons } from "@/components/icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Invalid email format. Please verify and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to local storage dashboard (janfporto-dashboard-v1)
      const KEY = "janfporto-dashboard-v1";
      const raw = localStorage.getItem(KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          const nextId = (parsed.seq || 100) + 1;
          const newMessage = {
            id: nextId,
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.subject.trim()
              ? `[${formData.subject.trim()}] ${formData.message.trim()}`
              : formData.message.trim(),
            read: false,
            createdAt: new Date().toISOString(),
          };
          parsed.messages = [newMessage, ...(parsed.messages || [])];
          parsed.seq = nextId;
          localStorage.setItem(KEY, JSON.stringify(parsed));
        } catch {
          // Ignore parse errors
        }
      }

      // Simulated dispatch latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Opportunities & Collaboration</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have a project in mind, an engineering inquiry, or want to discuss fullstack architecture? Drop a message using the form below or connect through direct channels.
          </p>
        </div>

        {/* Content Grid: Contact Cards & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Direct Email Card */}
            <Card className="border border-border/60 bg-card/60 backdrop-blur-xs">
              <CardContent className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Official Email
                      </p>
                      <a
                        href={`mailto:${DATA.contact.email}`}
                        className="text-sm font-bold text-foreground hover:text-emerald-500 transition-colors"
                      >
                        {DATA.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-border/40">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="flex-1 text-xs gap-1.5 h-8 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </Button>
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="flex-1 text-xs gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 font-semibold"
                  >
                    <a href={`mailto:${DATA.contact.email}`}>Send Email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location & Response Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card/40">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">{DATA.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card/40">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="text-sm font-semibold text-foreground">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col gap-2.5 p-5 rounded-xl border border-border/50 bg-card/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Professional Channels
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={DATA.contact.social.GitHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 hover:bg-muted/60 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icons.github className="size-4 text-foreground" />
                    <span className="text-xs font-medium text-foreground">GitHub</span>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-emerald-500 transition-colors">
                    github.com/janfdev
                  </span>
                </a>

                <a
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 hover:bg-muted/60 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icons.linkedin className="size-4 text-foreground" />
                    <span className="text-xs font-medium text-foreground">LinkedIn</span>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-emerald-500 transition-colors">
                    linkedin.com/in/rizqinoorfauzan
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="border border-border/60 bg-card/80 backdrop-blur-md shadow-lg shadow-black/5">
              <CardContent className="p-6 sm:p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                    <div className="size-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <Sparkles className="size-7" />
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-md">
                      <h3 className="text-xl font-bold text-foreground">Message Delivered!</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Thank you for reaching out. Your message has been received and I will get back to you shortly.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 text-xs cursor-pointer"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                      <MessageSquare className="size-4.5 text-emerald-500" />
                      <h2 className="text-base font-semibold text-foreground">Send a Message</h2>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-lg text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <Label htmlFor="contact-name">Full Name *</Label>
                        <Input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <Label htmlFor="contact-email">Email Address *</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <Label htmlFor="contact-subject">Subject (Optional)</Label>
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder="e.g. Distributed System Architecture / Fullstack Role"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="contact-message">Message *</Label>
                      <Textarea
                        id="contact-message"
                        required
                        rows={5}
                        placeholder="Write your project scope, inquiry, or question here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-[11px] text-muted-foreground">
                        * Required fields
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 font-semibold px-5 cursor-pointer shadow-sm active:scale-95 transition-all"
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="size-3.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
