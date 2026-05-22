import type { Task } from '../types';

interface Props {
  task: Task;
  onDragStart: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDragStart, onDelete }: Props) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={() => onDragStart(task.id)}
    >
      <div className="card-header">
        <h3 className="card-title">{task.title}</h3>
        <button
          className="btn-delete"
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          title="Eliminar tarea"
        >
          ×
        </button>
      </div>
      {task.description && (
        <p className="card-description">{task.description}</p>
      )}
    </div>
  );
}
