import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateMessage from './MessageCreate';
import './Chat.scss'; 


const ChatDetail = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInUserId = user.id;

  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const newWs = new WebSocket('ws://localhost:3002');
    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/messages/user/${loggedInUserId}/chats/${userId}`)
      .then(response => response.json())
      .then(data => {
        setMessages(data.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [loggedInUserId, userId]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      setMessages(prevMessages => [
        ...prevMessages,
        JSON.parse(event.data) 
      ]);
    };


    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    return () => {
      ws.close();
    };
  }, [ws, userId, loggedInUserId]);

  const sendMessage = (message) => {
    try {
      if (ws.readyState === WebSocket.OPEN) {
        const messageData = {
          id: Date.now(),
          message: message,
          creator_id: loggedInUserId,
          user_id: userId,
          date: new Date().toISOString()
        };
        ws.send(JSON.stringify(messageData));

        console.log('Message sent successfully');
      } else {
        console.error('WebSocket connection not yet established');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('en-US', options)
      .replace(/\//g, '-') 
      .replace(', ', ' '); 
  };

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
  };

  return (
    <div className="d-flex flex-column justify-content-center vh-100"> 
    {error && <p>{error}</p>}
    <div className="row justify-content-center"> 
      <div className="col-lg-12 col-md-10 col-sm-12"> 
        <div className="message-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}> 
          <ul className="list-unstyled w-100"> 
            {messages.map((message) => (
              <li key={message.id} className={message.creator_id === loggedInUserId ? "sender-right" : "sender-left"}>
                <div className={`message-box ${message.creator_id === loggedInUserId ? "sender-right" : "sender-left"}`}>
                  <p className="message-content" style={{ fontSize: '1.7em' }}>{message.message}</p>
                  <p style={{ color: 'gray', fontSize: '10px' }}>
                    {message.creator_id === loggedInUserId ? "Tavo Zinute" : message.creator_username} 
                    <br />
                    {formatDate(message.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chatbox mt-auto"> 
          <div className="container">
            <div className="row">
              <div className="col-12">
                <CreateMessage loggedInUserId={loggedInUserId} targetUserId={userId} sendMessage={sendMessage} updateMessages={updateMessages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  

  );
};

export default ChatDetail;
