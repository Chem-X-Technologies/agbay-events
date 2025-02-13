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
}

export default AgbayEvent;