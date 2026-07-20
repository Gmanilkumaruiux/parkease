from flask import Blueprint, request
from marshmallow import ValidationError

from app.schemas.auth_schema import RegisterSchema, LoginSchema
from app.services.auth_service import register_user, login_user

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

register_schema = RegisterSchema()
login_schema = LoginSchema()


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = register_schema.load(request.get_json())
    except ValidationError as err:
        return {
            "success": False,
            "errors": err.messages
        }, 400

    return register_user(data)


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = login_schema.load(request.get_json())
    except ValidationError as err:
        return {
            "success": False,
            "errors": err.messages
        }, 400

    return login_user(data)