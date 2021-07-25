import React, { useState } from "react";
import "./CreateArea.css";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    Title: "",
    Content: "",
  });

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      Title: "",
      Content: "",
    });
    axios
      .post("http://localhost:5000/add", note)
      .then((res) => console.log(res.data))
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="createnote">
      <form>
        {isExpanded ? (
          <input
            onChange={handleChange}
            name="Title"
            placeholder="Title"
            value={note.Title}
            autoComplete="new-password"
          />
        ) : null}

        <textarea
          onClick={expand}
          onChange={handleChange}
          name="Content"
          placeholder="Write a note..."
          value={note.Content}
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
