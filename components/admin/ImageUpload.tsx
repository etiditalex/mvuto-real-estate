"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/supabase/storage";
import { cn } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";

type ImageUploadProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  hint?: string;
};

export default function ImageUpload({
  label = "Image",
  value,
  onChange,
  folder = "general",
  hint,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-primary">{label}</p>}

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-primary/15">
          <div className="relative h-40 w-full">
            <Image
              {...propertyImageProps(value)}
              alt="Upload preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-primary/80 p-1.5 text-white hover:bg-primary"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 py-8 transition hover:border-accent hover:bg-accent-blend/30",
            uploading && "opacity-60"
          )}
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-accent" />
          ) : (
            <Upload size={24} className="text-accent" />
          )}
          <span className="text-sm font-medium text-primary/70">
            {uploading ? "Uploading..." : "Click to upload image"}
          </span>
          <span className="text-xs text-primary/40">PNG, JPG, WebP up to 10MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL..."
        className="w-full rounded-xl border border-primary/20 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-blend"
      />

      {hint && !error && <p className="text-xs text-primary/50">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
