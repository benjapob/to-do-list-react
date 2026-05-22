import { useRef, useState } from 'react';
import Column from './components/Column';
import type { Task, ColumnId, ColumnDef } from './types';
import './App.css';


const COLUMNS: ColumnDef[] = [
  { id: 'todo', title: 'Por hacer', color: '#3b82f6' },
  { id: 'inprogress', title: 'En proceso', color: '#f59e0b' },
  { id: 'done', title: 'Listo', color: '#10b981' },
];

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Diseñar wireframes', description: 'Crear mockups iniciales de la app', columnId: 'todo', createdAt: Date.now() - 3000 },
  { id: '2', title: 'Revisar requisitos', description: '', columnId: 'todo', createdAt: Date.now() - 2000 },
  { id: '3', title: 'Configurar entorno', description: 'Vite + React + TypeScript listo', columnId: 'inprogress', createdAt: Date.now() - 1000 },
  { id: '4', title: 'Setup inicial del proyecto', description: '', columnId: 'done', createdAt: Date.now() },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const draggedIdRef = useRef<string | null>(null);

  const handleDragStart = (taskId: string) => {
    draggedIdRef.current = taskId;
  };

  const handleDrop = (columnId: ColumnId) => {
    if (!draggedIdRef.current) return;
    setTasks(prev =>
      prev.map(t => t.id === draggedIdRef.current ? { ...t, columnId } : t)
    );
    draggedIdRef.current = null;
  };

  const addTask = (columnId: ColumnId, title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      columnId,
      createdAt: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const totalTasks = tasks.length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Tablero de tareas</h1>
          <span className="header-badge">{totalTasks} tarea{totalTasks !== 1 ? 's' : ''}</span>
        </div>
      </header>
      <main className="board">
        {COLUMNS.map(col => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter(t => t.columnId === col.id)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </main>
    </div>
  );
}
