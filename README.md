# FantasyIQ

Fantasy football app I made for my capstone project. Helps you manage your fantasy teams and keep track of players.

## What it does

Basically you can add your fantasy teams, write notes on players you want to target, plan out trades, and post about fantasy stuff. I play a lot of fantasy football so I wanted to build something I’d actually use.

The main thing is you can have all your fantasy info in one place instead of random notes on your phone or whatever.

## Tech used

- Flask for the backend
- React for the frontend
- SQLAlchemy for database stuff
- Redux for state management
- SQLite database (switches to PostgreSQL when deployed)

## Running the app

Make sure you have Python and Node.js installed.

**Backend:**

```
git clone [repo-url]
cd fantasyiq
pipenv install -r requirements.txt
pipenv shell
flask db upgrade
flask seed all
flask run -p 8000
```

**Frontend:**
Open another terminal and do:

```
cd react-vite
npm install
npm run build
```

Then go to localhost:8000 and hit the Demo button to see it working.

## Main features

**Teams:** Add your fantasy teams from ESPN, Yahoo, etc. You can add players to each team’s roster.

**Watchlist:** Keep notes on players you want to pick up. Rate how much you want them 1-10.

**Trades:** Plan out trades before you send them. Write down who you’d trade and who you want back.

**Community:** Post about fantasy stuff like sleeper picks or start/sit advice.

## Database tables

- users (login info)
- teams (your fantasy teams)
- roster (players on each team)
- player_notes (your watchlist)
- trade_scenarios (planned trades)
- blog_posts (community posts)

## API stuff

The backend has routes for each feature:

- /api/auth - login/signup
- /api/teams - team CRUD
- /api/notes - player notes CRUD
- /api/trades - trade scenarios CRUD
- /api/roster - roster management
- /api/community - blog posts

Pretty standard REST API setup.

## Deployment

Set up to deploy on Render. You build the React app, push to GitHub, then connect it to Render and set the environment variables.

## Demo login

There’s a demo button that logs you in with fake data so you can see how it works without making an account.

## Future stuff

Want to add real player stats and maybe connect to actual ESPN/ yahoo leagues. Also implement AI to grade trade scores(good, bad, and the ugly), and maybe even "must pick up" for free agents in the league.

## structure

```
app/                 # Flask
  api/               # Route files
  models/            # Database models
  
react-vite/          # React
  src/
    components/      # React components
    redux/           # State management
```

## Notes

Built this over a few weeks for my bootcamp final project. Covers full-stack development with user auth, database relationships, and a React frontend. The styling is pretty basic but it works, definitely want to spice it up more