import PageHeader from "@/components/layouts/PageHeader";
import CreateEventForm from "./CreateEventForm";

const page = () => {
  return (
    <div className="mx-auto">
      <PageHeader name="Create New Event" />
      <CreateEventForm />
    </div>
  );
};

export default page;
