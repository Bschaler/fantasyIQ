from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, TradeScenario

trades_routes = Blueprint('trades', __name__)

@trades_routes.route('/')
@login_required
def get_trades():
    trades = TradeScenario.query.filter(TradeScenario.user_id == current_user.id).all()
    return {'trades': [trade.to_dict() for trade in trades]}

@trades_routes.route('/', methods=['POST'])
@login_required
def create_trade():
    data = request.get_json()
    
    new_trade = TradeScenario(
        user_id=current_user.id,
        title=data['title'],
        my_players=data['my_players'],
        target_players=data['target_players'],
        target_team=data['target_team'],
        analysis_notes=data['analysis_notes'],
        confidence=data['confidence']
    )
    
    db.session.add(new_trade)
    db.session.commit()
    return new_trade.to_dict(), 201

@trades_routes.route('/<int:trade_id>', methods=['PUT'])
@login_required
def update_trade(trade_id):
    trade = TradeScenario.query.get(trade_id)
    data = request.get_json()
    
    trade.title = data['title']
    trade.my_players = data['my_players'] 
    trade.target_players = data['target_players']
    trade.target_team = data['target_team']
    trade.analysis_notes = data['analysis_notes']
    trade.confidence = data['confidence']
    
    db.session.commit()
    return trade.to_dict()

@trades_routes.route('/<int:trade_id>', methods=['DELETE'])
@login_required
def delete_trade(trade_id):
    trade = TradeScenario.query.get(trade_id)
    db.session.delete(trade)
    db.session.commit()
    return {'message': 'Trade scenario has been deleted'}