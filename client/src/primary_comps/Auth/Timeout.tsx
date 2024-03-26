import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimeoutProps {
  timeout: number;
  children: React.ReactNode;
}

const Timeout: React.FC<TimeoutProps> = ({ timeout, children }) => {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleSessionTimeout, timeout);
    };

    const handleSessionTimeout = () => {
      setSessionExpired(true);
      localStorage.removeItem('user');
      navigate('/Login');
    };

    const handleUserActivity = () => {
      resetTimeout();
      setSessionExpired(false);
      setShowNotification(false); // Reset notification when user activity detected
    };

    document.addEventListener('mousedown', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, [timeout, navigate]);

  useEffect(() => {
    if (sessionExpired) {
      setShowNotification(true);
    }
  }, [sessionExpired]);

  return (
    <>
      {showNotification && (
        <div className="row notification-container justify-content-md-center justify-content-end">
          <div className="col-md-12 col-lg-12 col-12">
            <div className="notification alert alert-warning d-flex justify-content-between align-items-center" role="alert">
              <span>Jūsų sesijos laikas baigėsi. Prašau dar kartą prisijungti.</span>
              <button type="button" className="btn-close" onClick={() => setShowNotification(false)} aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Timeout;
