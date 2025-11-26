import React from 'react';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        No tasks yet. Add something you want to get done today ✨
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className="task-item">
          <div className="task-main">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={!!task.completed}
              onChange={() => onToggle(task)}
            />
            <div>
              <div
                className={
                  'task-title' + (task.completed ? ' completed' : '')
                }
              >
                {task.title}
              </div>
              {task.created_at && (
                <div className="task-meta">
                  Created: {new Date(task.created_at).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={() => onDelete(task)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
