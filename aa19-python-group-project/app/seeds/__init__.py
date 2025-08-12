from flask.cli import AppGroup
from .users import seed_users, undo_users
from .teams import seed_teams, undo_teams
from .roster import seed_rosters, undo_rosters
from .notes import seed_player_notes, undo_player_notes
from .trades import seed_trade_scenarios, undo_trade_scenarios
from .community import seed_blog_posts, undo_blog_posts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_teams()
        undo_rosters()
        undo_player_notes()
        undo_trade_scenarios()
        undo_blog_posts()
    seed_users()
    seed_teams() 
    seed_rosters() 
    seed_player_notes()  
    seed_trade_scenarios()  
    seed_blog_posts() 
 


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_blog_posts()
    undo_trade_scenarios()
    undo_player_notes()
    undo_rosters()
    undo_teams()
    undo_users()
    # Add other undo functions here
