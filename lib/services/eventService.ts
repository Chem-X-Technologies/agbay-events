import { MOCK_EVENTS } from '../constants';
import AgbayEvent from '../types/agbay-event';

export const getEvents = async (): Promise<AgbayEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EVENTS);
    }, 1000);
  });
};

export const getEventById = async (id: string): Promise<AgbayEvent | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = MOCK_EVENTS.find(event => event.id === id);
      resolve(event);
    }, 1000);
  });
};

export const createEvent = async (event: AgbayEvent): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      MOCK_EVENTS.push({
        ...event,
        id: `${MOCK_EVENTS.length + 1}`,
      });
      resolve();
    }, 1000);
  });
};