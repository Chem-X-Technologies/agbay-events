// Base interface without ID
interface BaseAgbayEvent {
  name: string;
  date: string;
  time: string;
  venue: string;
  ticketPrice: number;
  description?: string;
  contactPerson?: string;
  contactNumber?: string;
}

// Interface with ID for fetched documents
interface AgbayEvent extends BaseAgbayEvent {
  id: string;
}

// Interface for creating new documents
interface CreateAgbayEvent extends BaseAgbayEvent { }

export type { AgbayEvent, CreateAgbayEvent };
export default AgbayEvent;