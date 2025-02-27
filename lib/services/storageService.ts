import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadFile(id: string, blob: Blob): Promise<string> {
  try {
    const storageRef = ref(storage, id);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error(`Failed to upload file: ${error}`);
    throw new Error("Failed to upload file");
  }
}

export async function deleteFile(id: string): Promise<void> {
  try {
    const storageRef = ref(storage, id);
    await deleteObject(storageRef);
  } catch (error) {
    console.error(`Failed to delete file: ${error}`);
    throw new Error("Failed to delete file");
  }
}