from .db import db, environment, SCHEMA

class TradeScenario(db.Model):
    __tablename__ = 'trade_scenarios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id' if environment == "production" else 'users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)  
    my_players = db.Column(db.Text, nullable=False)  #players im giving up
    target_players = db.Column(db.Text, nullable=False) # players im trying to get
    target_team = db.Column(db.String(255)) # who im trading with, optional, will work better when espn fantasy league is integrated
    analysis_notes = db.Column(db.Text)  #notes on the trade idea, if you wqnt
    confidence = db.Column(db.String(255), nullable=False)  # "Good Deal", "Bad Deal" etc


    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'my_players': self.my_players,
            'target_players': self.target_players,
            'target_team': self.target_team,
            'analysis_notes': self.analysis_notes,
            'confidence': self.confidence,
        }