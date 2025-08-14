from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Roster


roster_routes = Blueprint('roster', __name__)

# GET route - gets all players
@roster_routes.route('/')
@login_required 
def get_roster_players():

    players = Roster.query.all()
    return {'players': [player.to_dict() for player in players]}

# POST route - adds a new player to a team
@roster_routes.route('/', methods=['POST'])
@login_required 
def create_roster_player():
    data = request.get_json()
    
    # Create new player
    new_player = Roster(
        team_id=data['team_id'],         
        player_name=data['player_name'],  # player name like "Josh Allen"
        position=data['position'],        # position like "QB", "RB", etc
        nfl_team=data['nfl_team']        # team like "IND", "KC", etc
    )
    
    db.session.add(new_player)
    db.session.commit()
    return new_player.to_dict(), 201

# PUT route: updates an existing player(team, name, psoition)
@roster_routes.route('/<int:player_id>', methods=['PUT'])
@login_required
def update_roster_player(player_id):
    player = Roster.query.get(player_id)
    data = request.get_json()
    
    player.team_id = data['team_id']
    player.player_name = data['player_name']
    player.position = data['position']
    player.nfl_team = data['nfl_team']
    
    db.session.commit()
    return player.to_dict()

# DELETE route - removes playr selected
@roster_routes.route('/<int:player_id>', methods=['DELETE'])
@login_required
def delete_roster_player(player_id):
    player = Roster.query.get(player_id)
    db.session.delete(player)
    db.session.commit()
    return {'message': 'Player has been removed'}