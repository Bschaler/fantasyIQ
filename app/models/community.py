from .db import db, environment, SCHEMA

class BlogPost(db.Model):
    __tablename__ = 'blog_posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)  
    content = db.Column(db.Text, nullable=False)  #the actual blog post, no limit on haracter count, may refine
    category = db.Column(db.String(255), nullable=False) # somethin like "Sleepers", "Trade Advice" etc, again, may refine or remove if i dont feel it's necessary


    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'category': self.category,
        }