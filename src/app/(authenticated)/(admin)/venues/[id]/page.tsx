import PageHeader from "@/components/layouts/PageHeader";
import EditVenueForm from "./EditVenueForm";
import { PageIDParams } from "@/types/common";
import { getVenueByID } from "./action";

export default async function EditVenuePage({ params }: PageIDParams) {
  const { id } = await params;
  console.log("id is here ", id);

  const venue = await getVenueByID(id);
  return (
    <div className="mx-auto">
      <PageHeader name="Edit Venue Information" />
      <EditVenueForm venue={venue} />
    </div>
  );
}
