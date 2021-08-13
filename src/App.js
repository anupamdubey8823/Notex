import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import CreateArea from "./components/CreateArea/CreateArea";
import Note from "./components/Note/Note";
import Footer from "./components/Footer/Footer";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch all notes from MongoDB
  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get("https://notex-backend.herokuapp.com/");
      setNotes(response.data);
    }
    fetchNotes();
  }, []);

  function addNote(note) {
      setNotes(prevNotes => {
        return [...prevNotes, note];
      });
  }
  // Delete the note
  function removeNote(id) {
    axios
      .delete("https://notex-backend.herokuapp.com/delete/" + id)
      .then((res) => console.log(res.data));
    
      setNotes(prevNotes => {
      return prevNotes.filter(noteItem => noteItem._id !== id)
    });
  }
  // Edit notes
  // const notesEditable = (id) => {
  //   axios
  //     .
  // }

  // Render all notes from the DB
  function NotesList() {
    return notes.map((currentNote, index) => {
      return (
        <Note
          key={currentNote._id}
          id={currentNote._id}
          onDelete={removeNote}
          Title={currentNote.Title}
          Content={currentNote.Content}
          // onEdit={notesEditable}
        />
      );
    });
  }

  return (
    <Router>
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        <div className="content">
          {NotesList()}
        </div>
        {<Footer />}
      </div>
    </Router>
  );
}

export default App;
