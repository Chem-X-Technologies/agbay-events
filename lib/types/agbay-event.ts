import Poster from "./poster";

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
  poster?: Poster;
}

// Interface with ID for fetched documents
interface AgbayEvent extends BaseAgbayEvent {
  id: string;
}

// Interface for creating new documents
interface CreateAgbayEvent extends BaseAgbayEvent { }

// Interface for creating new documents
interface EditAgbayEvent extends Partial<BaseAgbayEvent> { }

export type { AgbayEvent, CreateAgbayEvent, EditAgbayEvent };
export default AgbayEvent;