"use server";

import { supabaseServer } from "@/lib/supabase/server-client";
import { Image } from "@/types/common";

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

export async function moveImagesFromTempToStorage<T extends Image | Image[] | {}>(
  basePath: string,
  images: T
): Promise<T> {
  const supabase = await supabaseServer();

  const imageList = Array.isArray(images) ? images : [images];
  const movedImages: Image[] = [];

  for (const image of imageList) {
    const fileName = image.path.split("/").pop();
    if (!fileName) continue;

    const newPath = `${basePath}/${fileName}`;
    console.log("BASE PATH:", newPath, " image.path", image.path);

    const { error } = await supabase.storage.from(BUCKET).move(image.path, newPath);

    if (error) {
      console.error("Image move failed:", error);
      continue;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(newPath);

    movedImages.push({
      path: newPath,
      url: data.publicUrl,
    });
  }

  if (Array.isArray(images)) {
    return movedImages as T;
  }

  return (movedImages[0] ?? {}) as T;
}
