from .auth import auth_bp
from .admin import admin_bp
from .branch import branch_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)