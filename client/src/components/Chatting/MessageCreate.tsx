import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const CreateMessage = ({ loggedInUserId, targetUserId, sendMessage, updateMessages }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(message);

    const newMessage = {
      id: Date.now(), 
      message: message,
      creator_id: loggedInUserId,
      user_id: targetUserId,
      date: new Date().toISOString()
    };
    updateMessages(prevMessages => [...prevMessages, newMessage]);

    setMessage('');
  };

  return (
    <div className="containeris">
    <div className="row justify-content-center">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="form-floating mb-3 d-flex align-items-center">
          <FontAwesomeIcon icon={faEnvelope} className='icon me-2' />
          <input type="text" placeholder="Message" className="form-control flex-grow-1" value={message} onChange={(e) => setMessage(e.target.value)} id="message"/>
          <label className='ms-4' htmlFor="message">Žinute</label> 
          <button onClick={handleSendMessage} className="btn btn-primary ms-auto">Siųsti</button>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default CreateMessage;
