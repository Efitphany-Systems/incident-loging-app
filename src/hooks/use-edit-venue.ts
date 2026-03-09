"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Venue } from "@/types/venues";
import { UpdateVenueFormValues, UpdateVenuePload, updateVenueSchema } from "@/lib/schema/venus";
import { updateVenueAction } from "@/app/(authenticated)/(admin)/venues/[id]/action";

export function useEditVenue(venue: Venue) {
  const router = useRouter();
  const form = useForm<UpdateVenueFormValues>({
    resolver: zodResolver(updateVenueSchema),
    defaultValues: {
      name: venue.name ?? "",
      address: venue.address ?? "",
      additional_information: venue.additional_information,
      logo: venue.logo ?? [],
    },
  });

  const updateVenue = form.handleSubmit(async (data: UpdateVenuePload) => {
    try {
      await updateVenueAction(data, venue.id);
      router.push("/venues");
    } catch (e) {
      form.setError("root", {
        type: "server",
        message: "Failed to update venue",
      });
    }
  });

  return {
    ...form,
    updateVenue,
  };
}
