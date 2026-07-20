from flask import Blueprint
from flask_jwt_extended import jwt_required

from app.middleware.role_required import role_required

admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/api/admin"
)


@admin_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required("ADMIN")
def admin_dashboard():

    return {
        "success": True,
        "message": "Welcome Admin"
    }, 200