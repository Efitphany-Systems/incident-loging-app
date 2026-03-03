import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IncidentReport } from "@/types/incidents";
import { FORMAT_DATE, FORMAT_TIME } from "@/utils/datetime";
import { YES_NO } from "@/utils/display-utils";

export default function IncidentReportDisplay({ data }: { data: IncidentReport }) {
  const Field = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="grid grid-cols-12 gap-2 px-2 py-1 text-sm">
      <div className="text-muted-foreground col-span-4">{label}</div>
      <div className="text-foreground col-span-8 overflow-x-scroll font-medium">{value || "—"}</div>
    </div>
  );

  const Section = ({ title, children }: any) => (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="">{children}</CardContent>
    </Card>
  );

  return (
    <div className="mb-2 flex flex-col gap-2 max-sm:px-2">
      <div className="py-2 text-center">
        <div className="text-2xl font-semibold tracking-wide">INCIDENT REPORT</div>
      </div>

      {/* Event Info */}
      <Section title="SHOW INFORMATION">
        <Field label="Show/Event" value={data?.event_name} />
        <Field label="Venue" value={data?.venue} />
        <Field label="Date" value={FORMAT_DATE(data?.event_date)} />
        <Field label="Time" value={FORMAT_TIME(data?.start_time)} />
        <Field label="Statement" value={data?.description} />
      </Section>

      {/* Reporter */}
      <Section title="PERSON FILLING OUT REPORT">
        <Field label="Full Name" value={data.reporter?.name} />
        <Field label="Email" value={data.reporter?.email} />
        <Field label="Phone" value={data.reporter?.phone} />
        <Field label="Were they in use?" value={YES_NO(data.reporter?.in_use)} />
        <Field label="Wear Glasses/Contacts" value={YES_NO(data.reporter?.wears_glasses)} />
      </Section>

      {/* Witnesses */}
      {data.witnesses?.length > 0 && (
        <Section title="WITNESS">
          {data.witnesses.map((w, i) => (
            <>
              <div key={i}>
                <Field label="Full Name" value={w.name} />
                <Field label="Email" value={w.email} />
                <Field label="Phone" value={w.phone} />
                <Field label="Best Contact Time" value={w.contact_time} />
                <Field label="Employee" value={YES_NO(w.employee)} />
              </div>
              {i !== data.witnesses.length - 1 && <hr className="my-2" />}
            </>
          ))}
        </Section>
      )}

      {/* Patron */}
      <Section title="PATRON INFORMATION">
        <Field label="Full Name" value={data.patron?.name} />
        <Field label="Email" value={data.patron?.email} />
        <Field label="Phone" value={data.patron?.phone} />
        <Field label="Gender" value={data.patron?.gender} />
        <Field label="Age" value={data.patron?.age} />
        <Field label="Address" value={data.patron?.address_street} />
        <Field label="City/State/Zip" value={data.patron?.address_city} />
      </Section>

      {/* Medical (optional) */}
      {data.medical && (
        <Section title="MEDICAL INFORMATION">
          <Field label="Visible Injuries" value={YES_NO(data.medical?.visible_injuries)} />
          <Field label="Visible Injuries Explain" value={data.medical?.injury_explanation} />
          <Field label="Medical Attention Needed" value={YES_NO(data.medical?.medical_attention_apparent)} />
          <Field label="Medical Services Offered" value={YES_NO(data.medical?.medical_services_offered)} />
          <Field label="Accepted/Refused" value={YES_NO(data.medical?.medical_services_accepted)} />
          <Field label="Ambulance Requested" value={YES_NO(data.medical?.ambulance_requested)} />
          <Field label="Company" value={data.medical?.ambulance_company} />
          <Field label="EMT" value={data.medical?.emt_name_or_number} />
          <Field label="Left in Ambulance" value={YES_NO(data.medical?.patron_left_in_ambulance)} />
          <Field label="Destination" value={data.medical?.destination} />
        </Section>
      )}

      {/* Law (optional) */}
      {data.law && (
        <Section title="LAW ENFORCEMENT INFORMATION">
          <Field label="Was law enforcement contacted?" value={YES_NO(data.law?.law_enforcement_contacted)} />
          <Field label="Was a police report written?" value={YES_NO(data.law?.police_report_written)} />
          <Field label="Report #" value={data.law?.police_report_number} />
          <Field label="Citation # or Charge/Arrest" value={data.law?.contact_explanation} />
          <Field label="Officer Name & Badge #" value={data.law?.officer_name_badge} />
        </Section>
      )}
    </div>
  );
}
