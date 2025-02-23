import { collection, getDocs, doc, getDoc, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Attendee, { CreateAttendee, EditAttendee } from '../types/attendee';
import { sanitizeObject } from '../utils';

export const getAttendees = async (eventId: string): Promise<Attendee[]> => {
  try {
    const attendeesCollection = collection(db, 'attendees');
    const q = query(attendeesCollection, where("eventId", "==", eventId), where("deleted", "==", false));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Attendee[];
  } catch (error) {
    console.error("Error fetching attendees:", error);
    throw new Error("Failed to fetch attendees");
  }
};

export const getAttendeeById = async (id: string): Promise<Attendee | undefined> => {
  try {
    const attendeeRef = doc(db, 'attendees', id);
    const attendeeSnap = await getDoc(attendeeRef);
    if (attendeeSnap.exists()) {
      return { id: attendeeSnap.id, ...attendeeSnap.data() } as Attendee;
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching attendee by ID:", error);
    throw new Error("Failed to fetch attendee by ID");
  }
};

export const createAttendee = async (attendee: CreateAttendee): Promise<Attendee> => {
  try {
    const sanitizedAttendee = sanitizeObject({ ...attendee, deleted: false });
    const attendeesCollection = collection(db, 'attendees');
    const docRef = await addDoc(attendeesCollection, sanitizedAttendee);
    return {
      ...attendee,
      id: docRef.id
    };
  } catch (error) {
    console.error("Error creating attendee:", error);
    throw new Error("Failed to create attendee");
  }
};

export const editAttendee = async (id: string, updatedData: EditAttendee): Promise<Attendee | undefined> => {
  try {
    const attendeeRef = doc(db, 'attendees', id);
    await updateDoc(attendeeRef, updatedData);
    const updatedDoc = await getDoc(attendeeRef);
    if (updatedDoc.exists()) {
      return { id: updatedDoc.id, ...updatedDoc.data() } as Attendee;
    }
    return undefined;
  } catch (error) {
    console.error("Error updating attendee:", error);
    throw new Error("Failed to update attendee");
  }
};

export const deleteAttendee = async (id: string): Promise<void> => {
  try {
    const attendeeRef = doc(db, 'attendees', id);
    await updateDoc(attendeeRef, { deleted: true });
  } catch (error) {
    console.error("Error soft deleting attendee:", error);
    throw new Error("Failed to soft delete attendee");
  }
};