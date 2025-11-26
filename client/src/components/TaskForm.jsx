import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Task title is required');
      return;
    }
    if (trimmed.length < 3) {
      setError('Task title must be at least 3 characters');
      return;
    }
    if (trimmed.length > 120) {
      setError('Task title is too long (max 120 characters)');
      return;
    }

    setError('');
    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="task-form-row">
        <input
          className="input task-input"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Add a new task..."
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
      {error && <div className="text-error">{error}</div>}
    </form>
  );
}

export default TaskForm;
