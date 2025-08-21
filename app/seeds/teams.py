from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    # demo user teams
    team1 = Team(
        user_id=1,
        name="Work League Team",
        platform="ESPN",
        league_name="Office Warriors",
        league_size=12,
        scoring_format="Half-PPR"
    )
    team2 = Team(
        user_id=1, 
        name="Family League",
        platform="Yahoo", 
        league_name="Family Fun",
        league_size=10,
        scoring_format="Standard"  # no ppr
    )
    # marnie gets a team too
    team3 = Team(
        user_id=2, 
        name="Marnie's Team",
        platform="Sleeper",
        league_name="Friends League", 
        league_size=12,
        scoring_format="PPR"
    )
    
    db.session.add(team1)
    db.session.add(team2) 
    db.session.add(team3)
    db.session.commit()

def undo_teams():
    Team.query.delete()  
    db.session.commit()