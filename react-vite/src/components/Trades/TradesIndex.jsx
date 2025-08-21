import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadTrades, removeTrade } from "../../redux/trades";
import "./Trades.css";

function TradesIndex() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const trades = useSelector((state) => state.trades.scenarios);
  const user = useSelector((state) => state.session.user);

  
  useEffect(() => {
    dispatch(loadTrades());
  }, [dispatch]);

const handleDelete = (tradeId) => {
    if (window.confirm("Delete this trade scenario?")) {
      dispatch(removeTrade(tradeId));
    }
  };

  if (!user) {
    return <div>Please log in to see your trade scenarios</div>;
  }

  
  
  return (
  <div className="trades-container">
    <div className="trades-header">
      <h1 className="trades-title">My Trade Scenarios</h1>
      <button className="add-trade-btn" onClick={() => navigate('/trades/new')}>
        Add Trade
      </button>
    </div>
    
    {trades.length === 0 ? (
      <div className="empty-trades">
        <p>No trade scenarios yet! Create your first trade idea.</p>
      </div>
    ) : (
      <div className="trades-list">
        {trades.map((trade) => (
          <div key={trade.id} className="trade-card">
            <h3>{trade.title}</h3>
            <p><strong>My Players:</strong> {trade.my_players}</p>
            <p><strong>Target Players:</strong> {trade.target_players}</p>
            <p><strong>Target Team:</strong> {trade.target_team}</p>
            <p><strong>Analysis:</strong> {trade.analysis_notes}</p>
            <p><strong>Confidence:</strong> {trade.confidence}</p>
            
            <div className="trade-buttons">
              <button className="edit-btn" onClick={() => navigate(`/trades/${trade.id}/edit`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(trade.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
export default TradesIndex;