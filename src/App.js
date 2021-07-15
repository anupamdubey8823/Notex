import React, { useState } from 'react';

import Header from './components/Header/Header.js'
import CreateArea from './components/CreateArea/CreateArea'
import Note from './components/Note/Note.js';
import Footer from './components/Footer/Footer.js';

function App() {
    const [notes, setNotes] = useState([]);
    
    function addNote(note) {
        console.log(note);
        setNotes(prevNotes => {
            return [...prevNotes, note];
        });
    }

    function removeNote(id) {
        console.log("Deleted");
        setNotes(prevNotes => {
            return prevNotes.filter( (noteItem, index) => {
                return index !== id;  
            })
        })
    }
    
    return(
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            <div className="content">
                {notes.map((noteItem, index) => {
                    return (
                        <Note 
                            key={index}
                            id={index}
                            onDelete={removeNote} 
                            title={noteItem.title} 
                            content={noteItem.content} 
                        />
                    )
                })}
            </div> {/* content div clousure */}
            <Footer />
        </div>
    );
}

export default App;