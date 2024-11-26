import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";

const Map = ({ stories, onMarkerAdd, onStoryAdd, onStoryDelete, onSelect }) => {
  const [newStory, setNewStory] = useState(null);

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        const marker = {
          id: Date.now().toString(),
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setNewStory({ marker, title: "", description: "", image: null });
      },
    });

    return (
      <>
        {stories.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => {
                onSelect(marker.id);
              },
            }}
          >
            <Popup>
              <div>
              {marker.stories.map((story, index) => (
                    <div key={index} className="story-popup">
                      {story.image && (
                        <img
                          src={story.image} // Ensure this URL points to the correct file
                          alt={story.title}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                      <h3>{story.title}</h3>
                      <p>{story.description}</p>
                      <button
                        onClick={() => onStoryDelete(marker.id, index)}
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.5rem",
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}

              </div>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  const handleSaveStory = () => {
    if (newStory) {
      const { marker, title, description, image } = newStory;
  
      // Create a temporary URL for the image
      const imageUrl = image ? URL.createObjectURL(image) : null;
  
      onMarkerAdd(marker, {
        title,
        description,
        image: imageUrl, // Pass the temporary URL for rendering
      });
  
      setNewStory(null);
    }
  };
  

  return (
    <>
      <MapContainer
        className="map-container"
        center={[51.505, -0.09]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Markers />
      </MapContainer>

      {newStory && (
        <div className="new-story-form">
          <h3>Add a New Story</h3>
          <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewStory({ ...newStory, image: e.target.files[0] }) // Correctly set the file
              }
            />

          <input
            type="text"
            placeholder="Title"
            value={newStory.title}
            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newStory.description}
            onChange={(e) =>
              setNewStory({ ...newStory, description: e.target.value })
            }
          ></textarea>
          <button onClick={handleSaveStory}>Save</button>
        </div>
      )}
    </>
  );
};

export default Map;
