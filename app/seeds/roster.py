from app.models import db, Roster, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rosters():
    # demo user team 1 
    # starters
    player1 = Roster(team_id=1, player_name="Josh Allen", position="QB", nfl_team="BUF")
    player2 = Roster(team_id=1, player_name="Saquon Barkley", position="RB", nfl_team="PHI")
    player3 = Roster(team_id=1, player_name="Derrick Henry", position="RB", nfl_team="BAL")
    player4 = Roster(team_id=1, player_name="Mike Evans", position="WR", nfl_team="TB")
    player5 = Roster(team_id=1, player_name="Calvin Ridley", position="WR", nfl_team="TEN")
    player6 = Roster(team_id=1, player_name="Travis Kelce", position="TE", nfl_team="KC")
    player7 = Roster(team_id=1, player_name="Harrison Butker", position="K", nfl_team="KC")
    player8 = Roster(team_id=1, player_name="San Francisco", position="DST", nfl_team="SF")
    # bench
    player9 = Roster(team_id=1, player_name="Geno Smith", position="QB", nfl_team="SEA")
    player10 = Roster(team_id=1, player_name="Brian Robinson Jr", position="RB", nfl_team="WAS")
    player11 = Roster(team_id=1, player_name="Romeo Doubs", position="WR", nfl_team="GB")
    player12 = Roster(team_id=1, player_name="Tyler Higbee", position="TE", nfl_team="LAR")
    


    # demo user team 2 
    # starters
    player13 = Roster(team_id=2, player_name="Lamar Jackson", position="QB", nfl_team="BAL")
    player14 = Roster(team_id=2, player_name="Josh Jacobs", position="RB", nfl_team="GB")
    player15 = Roster(team_id=2, player_name="Rachaad White", position="RB", nfl_team="TB")
    player16 = Roster(team_id=2, player_name="Justin Jefferson", position="WR", nfl_team="MIN")
    player17 = Roster(team_id=2, player_name="DK Metcalf", position="WR", nfl_team="SEA")
    player18 = Roster(team_id=2, player_name="George Kittle", position="TE", nfl_team="SF")
    player19 = Roster(team_id=2, player_name="Justin Tucker", position="K", nfl_team="BAL")
    player20 = Roster(team_id=2, player_name="Baltimore", position="DST", nfl_team="BAL")
    # bench
    player21 = Roster(team_id=2, player_name="Russell Wilson", position="QB", nfl_team="PIT")
    player22 = Roster(team_id=2, player_name="Zack Moss", position="RB", nfl_team="CIN")
    player23 = Roster(team_id=2, player_name="Tank Dell", position="WR", nfl_team="HOU")
    player24 = Roster(team_id=2, player_name="Dallas Goedert", position="TE", nfl_team="PHI")
    


    # marnies team
    # starters
    player25 = Roster(team_id=3, player_name="Anthony Richardson", position="QB", nfl_team="IND")
    player26 = Roster(team_id=3, player_name="Jonathan Taylor", position="RB", nfl_team="IND")
    player27 = Roster(team_id=3, player_name="Bijan Robinson", position="RB", nfl_team="ATL")
    player28 = Roster(team_id=3, player_name="Amon-Ra St. Brown", position="WR", nfl_team="DET")
    player29 = Roster(team_id=3, player_name="Michael Pittman Jr.", position="WR", nfl_team="IND")
    player30 = Roster(team_id=3, player_name="Trey McBride", position="TE", nfl_team="ARI")
    player31 = Roster(team_id=3, player_name="Daniel Carlson", position="K", nfl_team="LV")
    player32 = Roster(team_id=3, player_name="Pittsburgh", position="DST", nfl_team="PIT")
    # bench
    player33 = Roster(team_id=3, player_name="Kirk Cousins", position="QB", nfl_team="ATL")
    player34 = Roster(team_id=3, player_name="Javonte Williams", position="RB", nfl_team="DEN")
    player35 = Roster(team_id=3, player_name="Jordan Addison", position="WR", nfl_team="MIN")
    player36 = Roster(team_id=3, player_name="Cole Kmet", position="TE", nfl_team="CHI")
    
    db.session.add_all([player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, player11, player12,
                       player13, player14, player15, player16, player17, player18, player19, player20, player21, player22, player23, player24,
                       player25, player26, player27, player28, player29, player30, player31, player32, player33, player34, player35, player36])
    db.session.commit()

def undo_rosters():
    Roster.query.delete()
    db.session.commit()