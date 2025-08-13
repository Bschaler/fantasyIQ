from .db import db, environment, SCHEMA

class Roster(db.Model):
    __tablename__ = 'team_players'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id' if environment == "production" else 'users.id'), nullable=False)
    player_name = db.Column(db.String(255), nullable =False)
    position = db.Column(db.String(255), nullable=False)
    nfl_team = db.Column(db.String(255)) #Optional for the MVP, for now at least. Might take a gander later


    def to_dict(self):
        return{
            'id': self.id,
            'team_id': self.team_id,
            'player_name': self.player_name,
            'position': self.position,
            'nfl_team': self.nfl_team,
        }