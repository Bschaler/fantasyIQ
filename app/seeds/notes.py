from app.models import db, PlayerNote, environment, SCHEMA
from sqlalchemy.sql import text

def seed_player_notes():
    # demo user notes - some research i did
    note1 = PlayerNote(
        user_id=1,
        player_name="Brian Robinson Jr",
        position="RB",
        team_abbr="WAS",
        notes="Main RB for Washington now. Could be solid if he stays healthy. Goal line work too.",
        interest_level="Must Add",
        is_watchlist=True
    )
    note2 = PlayerNote(
        user_id=1,
        player_name="Romeo Doubs", 
        position="WR",
        team_abbr="GB",
        notes="Now with Jordan Love throwing to him. Could be good connection if Love develops.",
        interest_level="Monitoring",
        is_watchlist=True
    )
    note3 = PlayerNote(
        user_id=1,
        player_name="Tyler Higbee",
        position="TE", 
        team_abbr="LAR",
        notes="Meh. probably not worth it. Too inconsistent for my liking tbh",
        interest_level="Avoid",
        is_watchlist=False  # not watching anymore
    )
    # marnie has some notes too
    note4 = PlayerNote(
        user_id=2,
        player_name="Rachaad White",
        position="RB",
        team_abbr="TB", 
        notes="Rachaad is going through some injuries, former RB1, but with injuries and Bucky Irving picking up steam, Rachaad may be demoted to RB2",
        interest_level="Monitoring",
        is_watchlist=True
    )
    # colts player note
    note5 = PlayerNote(
        user_id=1,
        player_name="Anthony Richardson",
        position="QB",
        team_abbr="IND", 
        notes="Young QB with tons of upside. Athletic freak but still raw. Injuries are a major issue... but when healthy could be huge",
        interest_level="Monitoring",
        is_watchlist=True
    )
    
    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.commit()

def undo_player_notes():
    PlayerNote.query.delete()
    db.session.commit()