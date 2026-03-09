import { useState } from "react";
import { Loader, X } from "lucide-react";
import { Image as TImage } from "@/types/common";
import { Button } from "./ui/button";
import Image from "next/image";

type ImagePreviewProps = {
  image: TImage;
  onRemove?: () => void;
};

export function ImagePreview({ image, onRemove }: ImagePreviewProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-md border md:max-h-44 md:max-w-44">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      )}
      <Image
        width={100}
        height={100}
        alt="-"
        src={image.url}
        className="h-full w-full object-cover"
        onLoad={() => setLoading(false)}
      />
      {onRemove && (
        <Button
          type="button"
          variant="link"
          onClick={onRemove}
          className="absolute top-1 right-1 rounded-full shadow transition"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
}
