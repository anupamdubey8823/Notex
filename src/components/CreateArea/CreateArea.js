import React, { useState } from "react";
import "./CreateArea.css";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom } from "@material-ui/core";
import axios from "axios";

const CreateArea = props => {
  
  /* STATES */
  
  const [isExpanded, setExpanded] = useState(false); // Toggle the size of the Create Area if it is clicked on

  const [createArea, setCreateArea] = useState({
    Title: "",
    Content: "",
  }); // Handling changes in the Create Area

  /* EVENT HANDLERS */

  const handleChange = event => {
    const { name, value } = event.target;
    setCreateArea((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const submitNote = event => {
    event.preventDefault();
    
    props.onAdd(createArea);
    setCreateArea({
      Title: "",
      Content: "",
    });
    
    axios
      .post("https://notex-backend.herokuapp.com/add", createArea)
      .then((res) => console.log(res.data));
  }

  const expand = () => setExpanded(true);

  /* COMPONENT */
  return (
    <div className="createnote">
      <form id="createarea-form">
        {isExpanded ? (
          <input
            onChange={handleChange}
            name="Title"
            placeholder="Title"
            value={createArea.Title}
          />
        ) : null}

        <textarea
          onClick={expand}
          onChange={handleChange}
          name="Content"
          placeholder="Write a note..."
          value={createArea.Content}
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
