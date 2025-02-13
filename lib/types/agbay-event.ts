import Attendee from "./attendee";

type AgbayEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  ticketPrice: number;
  description?: string;
  contactPerson?: string;
  contactNumber?: string;
  attendees: Attendee[];
}

export default AgbayEvent;