from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, PlayerNote

notes_routes = Blueprint('notes', __name__)

@notes_routes.route('/')
@login_required
def get_notes():
    notes = PlayerNote.query.filter(PlayerNote.user_id == current_user.id).all()
    return {'notes': [note.to_dict() for note in notes]}

@notes_routes.route('/', methods=['POST'])
@login_required
def create_note():
    data = request.get_json()
    
    new_note = PlayerNote(
        user_id=current_user.id,
        player_name=data['player_name'],
        position=data['position'],
        team_abbr=data['team_abbr'],
        notes=data['notes'],
        interest_level=data['interest_level'],
        is_watchlist=data['is_watchlist']
    )
    
    db.session.add(new_note)
    db.session.commit()
    return new_note.to_dict(), 201

@notes_routes.route('/<int:note_id>', methods=['PUT'])
@login_required
def update_note(note_id):
    note = PlayerNote.query.get(note_id)
    data = request.get_json()
    
    note.player_name = data['player_name']
    note.position = data['position']
    note.team_abbr = data['team_abbr']
    note.notes = data['notes']
    note.interest_level = data['interest_level']
    note.is_watchlist = data['is_watchlist']
    
    db.session.commit()
    return note.to_dict()

@notes_routes.route('/<int:note_id>', methods=['DELETE'])
@login_required
def delete_note(note_id):
    note = PlayerNote.query.get(note_id)
    db.session.delete(note)
    db.session.commit()
    return {'message': 'Player note has been deleted'}