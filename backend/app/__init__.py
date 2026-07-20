from flask import Flask

from app.config import Config
from app.extensions import db, migrate, bcrypt, jwt, cors

# Import models
from app.models import *

# Import routes
from app.routes.auth import auth_bp
from app.routes.admin import admin_bp
from app.routes.branch import branch_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(branch_bp)

    @app.route("/")
    def home():
        return {
            "success": True,
            "message": "ParkEase Backend Running Successfully"
        }

    print("\nRegistered Routes:")
    for rule in app.url_map.iter_rules():
        print(rule)

    return app