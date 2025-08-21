from app.models import db, BlogPost, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blog_posts():
    # demo user
    post1 = BlogPost(
        user_id=1,
        title="Week 8 Sleepers to Target",
        content="Jordan Mason could be huge if CMC sits out. Also keep an eye on Rachaad White if he gets healthy. TB offense has potential.",
        category="Sleepers"
    )
    post2 = BlogPost(
        user_id=1,
        title="Should You Trade for Davante Adams?",
        content="Adams is obviously talented but Jets offense is a mess. Only trade for him if you're getting a discount. His target share is there but TD upside is limited.",
        category="Trade Advice"
    )
    # marnies post
    post3 = BlogPost(
        user_id=2,
        title="Start/Sit: Week 8 RBs",
        content="Start: Josh Jacobs (good matchup), Sit: Rachaad White (injury concerns). Also Brian Robinson is a solid play if you need floor.",
        category="Start/Sit"
    )
    # bobbie's post
    post4 = BlogPost(
        user_id=3,
        title="Waiver Wire Pickups",
        content="Tank Dell if available. Also Romeo Doubs has been getting more targets with Love. Both could be solid depth adds.",
        category="Waivers"
    )
    
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.commit()

def undo_blog_posts():
    BlogPost.query.delete()
    db.session.commit()