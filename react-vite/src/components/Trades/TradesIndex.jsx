import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTrades, removeTrade } from "../../redux/trades";

function TradesIndex() {
  const dispatch = useDispatch();
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
    <div>
      <h1>My Trade Scenarios</h1>
      
      {trades.length === 0 ? (
        <p>No trade scenarios yet! Create your first trade idea.</p>
      ) : (
        <div>
          {trades.map((trade) => (
            <div key={trade.id}>
              <h3>{trade.title}</h3>
              <p><strong>My Players:</strong> {trade.my_players}</p>
              <p><strong>Target Players:</strong> {trade.target_players}</p>
              <p><strong>Target Team:</strong> {trade.target_team}</p>
              <p><strong>Analysis:</strong> {trade.analysis_notes}</p>
              <p><strong>Confidence:</strong> {trade.confidence}</p>
              
              <button>Edit</button>
              <button onClick={() => handleDelete(trade.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TradesIndex;