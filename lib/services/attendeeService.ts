import { MOCK_ATTENDEES } from '../constants';
import Attendee from '../types/attendee';

export const getAttendees = async (eventId: string): Promise<Attendee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ATTENDEES.filter(a => a.eventId === eventId));
    }, 1000);
  });
};

export const getAttendeeById = async (id: string): Promise<Attendee | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ATTENDEES.find(a => a.id === id));
    }, 1000);
  });
};

export const createAttendee = async (attendee: Attendee): Promise<Attendee> => {
  return new Promise<Attendee>((resolve) => {
    setTimeout(() => {
      const newAttendee = {
        ...attendee,
        id: `${(MOCK_ATTENDEES.length ?? 0) + 1}`,
      };
      MOCK_ATTENDEES.push(newAttendee);
      resolve(newAttendee);
    }, 1000);
  });
};

export const updateAttendee = async (id: string, updatedData: Partial<Attendee>): Promise<Attendee | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = MOCK_ATTENDEES.findIndex(a => a.id === id);
      if (index !== -1) {
        MOCK_ATTENDEES[index] = { ...MOCK_ATTENDEES[index], ...updatedData };
        resolve(MOCK_ATTENDEES[index]);
      } else {
        resolve(undefined);
      }
    }, 1000);
  });
};