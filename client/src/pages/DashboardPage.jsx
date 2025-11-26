import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../api';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const data = await apiRequest('/tasks');
      setTasks(data);
    } catch (err) {
      setError(err.message);
      if (
        err.message === 'Token is not valid' ||
        err.message === 'No token, authorization denied'
      ) {
        logout();
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = async title => {
    try {
      const newTask = await apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleTask = async task => {
    try {
      const updated = await apiRequest(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed: task.completed ? 0 : 1,
        }),
      });
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async task => {
    try {
      await apiRequest(`/tasks/${task.id}`, {
        method: 'DELETE',
      });
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials =
    user && (user.username || user.email)
      ? (user.username || user.email)
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
      : 'U';

  return (
    <div className="app-shell">
      <div className="dashboard">
        <div className="task-card">
          <header className="dashboard-header">
            <div className="dashboard-title-group">
              <h2>Task Dashboard</h2>
              <span>Organize your day with a clean, focused view.</span>
            </div>

            <div className="dashboard-user">
              <div className="user-avatar">{initials}</div>
              <span>{user?.username || user?.email}</span>
              <button
                type="button"
                className="btn btn-ghost logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </header>

          {error && <div className="text-error">{error}</div>}

          <div className="dashboard-grid">
            <div>
              <TaskForm onAdd={handleAddTask} />
              <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            </div>

            {/* Optional side panel / stats */}
            <div>
              <h3 className="page-subtitle">Today&apos;s summary</h3>
              <div className="page-subtitle">
                Total tasks: {tasks.length}
                <br />
                Completed:{' '}
                {tasks.filter(t => !!t.completed).length}
                <br />
                Pending:{' '}
                {tasks.filter(t => !t.completed).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
