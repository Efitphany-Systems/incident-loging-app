"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader } from "lucide-react";
import { uploadImage } from "@/lib/supabase/images-browser-client";
import { Image } from "@/types/common";
import { ImagePreview } from "./ImagePreview";

type Props = {
  value?: Image[] | Image;
  onChange?: (urls: Image[]) => void;
  error?: string;
  maxFiles: number;
  label?: string;
  showCount?: boolean;
};

export default function ImageUploader({ value = [], onChange, error, maxFiles = 5, label, showCount = false }: Props) {
  const images = Array.isArray(value) ? value : [value];

  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        const urls = await Promise.all(acceptedFiles.map((file) => uploadImage(file)));
        const updated = [...images, ...urls].slice(0, maxFiles);

        onChange?.(updated);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, maxFiles]
  );

  const removeFile = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange?.(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    disabled: uploading || images.length >= maxFiles,
  });

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">{label}</h3>
        {showCount && (
          <p className="text-muted-foreground text-xs">
            ({images.length}/{maxFiles})
          </p>
        )}
      </div>

      {/* Upload Area */}
      {images.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`border-border cursor-pointer rounded-lg border border-dashed p-6 text-center transition ${
            isDragActive ? "bg-muted/40 border-primary" : ""
          } `}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <Loader className="mx-auto mb-2 h-6 w-6 animate-spin" />
          ) : (
            <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
          )}

          <p className="text-muted-foreground text-sm">Drag & drop images here or click to upload</p>
          <p className="text-muted-foreground mt-1 text-xs">Maximum {maxFiles} images</p>
        </div>
      )}

      <div className={`grid gap-3 ${maxFiles < 3 ? `grid-cols-${maxFiles} md:grid-cols-3` : `grid-cols-${maxFiles}`}`}>
        {images.map((img, index) => (
          <ImagePreview key={index} image={img} onRemove={() => removeFile(index)} />
        ))}
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
