const GET_TRADES = 'trades/GET_TRADES';
const ADD_TRADE = 'trades/ADD_TRADE';
const UPDATE_TRADE = 'trades/UPDATE_TRADE';
const DELETE_TRADE = 'trades/DELETE_TRADE';

// Actionin'
const getTrades = (trades) => ({
  type: GET_TRADES,
  trades
});

const addTrade = (trade) => ({
  type: ADD_TRADE,
  trade
});

const updateTrade = (trade) => ({
  type: UPDATE_TRADE,
  trade
});

const deleteTrade = (tradeId) => ({
  type: DELETE_TRADE,
  tradeId
});

// Thunkin'
export const loadTrades = () => async (dispatch) => {
  const response = await fetch('/api/trades');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(getTrades(data.trades));
  }
};

export const createTrade = (tradeData) => async (dispatch) => {
  const response = await fetch('/api/trades', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTrade(data));
  }
};

export const editTrade = (tradeId, tradeData) => async (dispatch) => {
  const response = await fetch(`/api/trades/${tradeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateTrade(data));
  }
};

export const removeTrade = (tradeId) => async (dispatch) => {
  const response = await fetch(`/api/trades/${tradeId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteTrade(tradeId));
  }
};

// Reducin'
const initialState = {
  scenarios: []
};

function tradesReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_TRADES:
      return { ...state, scenarios: action.trades };
    
    case ADD_TRADE:
      return { ...state, scenarios: [...state.scenarios, action.trade] };
    
    case UPDATE_TRADE:
      return { 
        ...state, 
        scenarios: state.scenarios.map(trade => 
          trade.id === action.trade.id ? action.trade : trade
        )
      };
    
    case DELETE_TRADE:
      return {
                ...state, 
        scenarios: state.scenarios.filter(trade => trade.id !== action.tradeId)
      };
    default:
      return state;
  }
}

export default tradesReducer;
