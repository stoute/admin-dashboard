export interface Document {
  title: string;
  id: string;
  content: string;
  prompt: string;
  categories: string[];
  modified: Date;
}
