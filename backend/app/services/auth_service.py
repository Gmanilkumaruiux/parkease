from app.models.user import User
from app.extensions import db
from app.utils.jwt_helper import generate_token


def register_user(data):
    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return {
            "success": False,
            "message": "Email already registered"
        }, 409

    existing_phone = User.query.filter_by(phone=data["phone"]).first()

    if existing_phone:
        return {
            "success": False,
            "message": "Phone number already registered"
        }, 409

    user = User(
        full_name=data["full_name"],
        email=data["email"],
        phone=data["phone"]
    )

    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return {
        "success": True,
        "message": "Registration successful"
    }, 201


def login_user(data):
    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {
            "success": False,
            "message": "Invalid email or password"
        }, 401

    if not user.check_password(data["password"]):
        return {
            "success": False,
            "message": "Invalid email or password"
        }, 401

    token = generate_token(user)

    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role.value
        }
    }, 200