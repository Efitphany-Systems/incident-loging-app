"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader } from "lucide-react";
import { uploadImage } from "@/lib/supabase/images-browser-client";

const MAX_FILES = 5;

interface FilesPath {
  path: string;
  url: string;
}

type Props = {
  value?: FilesPath[];
  onChange?: (urls: FilesPath[]) => void;
  error?: string;
};

export default function ImageUploader({ value = [], onChange, error }: Props) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);

        const urls = await Promise.all(acceptedFiles.map((file) => uploadImage(file)));

        const updated = [...value, ...urls].slice(0, MAX_FILES);

        onChange?.(updated);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
      }
    },
    [value, onChange]
  );

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange?.(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    disabled: uploading || value.length >= MAX_FILES,
  });

  return (
    <div className="space-y-3">
      {/* Label */}
      <div>
        <h3 className="text-sm font-semibold">Incident Photos</h3>
        <p className="text-muted-foreground text-xs">
          Upload photos related to the incident ({value.length}/{MAX_FILES})
        </p>
      </div>

      {/* Upload Area */}
      {value.length < MAX_FILES && (
        <div
          {...getRootProps()}
          className={`border-border cursor-pointer rounded-lg border border-dashed p-6 text-center transition ${isDragActive ? "bg-muted/40 border-primary" : ""} `}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <Loader className="mx-auto mb-2 h-6 w-6 animate-spin" />
          ) : (
            <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
          )}

          <p className="text-muted-foreground text-sm">Drag & drop images here or click to upload</p>

          <p className="text-muted-foreground mt-1 text-xs">Maximum {MAX_FILES} images</p>
        </div>
      )}

      {/* Preview Grid */}
      <div className="grid grid-cols-5 gap-3">
        {value.map(({ url }, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-md border">
            <img src={url} alt="incident" className="h-full w-full object-cover" />

            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
