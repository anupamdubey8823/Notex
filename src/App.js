import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import CreateArea from "./components/CreateArea/CreateArea";
import Note from "./components/Note/Note";
import Footer from "./components/Footer/Footer";
import EditArea from "./components/EditArea";

const App = () => {
  
  /* STATES */

  // Initialize the states
  const [notes, setNotes] = useState([]); // Storing the notes in an array and setting acc. to changes
  const [editInfo, setEditInfo] = useState({
    Title: "",
    Content: "",
  }); // Handling changes in the Edit Area
  const [editNoteId, setEditNoteId] = useState(""); // Passing the id of the note on which Edit button is clicked
  const [showEditArea, setEditArea] = useState(false); // Toggle the Edit Area

  /* EVENT HANDLERS */

  // Fetch all notes from MongoDB
  useEffect( () => {
    async function fetchNotes() {
      const response = await axios.get("https://notex-backend.herokuapp.com/");
      setNotes(response.data);
    }
    fetchNotes();
  }, []);

  // Display new note after creation
  const addNote = note => {
      setNotes(prevNotes => {
        return [...prevNotes, note];
      });
  }

  // Delete the note
  const removeNote = id => {
    axios
      .delete("https://notex-backend.herokuapp.com/delete/" + id)
      .then((res) => console.log(res.data));
    
      setNotes(prevNotes => {
      return prevNotes.filter(noteItem => noteItem._id !== id)
    });
  }

  // Edit notes
  const editNote = id => {
    const editItem = notes.find((currentNote) => {
      return currentNote._id === id;
    })
    
    setEditArea(true);
    setEditInfo({
      Title: editItem.Title,
      Content: editItem.Content
    });
    setEditNoteId(id);
  }

  // Render all notes from the DB
  const NotesList = () => {
    return notes.map((currentNote) => {
      return (
        <Note
          key={currentNote._id}
          id={currentNote._id}
          onDelete={removeNote}
          Title={currentNote.Title}
          Content={currentNote.Content}
          onEdit={editNote}
        />
      );
    });
  }

  /* COMPONENT */
  return (
    <>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="content">{NotesList()}</div>
      {showEditArea && <EditArea id={editNoteId} Title={editInfo.Title} Content={editInfo.Content} />}
      {<Footer />}
    </>
  );
}

export default App;
