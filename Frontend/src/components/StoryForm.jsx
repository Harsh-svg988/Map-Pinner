import React, { useState } from "react";
import "../styles/storyForm.css";

const StoryForm = ({ onAddStory }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStory({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      ></textarea>
      <button type="submit">Save Story</button>
    </form>
  );
};

export default StoryForm;