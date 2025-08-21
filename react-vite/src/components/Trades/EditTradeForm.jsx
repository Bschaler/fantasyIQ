import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTrades, editTrade } from "../../redux/trades";

function EditTradeForm() {
  const { tradeId } = useParams();
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const trades = useSelector((state) => state.trades.scenarios);
  const trade = trades.find(trade => trade.id === parseInt(tradeId));

  const [title, setTitle] = useState("");
  const [myPlayers, setMyPlayers] = useState("");
  const [targetPlayers, setTargetPlayers] = useState("");
  const [targetTeam, setTargetTeam] = useState("");
  const [analysisNotes, setAnalysisNotes] = useState("");
  const [confidence, setConfidence] = useState("");

  useEffect(() => {
    dispatch(loadTrades());
  }, [dispatch]);

  useEffect(() => {
    if (trade) {
      setTitle(trade.title);
      setMyPlayers(trade.my_players);
      setTargetPlayers(trade.target_players);
      setTargetTeam(trade.target_team);
      setAnalysisNotes(trade.analysis_notes);
      setConfidence(trade.confidence);
    }
  }, [trade]);

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

    await dispatch(editTrade(tradeId, tradeData));
        navigate('/trades');
  };

  if (!trade) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Trade Scenario</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Trade Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>My Players</label>
          <input
            type="text"
            value={myPlayers}
            onChange={(e) => setMyPlayers(e.target.value)}
          />
        </div>

        <div>
          <label>Target Players</label>
          <input
            type="text"
            value={targetPlayers}
            onChange={(e) => setTargetPlayers(e.target.value)}
          />
        </div>

        <div>
          <label>Target Team</label>
          <input
            type="text"
            value={targetTeam}
            onChange={(e) => setTargetTeam(e.target.value)}
          />
        </div>

        <div>
          <label>Analysis Notes</label>
          <textarea
            value={analysisNotes}
            onChange={(e) => setAnalysisNotes(e.target.value)}
          />
        </div>

        <div>
          <label>Confidence</label>
          <input
            type="text"
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
          />
        </div>

        <button type="submit">Update Trade</button>
      </form>
    </div>
  );
}

export default EditTradeForm;