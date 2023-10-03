import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private fs: Firestore) {}

  getPendingTasks() {
    const notesCollection = collection(this.fs, 'notes');
    const q = query(notesCollection, where('estado', '==', false)); // Aplicar el filtro

    return collectionData(q, { idField: 'id' });
  }

  getCompletedTasks() {
    const notesCollection = collection(this.fs, 'notes');
    const q = query(notesCollection, where('estado', '==', true)); // Aplicar el filtro

    return collectionData(q, { idField: 'id' });
  }

  addNote(desc: string) {
    let data = { description: desc, estado: false };
    let notesCollection = collection(this.fs, 'notes');
    return addDoc(notesCollection, data);
  }

  deleteNote(id: string) {
    let docRef = doc(this.fs, 'notes/' + id);
    return deleteDoc(docRef);
  }

  completeTask(id: string) {
    const taskDocRef = doc(this.fs, `notes/${id}`);
    const updatedData = { estado: true }; // Actualizar el estado a true

    return setDoc(taskDocRef, updatedData, { merge: true });
  }

  async deleteCompletedTasks() {
    const notesCollection = collection(this.fs, 'notes');
    const q = query(notesCollection, where('estado', '==', true));

    try {
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await Promise.all(deletePromises);

    } catch (error) {
      console.error('Error al eliminar las tareas completadas: ', error);
      throw error;
    }
  }
}
