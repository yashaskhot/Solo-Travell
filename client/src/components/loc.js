import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import './homepage.css';


const Loc = ({ locData }) => {
  return (
    <div className="team">
      {locData.map((member, index) => (
        <TeamMemberCard
          key={index}
          role={member.role}
          photo={member.photo}
          link={member.link}
        />
      ))}
    </div>
  );
};



export default Loc;