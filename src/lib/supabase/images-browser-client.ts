import { createClient } from "./browser-client";

export async function uploadImage(file: File) {
  const supabase = createClient();

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `temp/${fileName}`;

  const { error } = await supabase.storage.from("incidents-images").upload(filePath, file);
  if (error) throw error;

  const { data } = supabase.storage.from("incidents-images").getPublicUrl(filePath);

  return {
    url: data.publicUrl,
    path: filePath,
  };
}

export async function deleteImage(path: string) {
  const supabase = createClient();
  await supabase.storage.from("incident-images").remove([path]);
}
