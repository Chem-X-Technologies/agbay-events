import AgbayEvent from "./types/event";

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
    contactNumber: '(0935) 017 4871'
  },
  {
    id: '2',
    name: 'Agbay Fun Run',
    date: '2025-03-15',
    time: '16:00',
    venue: 'Nijaga Park',
    ticketPrice: 499,
  },
]
