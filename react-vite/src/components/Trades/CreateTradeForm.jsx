import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { createTrade } from "../../redux/trades";

function CreateTradeForm() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [myPlayers, setMyPlayers] = useState("");
  const [targetPlayers, setTargetPlayers] = useState("");
  const [targetTeam, setTargetTeam] = useState("");
  const [analysisNotes, setAnalysisNotes] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tradeData = {
      title,
      my_players: myPlayers,
      target_players: targetPlayers,
      target_team: targetTeam,
      analysis_notes: analysisNotes,
      confidence
    };

    dispatch(createTrade(tradeData));
        navigate('/trades');
    
    // Reset form
    setTitle("");
    setMyPlayers("");
    setTargetPlayers("");
    setTargetTeam("");
    setAnalysisNotes("");
    setConfidence("");
  };

  return (
    <div>
      <h1>Create Trade Scenario</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Trade Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of trade idea..."
          />
        </div>

        <div>
          <label>My Players</label>
          <input
            type="text"
            value={myPlayers}
            onChange={(e) => setMyPlayers(e.target.value)}
            placeholder="Players I'm trading away"
          />
        </div>

        <div>
          <label>Target Players</label>
          <input
            type="text"
            value={targetPlayers}
            onChange={(e) => setTargetPlayers(e.target.value)}
            placeholder="Players I want to trade for"
          />
        </div>

        <div>
          <label>Target Team</label>
          <input
            type="text"
            value={targetTeam}
            onChange={(e) => setTargetTeam(e.target.value)}
            placeholder="Potential Trade Partner"
          />
        </div>

        <div>
          <label>Analysis Notes</label>
          <textarea
            value={analysisNotes}
            onChange={(e) => setAnalysisNotes(e.target.value)}
            placeholder="Trade analysis/notes..."
          />
        </div>

        <div>
          <label>Confidence</label>
          <input
            type="text"
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            placeholder="Good Deal, Bad Deal, etc."
          />
        </div>

        <button type="submit">Create Trade Scenario</button>
      </form>
    </div>
  );
}

export default CreateTradeForm;