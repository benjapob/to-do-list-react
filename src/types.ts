export type ColumnId = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
  createdAt: number;
}

export interface ColumnDef {
  id: ColumnId;
  title: string;
  color: string;
}
