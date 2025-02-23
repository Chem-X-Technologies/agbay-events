import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AgbayEvent, { CreateAgbayEvent, EditAgbayEvent } from '../types/agbay-event';
import { sanitizeObject } from '../utils';
import { updateDoc } from 'firebase/firestore';

export const getEvents = async (): Promise<AgbayEvent[]> => {
  try {
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);
    return eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AgbayEvent[];
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const getEventById = async (id: string): Promise<AgbayEvent | undefined> => {
  try {
    const eventRef = doc(db, 'events', id);
    const eventSnap = await getDoc(eventRef);
    if (eventSnap.exists()) {
      return { id: eventSnap.id, ...eventSnap.data() } as AgbayEvent;
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw new Error("Failed to fetch event by ID");
  }
};

export const createEvent = async (event: CreateAgbayEvent): Promise<void> => {
  try {
    const sanitizedEvent = sanitizeObject(event);
    const eventsCollection = collection(db, 'events');
    await addDoc(eventsCollection, sanitizedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

export const editEvent = async (id: string, updatedEvent: EditAgbayEvent): Promise<void> => {
  try {
    const eventRef = doc(db, 'events', id);
    const sanitizedEvent = sanitizeObject(updatedEvent);
    await updateDoc(eventRef, sanitizedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
};