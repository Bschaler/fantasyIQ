from .db import db, environment, SCHEMA


class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id' if environment == "production" else 'users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    platform = db.Column(db.String(255), nullable=False)
    league_name = db.Column(db.String(255), nullable=False)
    league_size = db.Column(db.Integer, nullable=False)
    scoring_format = db.Column(db.String(255), nullable=False)
  


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'platform': self.platform,
            'league_name': self.league_name,
            'league_size': self.league_size,
            'scoring_format': self.scoring_format,
        }