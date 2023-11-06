import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import './homepage.css';


const Team = ({ teamData }) => {
  return (
    <div className="team">
      {teamData.map((member, index) => (
        <TeamMemberCard
          key={index}
          name={member.name}
          role={member.role}
          photo={member.photo}
          bio={member.bio}
          link={member.link}
        />
      ))}
    </div>
  );
};



export default Team;