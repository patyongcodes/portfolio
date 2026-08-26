import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // Pick a unique identifier for your project
    const NAMESPACE = 'patrick-portfolio-live'; 
    const KEY = 'visits';
    const SESSION_KEY = 'portfolio_session_visited';

    // Increment count on first load, otherwise just fetch the current count
    const hasVisited = sessionStorage.getItem(SESSION_KEY);
    const action = hasVisited ? 'get' : 'up';

    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/${action}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === 'number') {
          setViews(data.count);
          sessionStorage.setItem(SESSION_KEY, 'true');
        }
      })
      .catch((err) => console.error('Error loading view count:', err));
  }, []);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      color: '#71717a',
      fontWeight: 500,
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '4px 10px',
      borderRadius: '999px',
      border: '1px solid #e5e7eb'
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <span>{views !== null ? `${views.toLocaleString()} Views` : 'Loading...'}</span>
    </div>
  );
}