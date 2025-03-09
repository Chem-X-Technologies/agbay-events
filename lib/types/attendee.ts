export enum AttendeeStatus {
  ForAttendance = 'For Attendance',
  Attended = 'Attended',
  NoShow = 'No Show',
}

interface Metadata {
  key: string;
  value: string;
}

// Base interface without ID
interface BaseAttendee {
  name: string;
  ticketCount: number;
  status: AttendeeStatus;
  eventId: string;
  metadata: Metadata[];
}

// Interface with ID for fetched documents
interface Attendee extends BaseAttendee {
  id: string;
}

// Interface for creating new documents
interface CreateAttendee extends BaseAttendee { }

// Interface for editing documents
interface EditAttendee extends Partial<BaseAttendee> { }

export type { Attendee, CreateAttendee, EditAttendee };
export default Attendee;