export enum AttendeeStatus {
  ForAttendance = 'For Attendance',
  Attended = 'Attended',
  NoShow = 'No Show',
}

// Base interface without ID
interface BaseAttendee {
  name: string;
  ticketCount: number;
  status: AttendeeStatus;
  eventId: string;
}

// Interface with ID for fetched documents
interface Attendee extends BaseAttendee {
  id: string;
}

// Interface for creating new documents
interface CreateAttendee extends BaseAttendee { }

export type { Attendee, CreateAttendee };
export default Attendee;