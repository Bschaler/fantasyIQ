from .db import db, environment, SCHEMA

class PlayerNote(db.Model):
    __tablename__ = 'player_notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id' if environment == "production" else 'users.id'), nullable=False)
    player_name = db.Column(db.String(255), nullable=False) # Jonathan Taylor, Justin Jefferson, etc
    position = db.Column(db.String(255), nullable=False) # QB, RB, WR etc
    team_abbr = db.Column(db.String(255)) # Like IND or BAL or MIA
    notes = db.Column(db.Text, nullable=False) # its a notes page wo kinda need notes for the note page
    interest_level = db.Column(db.String(255), nullable=False) 
    is_watchlist = db.Column(db.Boolean, default=True) # am i interested or not, can be interested at first, decide to move on later


    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'player_name': self.player_name,
            'position': self.position,
            'team_abbr': self.team_abbr,
            'notes': self.notes,
            'interest_level': self.interest_level,
            'is_watchlist': self.is_watchlist,
        }
