import { MOCK_EVENTS } from '../constants';
import Attendee from '../types/attendee';

// export const getAttendees = async (eventId: string): Promise<Attendee[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(MOCK_EVENTS.find(event => event.id === eventId)?.attendees ?? []);
//     }, 1000);
//   });
// };

export const createAttendee = async (eventId: string, attendee: Attendee): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const event = MOCK_EVENTS.find(event => event.id === eventId);
      event?.attendees.push({
        ...attendee,
        id: `${event?.attendees.length + 1}`,
      });
      resolve();
    }, 1000);
  });
};