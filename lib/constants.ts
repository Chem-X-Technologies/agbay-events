import AgbayEvent from "./types/agbay-event";
import Attendee, { AttendeeStatus } from "./types/attendee";

export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};

export const statusColorMap = {
  [AttendeeStatus.Attended]: 'text-green-500',
  [AttendeeStatus.NoShow]: 'text-red-500',
  [AttendeeStatus.ForAttendance]: 'text-yellow-500',
};

export const MOCK_EVENTS: AgbayEvent[] = [
  {
    id: '1',
    name: 'Cinema Under the Stars',
    date: '2025-02-28',
    time: '18:00',
    venue: 'Cafe Buenaventura',
    ticketPrice: 399,
    description: 'Outdoor Movie Night',
    contactPerson: 'Ms. Irene Anne Bendo',
    contactNumber: '(0935) 017 4871',
  },
  {
    id: '2',
    name: 'Agbay Fun Run',
    date: '2025-03-15',
    time: '16:00',
    venue: 'Nijaga Park',
    ticketPrice: 499,
  },
  {
    id: '3',
    name: 'Yana nga Event',
    date: '2025-02-13',
    time: '18:00',
    venue: 'Cafe Buenaventura',
    ticketPrice: 399,
    description: 'Outdoor Movie Night',
    contactPerson: 'Ms. Irene Anne Bendo',
    contactNumber: '(0935) 017 4871',
  },
  {
    id: '4',
    name: 'Sadto nga Event',
    date: '2025-01-05',
    time: '18:00',
    venue: 'Cafe Buenaventura',
    ticketPrice: 399,
    description: 'Outdoor Movie Night',
    contactPerson: 'Ms. Irene Anne Bendo',
    contactNumber: '(0935) 017 4871',
  },
  {
    id: '4',
    name: 'Sadto nga Event 2',
    date: '2025-02-03',
    time: '18:00',
    venue: 'Cafe Buenaventura',
    ticketPrice: 399,
    description: 'Outdoor Movie Night',
    contactPerson: 'Ms. Irene Anne Bendo',
    contactNumber: '(0935) 017 4871',
  },
]

export const MOCK_ATTENDEES: Attendee[] = [
  {
    id: '1',
    name: 'John Doe',
    status: AttendeeStatus.ForAttendance,
    ticketCount: 5,
    eventId: '1',
  },
  {
    id: '2',
    name: 'Bruno Mars',
    status: AttendeeStatus.NoShow,
    ticketCount: 10,
    eventId: '1',
  },
  {
    id: '3',
    name: 'Sabrina Carpenter',
    status: AttendeeStatus.Attended,
    ticketCount: 2,
    eventId: '1',
  }
]