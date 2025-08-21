from app.models import db, TradeScenario, environment, SCHEMA
from sqlalchemy.sql import text

def seed_trade_scenarios():
    # demo user trade ideas
    trade1 = TradeScenario(
        user_id=1,
        title="Even WR Trade",
        my_players="DK Metcalf",
        target_players="Mike Evans",
        target_team="John from work",
        analysis_notes="Both solid WRs. Evans is older but still producing at a high level",
        confidence="Bad Deal"
    )
    trade2 = TradeScenario(
        user_id=1,
        title="Handcuff Trade",
        my_players="Roschon Johnson",
        target_players="Justice Hill", 
        target_team="Bears fan in league",
        analysis_notes="I have Derrick Henry, he has Jonathan Taylor. Need depth though",
        confidence="Good Deal"
    )
    # marnie trade idea
    trade3 = TradeScenario(
        user_id=2,
        title="QB Upgrade",
        my_players="Sam Howell, Tyler Lockett",
        target_players="Kirk Cousins",
        target_team="Timmy's team",
        analysis_notes="Need better QB. Giving depth WR/backup QB for starter.",
        confidence="Good Deal"
    )

    db.session.add(trade1)
    db.session.add(trade2)
    db.session.add(trade3)
    db.session.commit()

def undo_trade_scenarios():
    TradeScenario.query.delete() 
    db.session.commit()