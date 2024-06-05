import create from "zustand";
import { Document } from "@/types/Document";

// Define a type for the state
type DocumentStore = {
  documents: Document[];
  selectedDocument: Document | null;
  createDocument: (document: Document) => void;
  readDocument: (id: string) => void;
  updateDocument: (id: string, updatedFields: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
};

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  selectedDocument: null,
  createDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  readDocument: (id) =>
    set((state) => ({
      selectedDocument: state.documents.find((doc) => doc.id === id) || null,
    })),
  updateDocument: (id, updatedFields) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updatedFields } : doc,
      ),
    })),
  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),
}));
