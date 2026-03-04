import { format, startOfDay, endOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Input = string | Date | null;

const DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

const parseInput = (input?: Input): Date | null => {
  if (!input) return null;

  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) return null;

  return date;
};

export const FORMAT_TIME = (input?: Input, tz = DEFAULT_TIMEZONE): string => {
  const date = parseInput(input);
  if (!date) return "--:--";

  const zoned = toZonedTime(date, tz);
  return format(zoned, "hh:mm a");
};

export const FORMAT_DATE = (input?: Input, tz = DEFAULT_TIMEZONE): string => {
  const date = parseInput(input);
  if (!date) return "--";

  const zoned = toZonedTime(date, tz);
  return format(zoned, "dd MMMM yyyy");
};

export const FORMAT_DATE_TIME = (input?: Input, tz = DEFAULT_TIMEZONE): string => {
  const date = parseInput(input);
  if (!date) return "--";

  const zoned = toZonedTime(date, tz);
  return format(zoned, "hh:mm a, dd MMMM yyyy");
};

export const GET_UTC_DAY_RANGE = (input?: Input) => {
  const date = parseInput(input);

  if (!date) throw Error("Invalid date");

  const startUTC = startOfDay(date);
  const endUTC = endOfDay(date);

  return [startUTC, endUTC];
};
