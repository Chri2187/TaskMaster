export interface ChecklistItem {
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: number;
  title: string;
  items: ChecklistItem[];
  lastModified: number;
}
