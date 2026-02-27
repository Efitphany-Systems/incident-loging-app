export interface Event {
  id: string;
  venue_id: string;
  name: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  created_by: string | null;
  additional_information: string | null;
  created_at: string;
  updated_at: string;
}

export type Events = Event[];
