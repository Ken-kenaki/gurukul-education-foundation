export interface NewsEvent {
  id?: string;
  $id?: string; // For Appwrite compatibility
  title: string;
  type: "news" | "event";
  content: string;
  date: string;
  status: "draft" | "published";
  location?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
