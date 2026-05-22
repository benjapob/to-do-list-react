import { useState } from 'react';
import TaskCard from './TaskCard';
import type { Task, ColumnId, ColumnDef } from '../types';

interface Props {
  column: ColumnDef;
  tasks: Task[];
  onDragStart: (id: string) => void;
  onDrop: (columnId: ColumnId) => void;
  onAddTask: (columnId: ColumnId, title: string, description: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function Column({ column, tasks, onDragStart, onDrop, onAddTask, onDeleteTask }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(column.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(column.id, newTitle.trim(), newDesc.trim());
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  return (
    <div
      className={`column${isDragOver ? ' drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header" style={{ borderTopColor: column.color }}>
        <h2 className="column-title">{column.title}</h2>
        <span className="task-count" style={{ backgroundColor: column.color }}>
          {tasks.length}
        </span>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      {isAdding ? (
        <form className="add-task-form" onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Título de la tarea"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && handleCancel()}
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            rows={2}
          />
          <div className="form-actions">
            <button type="submit" className="btn-add">Agregar</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button className="btn-new-task" onClick={() => setIsAdding(true)}>
          + Nueva tarea
        </button>
      )}
    </div>
  );
}
