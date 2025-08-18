import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes, removeNote } from "../../redux/watchlist";
import { useEffect } from "react";

function DeleteNote() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.watchlist.playerNotes);
  const note = notes.find(note => note.id === parseInt(noteId));

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  const handleDelete = async () => {
    await dispatch(removeNote(noteId));
    // Could navigate back here if you want
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Delete Player Note</h1>
      
      <div>
        <p>Are you sure you want to delete this note?</p>
        
        <div>
          <h3>{note.player_name}</h3>
          <p><strong>Position:</strong> {note.position}</p>
          <p><strong>Team:</strong> {note.team_abbr}</p>
          <p><strong>Interest Level:</strong> {note.interest_level}</p>
          <p><strong>Notes:</strong> {note.notes}</p>
        </div>

        <button onClick={handleDelete}>Yes, Delete Note</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteNote;