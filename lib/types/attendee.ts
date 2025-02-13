type Attendee = {
  id: string;
  name: string;
  ticketCount: number;
  status: AttendeeStatus;
}

export enum AttendeeStatus {
  Waiting = 'Waiting',
  Attended = 'Attended',
  NoShow = 'No Show',
}

export default Attendee;