import React, { useState, useEffect } from 'react';
import { userService } from './services/userService';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUserId, setExpandedUserId] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <header style={{ padding: '2rem 0 1rem 0' }}>
        <h1>Engineering Team Dashboard</h1>
        <p className="subtitle">React Unit Testing & Mocking Demo</p>
      </header>

      {/* Barra de búsqueda */}
      <div className="controls-container">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search users"
          />
        </div>
      </div>

      {loading && (
        <div className="state-container" data-testid="loading-state">
          <div className="spinner"></div>
          <p>Fetching team profiles...</p>
        </div>
      )}

      {error && (
        <div className="state-container" data-testid="error-state">
          <div className="error-banner">
            <h3 className="error-title">Database Error</h3>
            <p>{error}</p>
            <button onClick={loadUsers} aria-label="Retry loading users">Try Again</button>
          </div>
        </div>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <div className="state-container" data-testid="empty-state">
          <div className="empty-state">
            <p>No matches found for "{searchTerm}"</p>
          </div>
        </div>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="users-grid" data-testid="users-grid">
          {filteredUsers.map((user) => {
            const isExpanded = expandedUserId === user.id;
            const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : '??';

            return (
              <article
                key={user.id}
                className={`user-card ${isExpanded ? 'active' : ''}`}
                onClick={() => setExpandedUserId(isExpanded ? null : user.id)}
                data-testid={`user-card-${user.id}`}
              >
                <div className="user-header">
                  <div className="avatar">{initials}</div>
                  <div className="user-identity">
                    <h2>{user.name}</h2>
                    <p>@{user.username || 'user'}</p>
                  </div>
                </div>

                <button
                  className="toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedUserId(isExpanded ? null : user.id);
                  }}
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${user.name}`}
                >
                  {isExpanded ? '▲ Hide details' : '▼ Show details'}
                </button>

                {isExpanded && (
                  <div className="card-details" data-testid="user-details">
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Company:</span>
                      <span className="detail-value">{user.company?.name || 'N/A'}</span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
