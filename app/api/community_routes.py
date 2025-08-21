from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, BlogPost

community_routes = Blueprint('community', __name__)

@community_routes.route('/')
@login_required
def get_community_posts():
    posts = BlogPost.query.all()
    return {'posts': [post.to_dict() for post in posts]}

# post: creating the blog post
@community_routes.route('/', methods=['POST'])
@login_required
def create_community_post():
    data = request.get_json()
    
    new_post = BlogPost(
        user_id=current_user.id,
        title=data['title'],
        content=data['content'],
        category=data['category']
    )
    
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict(), 201


# PUT - editing the posts
@community_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_community_post(post_id):
    post = BlogPost.query.get(post_id)
    data = request.get_json()
    
    post.title = data['title']
    post.content = data['content']
    post.category = data['category']
    
    db.session.commit()
    return post.to_dict()


# Delete
@community_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_community_post(post_id):
    post = BlogPost.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Blog post has been deleted'}