"use client";

import * as React from "react";
import { useState } from "react";
import { ExternalLink, Award, ShieldCheck } from "lucide-react";
import { CERTIFICATES_DATA } from "@/lib/data/certificates";
import { cn } from "@/lib/utils";

export function CertificatesAndAwards() {
  const [filter, setFilter] = useState<"All" | "Award" | "Certificate">("All");

  const filteredItems =
    filter === "All"
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((item) => item.category === filter);

  return (
    <section aria-labelledby="certs-title" className="py-10 border-t border-[var(--color-border)]">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2
            id="certs-title"
            className="text-[17px] font-medium tracking-tight text-[var(--color-fg)]"
          >
            Certificates & Awards
          </h2>
          <p className="text-[14px] text-[var(--color-fg-secondary)] mt-0.5">
            Verified credentials, competition recognitions, and engineering achievements
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[var(--color-bg-subtle)] p-1 rounded-full border border-[var(--color-border)] w-fit">
          {(["All", "Award", "Certificate"] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={cn(
                  "px-3 py-1 text-[12px] font-medium rounded-full transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-[var(--color-fg)] text-[var(--color-fg-inverse)] shadow-xs"
                    : "text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)]"
                )}
              >
                {tab === "All" ? "All" : tab === "Award" ? "Awards" : "Certificates"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items List */}
      <div className="flex flex-col divide-y divide-[var(--color-border)]">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="group py-4.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors hover:bg-[var(--color-bg-hover)] -mx-3 px-3 rounded-[14px]"
          >
            <div className="flex flex-col gap-1.5 max-w-[480px]">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium",
                    item.category === "Award"
                      ? "bg-[#ff6308]/10 text-[#ff6308] border border-[#ff6308]/20"
                      : "bg-[#28c840]/10 text-[#1a7f2b] border border-[#28c840]/20"
                  )}
                >
                  {item.category === "Award" ? (
                    <Award className="size-3" />
                  ) : (
                    <ShieldCheck className="size-3" />
                  )}
                  <span>{item.category}</span>
                </span>
                <span className="text-[12px] font-mono text-[var(--color-fg-secondary)]">
                  {item.year}
                </span>
                {item.credentialId && (
                  <span className="text-[11px] font-mono text-[var(--color-fg-secondary)] bg-[var(--color-bg-subtle)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
                    ID: {item.credentialId}
                  </span>
                )}
              </div>

              <h3 className="text-[15px] font-medium text-[var(--color-fg)] group-hover:text-[var(--color-focus)] transition-colors">
                {item.title}
              </h3>

              <p className="text-[13px] text-[var(--color-fg-secondary)] leading-relaxed">
                <span className="font-medium text-[var(--color-fg)]/80">{item.issuer}</span>
                {item.description && ` · ${item.description}`}
              </p>
            </div>

            {/* Action / Credential Link */}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)] shrink-0 pt-0.5 group-hover:translate-x-0.5 transition-all"
                aria-label={`Verify credential for ${item.title}`}
              >
                <span>Verify</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
