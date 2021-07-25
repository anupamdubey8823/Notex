import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header.js";
import CreateArea from "./components/CreateArea/CreateArea";
import Note from "./components/Note/Note.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch all notes from MongoDB
  useEffect( () => {
    function fetchMyNotes() {
        const response = axios.get("http://localhost:5000/");
        setNotes(response.data);
    }
    fetchMyNotes()
  }, []);

  function addNote(note) {
      setNotes((prevNotes) => {
        return [...prevNotes, note];
      });
  }
  // Delete the note
  function removeNote(id) {
    // console.log("Deleted");
    axios
      .delete("http://localhost:5000/delete/" + id)
      .then((res) => console.log(res.data));
    
      setNotes(prevNotes => {
      return prevNotes.filter(noteItem => noteItem._id !== id)
    });
  }

  // Render all notes from the DB
  function NotesList() {
    return notes.map(currentNote => {
      return (
        <Note
          key={currentNote._id}
          id={currentNote._id}
          onDelete={removeNote}
          Title={currentNote.Title}
          Content={currentNote.Content}
        />
      );
    });
  }

  return (
    <Router>
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        <div className="content">{NotesList()}</div>
        {<Footer />}
      </div>
    </Router>
  );
}

export default App;
