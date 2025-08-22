import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout, thunkDemoLogin } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  return (
    <header className="app-header">
      <div className="nav-container">
            <NavLink to="/" className="app-logo">
          FantasyIQ
        </NavLink>
        
        {user ? (
    
          <>
            <ul className="main-nav">
              <li><NavLink to="/teams">My Teams</NavLink></li>
              <li><NavLink to="/watchlist">Watchlist</NavLink></li>
              <li><NavLink to="/trades">Trades</NavLink></li>
              <li><NavLink to="/community">Community</NavLink></li>
            </ul>
            
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (

          <div className="auth-buttons">
            <OpenModalMenuItem
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
             <button 
    onClick={() => dispatch(thunkDemoLogin())}
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#28a745",
      color: "white",
      border: "1px solid #28a745",
      cursor: "pointer",
      fontSize: "14px",
      borderRadius: "4px"
    }}
  >
    Demo
  </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;

