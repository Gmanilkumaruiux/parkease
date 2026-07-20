from app.extensions import db
from app.extensions import bcrypt

from app.models.user import User
from app.models.enums import UserRole


def create_default_admin():

    admin = User.query.filter_by(role=UserRole.ADMIN).first()

    if admin:
        print("✓ Default admin already exists.")
        return

    admin = User(
        full_name="System Admin",
        email="admin@parkease.com",
        phone="9999999999",
        role=UserRole.ADMIN,
        is_active=True
    )

    admin.set_password("Admin@123")

    db.session.add(admin)
    db.session.commit()

    print("✓ Default admin created successfully.")