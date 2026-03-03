import { format } from "date-fns";
// CONSIDERING DIFFERENT TIME ZONE COMMON FUNCTION WILL BE MORE USEFUL
export const FORMAT_TIME = (input: string | Date) => {
  if (!input) return "";

  // If already Date
  if (input instanceof Date) {
    return format(input, "hh:mm a");
  }

  // Detect time-only (HH:mm or HH:mm:ss)
  const timeOnly = /^([01]?\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

  if (timeOnly.test(input)) {
    // attach dummy date
    const date = new Date(`1970-01-01T${input}`);
    return format(date, "hh:mm a");
  }

  // otherwise assume full date
  const date = new Date(input);

  if (isNaN(date.getTime())) return "";

  return format(date, "hh:mm a");
};

export const FORMAT_DATE = (input?: string | Date | null): string => {
  if (!input) return "--:--";

  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else {
    const dateOnly = /^\d{4}-\d{2}-\d{2}$/;

    if (dateOnly.test(input)) {
      const [y, m, d] = input.split("-").map(Number);
      date = new Date(y, m - 1, d);
    } else {
      date = new Date(input);
    }
  }

  if (isNaN(date.getTime())) return "";

  return format(date, "dd MMMM yyyy");
};
