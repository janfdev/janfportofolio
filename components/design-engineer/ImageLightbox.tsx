"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageLightbox({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
  className,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsZoomed(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <figure className={cn("my-6 flex flex-col gap-2.5", className)}>
      <div className="group relative overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          unoptimized
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute right-3.5 bottom-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-[12px] font-medium text-white shadow-md backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ZoomIn className="size-3.5" />
          <span>View full size</span>
        </button>
      </div>

      {caption && (
        <figcaption className="text-center text-[13px] text-[var(--color-fg-secondary)]">
          {caption}
        </figcaption>
      )}

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-200"
          onClick={() => {
            setIsOpen(false);
            setIsZoomed(false);
          }}
        >
          <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              {isZoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsZoomed(false);
              }}
              aria-label="Close full size view"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            className={cn(
              "relative max-h-[90vh] max-w-[95vw] transition-transform duration-200 cursor-zoom-out",
              isZoomed && "scale-125"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
              unoptimized
            />
            {caption && (
              <p className="mt-3 text-center text-[14px] text-white/80">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
