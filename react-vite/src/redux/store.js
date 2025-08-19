import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";

// redux imports
import teamsReducer from "./teams";
import watchlistReducer from "./watchlist";
import tradesReducer from "./trades";
import communityReducer from "./community";
import rosterReducer from "./roster";

const rootReducer = combineReducers({
  session: sessionReducer,
  teams: teamsReducer,        
  watchlist: watchlistReducer,   
  trades: tradesReducer,       
  community: communityReducer,  
  roster: rosterReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
