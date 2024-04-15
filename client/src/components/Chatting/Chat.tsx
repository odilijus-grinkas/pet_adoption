import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ChatDetail from './ChatDetail';
import "./Chat.scss";

interface User {
  id: string;
  username: string;
}

const Chat: React.FC = () => {
  const [usersWithMessages, setUsersWithMessages] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInUserId: string = user.id; 

  useEffect(() => {
    fetchUsersWithMessages();
  }, []);

  const fetchUsersWithMessages = () => {
    fetch(`http://localhost:3001/api/messages/users/${loggedInUserId}/messages`)
      .then(response => response.json())
      .then((data: User[]) => setUsersWithMessages(data))
      .catch(error => console.error('Error fetching users with messages:', error));
  };

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="chatselection">
            <div className="chatcard">
              <div>
                <div className="row">
                  <h2 className="col-12">Pasirinkite vartotoją:</h2>
                  {usersWithMessages.map((user: User) => (
                    <div key={user.id} className="col-3 mb-4">
                      <div className={`card ${selectedUserId === user.id ? 'border-primary' : ''}`}>
                        <div className="card-body">
                          <h5 className="card-title">Susirašynėti su {user.username}</h5>
                          <button className="btn btn-primary" onClick={() => handleUserClick(user.id)}>
                            Pasirinkti
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedUserId && <ChatDetail targetUserId={selectedUserId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
