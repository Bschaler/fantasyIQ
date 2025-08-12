from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Team


teams_routes = Blueprint('teams', __name__)


@teams_routes.route('/')
@login_required
def get_teams():
    teams = Team.query.all() #will gather team info if user is signed it
    return {'teams': [team.to_dict() for team in teams]}


@teams_routes.route('/', methods=['POST'])
@login_required  
def create_team():
    data = request.get_json()
    
    new_team = Team(
        user_id=current_user.id,
        name=data['name'],
        platform=data['platform'], #espn, yahoo, etc
        league_name=data['league_name'],
        league_size=data['league_size'],
        scoring_format=data['scoring_format']
    )
    
    db.session.add(new_team)
    db.session.commit()
    return new_team.to_dict(), 201