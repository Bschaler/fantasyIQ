from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Team, Roster


teams_routes = Blueprint('teams', __name__)


@teams_routes.route('/')
@login_required
def get_teams():
    teams = Team.query.filter(Team.user_id == current_user.id).all() #will gather team info if user is signed it
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


@teams_routes.route('/<int:team_id>', methods=['PUT'])
@login_required
def update_team(team_id):
    team = Team.query.get(team_id)
    data = request.get_json()
    
    team.name = data['name']
    team.platform = data['platform']
    team.league_name = data['league_name']
    team.league_size = data['league_size'] 
    team.scoring_format = data['scoring_format']
    
    db.session.commit()
    return team.to_dict()

@teams_routes.route('/<int:team_id>', methods=['DELETE'])
@login_required
def delete_team(team_id):
 
        team = Team.query.get(team_id)
    

        Roster.query.filter(Roster.team_id == team_id).delete()

        db.session.delete(team)
        db.session.commit()
        return {'message': 'Team has been deleted'}