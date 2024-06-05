// src/services/documentApi.ts
import { appInstance } from "@/providers/AppContext";
import { Document } from "@/types/Document";

const db = appInstance.firebase.db;

export const createDocumentApi = async (document: Document) => {
  const docRef = await db.collection("documents").add(document);
  return docRef.id; // returns the id of the created document
};

export const readDocumentApi = async (id: string) => {
  const doc = await db.collection("documents").doc(id).get();
  return doc.exists ? doc.data() : null; // returns the document data if it exists
};

export const updateDocumentApi = async (
  id: string,
  updatedFields: Partial<Document>,
) => {
  await db.collection("documents").doc(id).set(updatedFields, { merge: true });
  const updatedDoc = await db.collection("documents").doc(id).get();
  return updatedDoc.data(); // returns the updated document data
};

export const deleteDocumentApi = async (id: string) => {
  await db.collection("documents").doc(id).delete();
};
