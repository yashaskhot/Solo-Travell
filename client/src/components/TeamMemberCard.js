import React from 'react';
import { Card } from 'antd';

const TeamMemberCard = ({ name, role, photo, bio, link }) => {
  const openLinkInNewTab = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="card-container" onClick={openLinkInNewTab}>
      <Card
        hoverable
        style={{
          width: 300, 
          margin: 20,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#D2E0FB',
        }}
        cover={<img src={photo} alt={role} style={{ height: '250px', objectFit: 'cover' }} />} // Adjust image height and object fit
        title={name}
      >
        <h4 style={{ margin: '10px 0', fontWeight: 'bold', fontSize: '18px' }}>{role}</h4> {/* Increase font size */}
        <p style={{ marginBottom: 0 }}>{bio}</p>
      </Card>
      <style>
        {`
          .card-container {
            display: inline-block;
            vertical-align: top;
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default TeamMemberCard;