import React from "react";
import "../styles/storyCard.css";

const StoryCard = ({ story, onDelete }) => (
  <div className="story-card">
    <h3>{story.title}</h3>
    <p>{story.description}</p>
    <button onClick={(e) => {
      e.stopPropagation();
      onDelete(story.id);
    }}>Delete</button>
  </div>
);

export default StoryCard;