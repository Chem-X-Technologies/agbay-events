type Attendee = {
  id: string;
  name: string;
  ticketCount: number;
  status: AttendeeStatus;
  eventId: string;
}

export enum AttendeeStatus {
  ForAttendance = 'For Attendance',
  Attended = 'Attended',
  NoShow = 'No Show',
}

export default Attendee;