import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTrades, removeTrade } from "../../redux/trades";
import { useEffect } from "react";

function DeleteTrade() {
  const { tradeId } = useParams();
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.scenarios);
  const trade = trades.find(trade => trade.id === parseInt(tradeId));

  useEffect(() => {
    dispatch(loadTrades());
  }, [dispatch]);

  const handleDelete = async () => {
    await dispatch(removeTrade(tradeId));
    // Could navigate back here if you want
  };

  if (!trade) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Delete Trade Scenario</h1>
      
      <div>
        <p>Are you sure you want to delete this trade idea?</p>
        
        <div>
          <h3>{trade.title}</h3>
          <p><strong>My Players:</strong> {trade.my_players}</p>
          <p><strong>Target Players:</strong> {trade.target_players}</p>
          <p><strong>Target Team:</strong> {trade.target_team}</p>
          <p><strong>Analysis:</strong> {trade.analysis_notes}</p>
          <p><strong>Confidence:</strong> {trade.confidence}</p>
        </div>

        <button onClick={handleDelete}>Yes, Delete Trade</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteTrade;