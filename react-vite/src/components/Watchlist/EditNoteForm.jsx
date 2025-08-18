import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes, editNote } from "../../redux/watchlist";

function EditNoteForm() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.watchlist.playerNotes);
  const note = notes.find(note => note.id === parseInt(noteId));

  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState("");
  const [teamAbbr, setTeamAbbr] = useState("");
  const [noteText, setNoteText] = useState("");
  const [interestLevel, setInterestLevel] = useState("");
  const [isWatchlist, setIsWatchlist] = useState(false);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    if (note) {
      setPlayerName(note.player_name);
      setPosition(note.position);
      setTeamAbbr(note.team_abbr);
      setNoteText(note.notes);
      setInterestLevel(note.interest_level);
      setIsWatchlist(note.is_watchlist);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      player_name: playerName,
      position,
      team_abbr: teamAbbr,
      notes: noteText,
      interest_level: interestLevel,
      is_watchlist: isWatchlist
    };

    await dispatch(editNote(noteId, noteData));
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Player Note</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div>
          <label>NFL Team</label>
          <input
            type="text"
            value={teamAbbr}
            onChange={(e) => setTeamAbbr(e.target.value)}
          />
        </div>

        <div>
          <label>Notes</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </div>

        <div>
          <label>Interest Level</label>
          <input
            type="text"
            value={interestLevel}
            onChange={(e) => setInterestLevel(e.target.value)}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isWatchlist}
              onChange={(e) => setIsWatchlist(e.target.checked)}
            />
            Add to Watchlist
          </label>
        </div>

        <button type="submit">Update Note</button>
      </form>
    </div>
  );
}

export default EditNoteForm;