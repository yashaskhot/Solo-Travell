import React, { useState } from 'react';

function Message({ message, onClose }) {
  return (
    <div className="message">
      <div className="message-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Message;
