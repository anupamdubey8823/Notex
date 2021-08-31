import React from 'react';
import './Note.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Note = props => {
    
    /* EVENT HANDLERS */

    // Here, another id is passed to the Note component because 'key' cannot be passed in a component.
    const handleDelete = () => {
        props.onDelete(props.id);
    }
    const handleEdit = () => {
        props.onEdit(props.id);
    }

    /* COMPONENT */
    return (
        <div className='note'>
            <div className='card'>
                <h1>{props.Title}</h1>
                <p>{props.Content}</p>
                <div className='button'>
                    <button onClick={handleEdit}>
                        <EditIcon />
                    </button>
                    <button onClick={handleDelete}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Note;