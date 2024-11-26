import React, { useState } from "react";
import Map from "./components/Map";
import Header from "./components/Header";
import "./app.css";

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerAdd = (marker, story) => {
    const existingMarker = markers.find(
      (m) => m.lat === marker.lat && m.lng === marker.lng
    );
    if (existingMarker) {
      existingMarker.stories.push(story);
      setMarkers([...markers]);
    } else {
      setMarkers([...markers, { ...marker, stories: [story] }]);
    }
  };

  const handleStoryDelete = (markerId, storyIndex) => {
    setMarkers(
      markers.map((marker) =>
        marker.id === markerId
          ? {
              ...marker,
              stories: marker.stories.filter((_, index) => index !== storyIndex),
            }
          : marker
      )
    );
  };

  const handleMarkerSelect = (markerId) => {
    setSelectedMarker((prev) => (prev === markerId ? null : markerId));
  };

  const selectedStories =
    selectedMarker &&
    markers.find((marker) => marker.id === selectedMarker)?.stories;

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <div className="map-section">
          <Map
            stories={markers}
            onMarkerAdd={handleMarkerAdd}
            onStoryDelete={handleStoryDelete}
            onSelect={handleMarkerSelect}
          />
        </div>
        <div className="story-section">
          {selectedStories ? (
            <div className="story-list">
              <h2>Selected Stories</h2>
              {selectedStories.map((story, index) => (
                <div key={index} className="story-card">
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Select a marker to see its stories.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
