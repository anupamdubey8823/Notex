import React, { useState } from 'react';
import './Note.css';
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {
    
    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <div className='note'>
            <div className='card'>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                <div className='button'>
                    <button onClick={handleClick}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Note;