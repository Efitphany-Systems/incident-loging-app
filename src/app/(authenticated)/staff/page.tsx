import StaffTable from "./components/StaffTable";
import StaffPageHeader from "./components/StaffPageHeader";

const page = () => {
  return (
    <div className="mx-auto">
      <StaffPageHeader />
      <StaffTable
        staff={[
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            role: "admin",
          },
        ]}
      />
    </div>
  );
};

export default page;
