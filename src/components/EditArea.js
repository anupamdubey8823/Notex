import React, { useState } from 'react';
import axios from "axios";
import SendIcon from '@material-ui/icons/Send';
import './EditArea.css';

const EditArea = props =>  {
    
    /* STATES */

    // State for the Edit Area which initially has the same content as the note which is chosen to edit
    const [edit, setEdit] = useState({
        Title: props.Title,
        Content: props.Content
    })

    /* EVENT HANDLERS */

    // Event handler for editing the contents of the Edit Area
    const handleChange = event => {
        const {name, value} = event.target;
        setEdit( (prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        })
    }
    // Event handler for the submitting the edited note
    const handleClick = event => {
        event.preventDefault();
        axios 
            .post("https://notex-backend.herokuapp.com/update/" + props.id, edit)
            .then(res => console.log(res.data))
    }

    /* COMPONENT */
    return (
        <>
            <form id="EditArea" className="edit-form">
                <h1>
                    <input 
                        name="Title" 
                        placeholder="Title"
                        value={edit.Title} 
                        onChange={handleChange}
                    />
                </h1>

                <textarea 
                    name="Content"
                    placeholder="Content"
                    value={edit.Content}
                    rows={3}
                    onChange={handleChange}
                />

                <div className="sendicon">
                    <button onClick={handleClick}>
                        <SendIcon />
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditArea;